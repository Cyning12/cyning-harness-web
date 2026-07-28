import fs from 'node:fs/promises'
import path from 'node:path'
import { stubObsStatus, stubObsTimeline } from './stubData'
import {
  type SpawnFn,
  runHarnessJson,
} from './harnessCli'

export type ApiOk<T> = { ok: true; data: T; warnings?: string[] }
export type ApiErr = { ok: false; error: string; code: string; detail?: string }
export type ApiResult<T> = ApiOk<T> | ApiErr

export type DocListItem = {
  relativePath: string
  name: string
  mtimeMs: number
}

export type ObsSourceMode = 'live' | 'stub'

export type ObsQueryOptions = {
  source?: ObsSourceMode
  spawn?: SpawnFn
  /** 仅 timeline：显式 true 才传 CLI `--ingest`；默认 false */
  ingest?: boolean
}

/** 解析 ?ingest=：仅 1/true/yes/on 为 true；缺省与其他值均为 false */
export function resolveIngestFlag(raw: string | null | undefined): boolean {
  const v = (raw ?? '').trim().toLowerCase()
  return v === '1' || v === 'true' || v === 'yes' || v === 'on'
}

const TASKS_ROOT_SEGMENTS = ['docs', 'tasks'] as const

/** 解析并校验相对路径，仅允许 docs/tasks 下 .md */
export function resolveSafeTaskMd(
  repoRoot: string,
  relativePath: string,
): ApiResult<string> {
  const normalized = relativePath.replace(/\\/g, '/').replace(/^\/+/, '')
  if (!normalized || normalized.includes('\0')) {
    return { ok: false, error: '路径无效', code: 'INVALID_PATH' }
  }
  if (!normalized.startsWith('docs/tasks/')) {
    return {
      ok: false,
      error: '仅允许读取 docs/tasks/** 下的 Markdown',
      code: 'PATH_OUT_OF_SCOPE',
    }
  }
  if (!normalized.endsWith('.md')) {
    return { ok: false, error: '仅支持 .md 文件', code: 'NOT_MARKDOWN' }
  }

  const abs = path.resolve(repoRoot, normalized)
  const tasksRoot = path.resolve(repoRoot, ...TASKS_ROOT_SEGMENTS)
  const relToTasks = path.relative(tasksRoot, abs)
  if (relToTasks.startsWith('..') || path.isAbsolute(relToTasks)) {
    return { ok: false, error: '路径越界，拒绝读仓外文件', code: 'PATH_TRAVERSAL' }
  }
  return { ok: true, data: abs }
}

async function walkMdFiles(
  dir: string,
  repoRoot: string,
  out: DocListItem[],
): Promise<void> {
  let entries
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    throw Object.assign(new Error(`无法读取目录：${msg}`), { code: 'READ_DIR_FAILED' })
  }

  for (const entry of entries) {
    const abs = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await walkMdFiles(abs, repoRoot, out)
      continue
    }
    if (!entry.isFile() || !entry.name.endsWith('.md')) continue
    const st = await fs.stat(abs)
    const relativePath = path.relative(repoRoot, abs).split(path.sep).join('/')
    out.push({
      relativePath,
      name: entry.name,
      mtimeMs: st.mtimeMs,
    })
  }
}

export async function listTaskDocs(
  repoRoot: string,
): Promise<ApiResult<DocListItem[]>> {
  const tasksRoot = path.resolve(repoRoot, ...TASKS_ROOT_SEGMENTS)
  try {
    await fs.access(tasksRoot)
  } catch {
    return {
      ok: false,
      error: '无可用 task 目录（docs/tasks 不存在或不可读）',
      code: 'NO_TASKS_DIR',
    }
  }

  try {
    const items: DocListItem[] = []
    await walkMdFiles(tasksRoot, repoRoot, items)
    items.sort((a, b) => b.mtimeMs - a.mtimeMs)
    if (items.length === 0) {
      return {
        ok: false,
        error: 'docs/tasks 下暂无 Markdown task',
        code: 'NO_TASK_MD',
      }
    }
    return { ok: true, data: items }
  } catch (err) {
    const code =
      err && typeof err === 'object' && 'code' in err
        ? String((err as { code: string }).code)
        : 'READ_DIR_FAILED'
    const msg = err instanceof Error ? err.message : String(err)
    return { ok: false, error: msg, code }
  }
}

export async function readTaskDoc(
  repoRoot: string,
  relativePath: string,
): Promise<ApiResult<{ relativePath: string; content: string }>> {
  const resolved = resolveSafeTaskMd(repoRoot, relativePath)
  if (!resolved.ok) return resolved

  try {
    const content = await fs.readFile(resolved.data, 'utf8')
    return {
      ok: true,
      data: {
        relativePath: relativePath.replace(/\\/g, '/').replace(/^\/+/, ''),
        content,
      },
    }
  } catch (err) {
    const code =
      err && typeof err === 'object' && 'code' in err && (err as NodeJS.ErrnoException).code === 'ENOENT'
        ? 'NOT_FOUND'
        : 'READ_FAILED'
    const msg =
      code === 'NOT_FOUND'
        ? '目标 md 不存在'
        : err instanceof Error
          ? `读盘失败：${err.message}`
          : '读盘失败'
    return { ok: false, error: msg, code }
  }
}

/** 解析 source：查询参数优先，其次 OBS_SOURCE 环境变量，默认 live */
export function resolveObsSource(raw: string | null | undefined): ObsSourceMode {
  const fromQuery = (raw ?? '').trim().toLowerCase()
  if (fromQuery === 'stub' || fromQuery === 'live') return fromQuery
  const fromEnv = (process.env.OBS_SOURCE ?? '').trim().toLowerCase()
  if (fromEnv === 'stub' || fromEnv === 'live') return fromEnv
  return 'live'
}

function requireTaskPath(taskPath: string | null | undefined): ApiResult<string> {
  const t = (taskPath ?? '').trim()
  if (!t) {
    return {
      ok: false,
      error: '无可用 task：请指定 ?task=docs/tasks/...md',
      code: 'NO_TASK',
    }
  }
  return { ok: true, data: t.replace(/\\/g, '/').replace(/^\/+/, '') }
}

export async function getObsStatus(
  repoRoot: string,
  taskPath: string | null = null,
  options: ObsQueryOptions = {},
): Promise<ApiResult<unknown>> {
  const source = options.source ?? 'live'
  if (source === 'stub') {
    return { ok: true, data: stubObsStatus(taskPath) }
  }

  const required = requireTaskPath(taskPath)
  if (!required.ok) return required

  const pathCheck = resolveSafeTaskMd(repoRoot, required.data)
  if (!pathCheck.ok) return pathCheck

  const cli = await runHarnessJson({
    repoRoot,
    subcommand: 'status',
    taskPath: required.data,
    spawn: options.spawn,
  })
  if (!cli.ok) {
    return {
      ok: false,
      error: cli.error,
      code: cli.code,
      detail: cli.detail,
    }
  }
  return cli.warnings?.length
    ? { ok: true, data: cli.data, warnings: cli.warnings }
    : { ok: true, data: cli.data }
}

export async function getObsTimeline(
  repoRoot: string,
  taskPath: string | null = null,
  options: ObsQueryOptions = {},
): Promise<ApiResult<unknown>> {
  const source = options.source ?? 'live'
  if (source === 'stub') {
    return { ok: true, data: stubObsTimeline(taskPath) }
  }

  const required = requireTaskPath(taskPath)
  if (!required.ok) return required

  const pathCheck = resolveSafeTaskMd(repoRoot, required.data)
  if (!pathCheck.ok) return pathCheck

  const cli = await runHarnessJson({
    repoRoot,
    subcommand: 'timeline',
    taskPath: required.data,
    spawn: options.spawn,
    ingest: options.ingest === true,
  })
  if (!cli.ok) {
    return {
      ok: false,
      error: cli.error,
      code: cli.code,
      detail: cli.detail,
    }
  }
  return cli.warnings?.length
    ? { ok: true, data: cli.data, warnings: cli.warnings }
    : { ok: true, data: cli.data }
}

/** 写闸 API 明确拒绝（边界测用） */
export function rejectWriteGate(): ApiErr {
  return {
    ok: false,
    error: '禁止写闸：Web 不提供将 HG-*=approved 的 API',
    code: 'WRITE_GATE_FORBIDDEN',
  }
}
