/**
 * 仅 Node 侧 spawn harness CLI（禁止浏览器 npx）。
 * 默认不带 --ingest；仅 timeline 且显式 ingest=true 时追加。
 * 包规格真值：仓根 harness.pin.json（见 harnessPin.ts）。
 */
import { spawn } from 'node:child_process'
import { resolveHarnessPackage } from './harnessPin'

export const DEFAULT_CLI_TIMEOUT_MS = 60_000

/** 从 pin 组装；勿在业务路径硬编码权威版本 */
export function getHarnessPackage(repoRoot: string = process.cwd()): string {
  return resolveHarnessPackage(repoRoot)
}

export type SpawnResult = {
  exitCode: number | null
  stdout: string
  stderr: string
  timedOut: boolean
}

export type SpawnFn = (
  args: string[],
  options: { cwd: string; timeoutMs: number },
) => Promise<SpawnResult>

export type CliJsonOk = { ok: true; data: unknown; warnings?: string[] }
export type CliJsonErr = {
  ok: false
  error: string
  code: string
  detail?: string
}
export type CliJsonResult = CliJsonOk | CliJsonErr

/** 默认可注入的 spawn（便于测 mock） */
export async function defaultSpawn(
  args: string[],
  options: { cwd: string; timeoutMs: number },
): Promise<SpawnResult> {
  return new Promise((resolve) => {
    const child = spawn('npx', args, {
      cwd: options.cwd,
      env: process.env,
      shell: false,
    })

    let stdout = ''
    let stderr = ''
    let timedOut = false
    const timer = setTimeout(() => {
      timedOut = true
      child.kill('SIGTERM')
    }, options.timeoutMs)

    child.stdout?.on('data', (chunk: Buffer | string) => {
      stdout += String(chunk)
    })
    child.stderr?.on('data', (chunk: Buffer | string) => {
      stderr += String(chunk)
    })

    child.on('error', (err) => {
      clearTimeout(timer)
      resolve({
        exitCode: null,
        stdout,
        stderr: stderr || err.message,
        timedOut,
      })
    })

    child.on('close', (code) => {
      clearTimeout(timer)
      resolve({
        exitCode: code,
        stdout,
        stderr,
        timedOut,
      })
    })
  })
}

/** 从 stdout 提取首个 JSON 对象（容忍前缀噪声） */
export function extractJsonPayload(stdout: string): unknown {
  const trimmed = stdout.trim()
  if (!trimmed) {
    throw new Error('CLI 无 stdout 输出')
  }
  try {
    return JSON.parse(trimmed)
  } catch {
    const start = trimmed.indexOf('{')
    const end = trimmed.lastIndexOf('}')
    if (start < 0 || end <= start) {
      throw new Error('CLI 输出不是合法 JSON')
    }
    return JSON.parse(trimmed.slice(start, end + 1))
  }
}

/** 提取 stderr 中 WARN 行（供空事件/对照可读） */
export function extractWarnLines(stderr: string): string[] {
  return stderr
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.startsWith('WARN:') || l.startsWith('WARN '))
}

function summarizeCliFailure(result: SpawnResult): { error: string; code: string; detail?: string } {
  if (result.timedOut) {
    return {
      error: 'CLI 调用超时：harness status/timeline 未在时限内返回',
      code: 'CLI_TIMEOUT',
      detail: truncate(result.stderr || result.stdout, 400),
    }
  }
  if (result.exitCode === null) {
    return {
      error: 'CLI 不可用：无法启动 npx / harness（未安装或 PATH 异常）',
      code: 'CLI_SPAWN_FAILED',
      detail: truncate(result.stderr, 400),
    }
  }
  if (result.exitCode !== 0) {
    return {
      error: `CLI 调用失败（exit ${result.exitCode}）：harness 非 0 退出`,
      code: 'CLI_NONZERO',
      detail: truncate(result.stderr || result.stdout, 500),
    }
  }
  return {
    error: 'CLI 输出解析失败',
    code: 'CLI_JSON_PARSE',
    detail: truncate(result.stdout || result.stderr, 400),
  }
}

function truncate(s: string, max: number): string {
  const t = s.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max)}…`
}

export type HarnessSubcommand = 'status' | 'timeline'

/**
 * 组装 `npx <pin> <status|timeline> … --json` argv。
 * 默认不含 `--ingest`；仅 timeline + ingest===true 时追加。
 */
export function buildHarnessCliArgs(options: {
  subcommand: HarnessSubcommand
  repoRoot: string
  taskPath: string
  ingest?: boolean
}): string[] {
  const pkg = getHarnessPackage(options.repoRoot)
  if (options.subcommand === 'status') {
    return [
      '--yes',
      pkg,
      'status',
      '--target',
      options.repoRoot,
      '--task',
      options.taskPath,
      '--json',
    ]
  }

  const args = [
    '--yes',
    pkg,
    'timeline',
    '--task',
    options.taskPath,
    '--target',
    options.repoRoot,
    '--json',
  ]
  if (options.ingest === true) {
    args.push('--ingest')
  }
  return args
}

/**
 * 跑 `npx <pin> <status|timeline> … --json`（默认无 --ingest）。
 */
export async function runHarnessJson(options: {
  repoRoot: string
  subcommand: HarnessSubcommand
  taskPath: string
  spawn?: SpawnFn
  timeoutMs?: number
  /** 仅 timeline 生效；默认 false（禁静默 ingest） */
  ingest?: boolean
}): Promise<CliJsonResult> {
  const spawnFn = options.spawn ?? defaultSpawn
  const timeoutMs = options.timeoutMs ?? DEFAULT_CLI_TIMEOUT_MS

  const args = buildHarnessCliArgs({
    subcommand: options.subcommand,
    repoRoot: options.repoRoot,
    taskPath: options.taskPath,
    ingest: options.ingest,
  })

  let result: SpawnResult
  try {
    result = await spawnFn(args, { cwd: options.repoRoot, timeoutMs })
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return {
      ok: false,
      error: `CLI 不可用：${msg}`,
      code: 'CLI_SPAWN_FAILED',
    }
  }

  if (result.timedOut || result.exitCode === null || result.exitCode !== 0) {
    const fail = summarizeCliFailure(result)
    return { ok: false, ...fail }
  }

  try {
    const data = extractJsonPayload(result.stdout)
    const warnings = extractWarnLines(result.stderr)
    return warnings.length > 0
      ? { ok: true, data, warnings }
      : { ok: true, data }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return {
      ok: false,
      error: `CLI JSON 解析失败：${msg}`,
      code: 'CLI_JSON_PARSE',
      detail: truncate(result.stdout, 400),
    }
  }
}
