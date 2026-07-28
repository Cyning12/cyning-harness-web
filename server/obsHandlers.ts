import { spawn } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { stubObsStatus, stubObsTimeline } from './stubData'
import {
  type SpawnFn,
  runHarnessJson,
} from './harnessCli'
import { readHarnessPin } from './harnessPin'

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

/** 纪律包版本探测（只读 · 禁止触发 upgrade） */
export type HarnessVersionInfo = {
  package: string
  pinned: string
  manifest_version: string | null
  npm_latest: string | null
  behind: boolean | null
  /** pin / manifest 等可读说明（非致命时也可出现） */
  error?: string
  /** npm 探测失败说明 */
  npm_error?: string
}

export type NpmViewFn = (pkg: string, timeoutMs: number) => Promise<string>

export const DEFAULT_NPM_VIEW_TIMEOUT_MS = 5_000

/** 比较 x.y.z；无法比较返回 null */
export function isVersionBehind(
  pinned: string,
  latest: string,
): boolean | null {
  const parse = (v: string): number[] | null => {
    const m = v.trim().match(/^(\d+)\.(\d+)\.(\d+)/)
    if (!m) return null
    return [Number(m[1]), Number(m[2]), Number(m[3])]
  }
  const a = parse(pinned)
  const b = parse(latest)
  if (!a || !b) return null
  for (let i = 0; i < 3; i++) {
    if (b[i] > a[i]) return true
    if (b[i] < a[i]) return false
  }
  return false
}

/** 默认 npm view（短超时）；失败抛错由调用方降级 */
export async function defaultNpmView(
  pkg: string,
  timeoutMs: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'npm',
      ['view', pkg, 'version', '--json'],
      { env: process.env, shell: false },
    )
    let stdout = ''
    let stderr = ''
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      child.kill('SIGTERM')
    }, timeoutMs)

    child.stdout?.on('data', (chunk: Buffer | string) => {
      stdout += String(chunk)
    })
    child.stderr?.on('data', (chunk: Buffer | string) => {
      stderr += String(chunk)
    })

    child.on('error', (err) => {
      clearTimeout(timer)
      reject(err)
    })

    child.on('close', (code) => {
      clearTimeout(timer)
      if (timedOut) {
        reject(new Error(`npm view 超时（>${timeoutMs}ms）`))
        return
      }
      if (code !== 0) {
        reject(new Error(stderr.trim() || `npm view exit ${code}`))
        return
      }
      const trimmed = stdout.trim()
      try {
        const parsed: unknown = JSON.parse(trimmed)
        if (typeof parsed === 'string' && parsed.trim()) {
          resolve(parsed.trim())
          return
        }
      } catch {
        // 非 JSON 时按纯文本版本号
      }
      if (/^\d+\.\d+\.\d+/.test(trimmed)) {
        resolve(trimmed.replace(/^"|"$/g, ''))
        return
      }
      reject(new Error(`无法解析 npm view 输出：${trimmed.slice(0, 120)}`))
    })
  })
}

async function readManifestVersion(
  repoRoot: string,
): Promise<{ version: string | null; error?: string }> {
  const manifestPath = path.join(repoRoot, '.cyning-harness', 'manifest.json')
  try {
    const raw = await fs.readFile(manifestPath, 'utf8')
    const parsed: unknown = JSON.parse(raw)
    if (
      parsed &&
      typeof parsed === 'object' &&
      !Array.isArray(parsed) &&
      typeof (parsed as { version?: unknown }).version === 'string'
    ) {
      const v = (parsed as { version: string }).version.trim()
      return { version: v || null }
    }
    return { version: null, error: 'manifest.json 缺少 version 字段' }
  } catch (err) {
    const code =
      err && typeof err === 'object' && 'code' in err
        ? String((err as NodeJS.ErrnoException).code)
        : ''
    if (code === 'ENOENT') {
      return { version: null, error: 'manifest 缺失（尚未 init / 路径不可读）' }
    }
    const msg = err instanceof Error ? err.message : String(err)
    return { version: null, error: `读 manifest 失败：${msg}` }
  }
}

/**
 * 只读版本投影：pin + manifest + 可选 npm latest。
 * pin 非法 → ok:false；npm/manifest 失败 → 降级字段，不挡页。
 */
export async function getHarnessVersion(
  repoRoot: string,
  options: {
    npmView?: NpmViewFn
    npmTimeoutMs?: number
  } = {},
): Promise<ApiResult<HarnessVersionInfo>> {
  const pin = readHarnessPin(repoRoot)
  if (!pin.ok) {
    return { ok: false, error: pin.error, code: pin.code }
  }

  const manifest = await readManifestVersion(repoRoot)
  const info: HarnessVersionInfo = {
    package: pin.data.package,
    pinned: pin.data.version,
    manifest_version: manifest.version,
    npm_latest: null,
    behind: null,
  }
  if (manifest.error) {
    info.error = manifest.error
  }

  const timeoutMs = options.npmTimeoutMs ?? DEFAULT_NPM_VIEW_TIMEOUT_MS
  const npmView = options.npmView ?? defaultNpmView
  try {
    const latest = (await npmView(pin.data.package, timeoutMs)).trim()
    info.npm_latest = latest
    info.behind = isVersionBehind(pin.data.version, latest)
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    info.npm_error = `npm 最新版探测失败：${msg}`
    info.npm_latest = null
    info.behind = null
  }

  return { ok: true, data: info }
}
