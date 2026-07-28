/**
 * 纪律包版本钉（单源真值）：仓根 harness.pin.json
 */
import fs from 'node:fs'
import path from 'node:path'

export const PIN_FILENAME = 'harness.pin.json'

export type HarnessPin = {
  package: string
  version: string
}

export type PinParseOk = { ok: true; data: HarnessPin }
export type PinParseErr = { ok: false; error: string; code: string }
export type PinParseResult = PinParseOk | PinParseErr

const SEMVER_RE = /^\d+\.\d+\.\d+([+-].*)?$/

/** 解析 pin JSON 字符串（可单测 · 不读盘） */
export function parseHarnessPinJson(raw: string): PinParseResult {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return { ok: false, error: 'pin 不是合法 JSON', code: 'PIN_JSON_INVALID' }
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    return { ok: false, error: 'pin 须为对象', code: 'PIN_SHAPE_INVALID' }
  }
  const obj = parsed as Record<string, unknown>
  const pkg = obj.package
  const version = obj.version
  if (typeof pkg !== 'string' || !pkg.trim()) {
    return { ok: false, error: 'pin.package 缺失或非法', code: 'PIN_PACKAGE_INVALID' }
  }
  if (typeof version !== 'string' || !SEMVER_RE.test(version.trim())) {
    return {
      ok: false,
      error: 'pin.version 缺失或非法（须为 x.y.z）',
      code: 'PIN_VERSION_INVALID',
    }
  }
  return {
    ok: true,
    data: { package: pkg.trim(), version: version.trim() },
  }
}

/** 同步读仓根 pin */
export function readHarnessPin(repoRoot: string): PinParseResult {
  const pinPath = path.join(repoRoot, PIN_FILENAME)
  let raw: string
  try {
    raw = fs.readFileSync(pinPath, 'utf8')
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    return {
      ok: false,
      error: `无法读取 ${PIN_FILENAME}：${msg}`,
      code: 'PIN_MISSING',
    }
  }
  return parseHarnessPinJson(raw)
}

/** 组装 npx 包规格：@cyning/harness@x.y.z */
export function buildHarnessPackageSpec(pin: HarnessPin): string {
  return `${pin.package}@${pin.version}`
}

/**
 * 从 pin 解析 npx 包规格；失败抛错（供 CLI 组装路径使用）。
 */
export function resolveHarnessPackage(repoRoot: string): string {
  const result = readHarnessPin(repoRoot)
  if (!result.ok) {
    throw new Error(`[harness.pin] ${result.error} [${result.code}]`)
  }
  return buildHarnessPackageSpec(result.data)
}
