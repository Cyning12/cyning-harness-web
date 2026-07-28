import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  buildHarnessPackageSpec,
  parseHarnessPinJson,
  readHarnessPin,
  resolveHarnessPackage,
} from '../server/harnessPin'
import { getHarnessVersion } from '../server/obsHandlers'
import { buildHarnessCliArgs } from '../server/harnessCli'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

describe('harness.pin · 解析', () => {
  it('合法 pin JSON → package + version', () => {
    const result = parseHarnessPinJson(
      JSON.stringify({ package: '@cyning/harness', version: '2.17.0' }),
    )
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data.package).toBe('@cyning/harness')
    expect(result.data.version).toBe('2.17.0')
    expect(buildHarnessPackageSpec(result.data)).toBe('@cyning/harness@2.17.0')
  })

  it('负向 · 非法 version → PIN_VERSION_INVALID', () => {
    const result = parseHarnessPinJson(
      JSON.stringify({ package: '@cyning/harness', version: 'latest' }),
    )
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.code).toBe('PIN_VERSION_INVALID')
  })

  it('负向 · 非 JSON → PIN_JSON_INVALID', () => {
    const result = parseHarnessPinJson('not-json')
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.code).toBe('PIN_JSON_INVALID')
  })

  it('仓根 harness.pin.json 可读且与 CLI 同源', () => {
    const pin = readHarnessPin(repoRoot)
    expect(pin.ok).toBe(true)
    if (!pin.ok) return
    const pkg = resolveHarnessPackage(repoRoot)
    expect(pkg).toBe(`${pin.data.package}@${pin.data.version}`)

    const args = buildHarnessCliArgs({
      subcommand: 'status',
      repoRoot,
      taskPath: 'docs/tasks/done/task_web_obs_demo_hgm_consumer_v1.md',
    })
    expect(args).toContain(pkg)
    expect(args.some((a) => /^@cyning\/harness@\d+\.\d+\.\d+/.test(a))).toBe(true)
  })
})

describe('GET harness-version · handler', () => {
  it('成功路径：pinned + manifest；npm mock 一致 → behind=false', async () => {
    const pin = readHarnessPin(repoRoot)
    expect(pin.ok).toBe(true)
    if (!pin.ok) return

    const result = await getHarnessVersion(repoRoot, {
      npmView: async () => pin.data.version,
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data.pinned).toBe(pin.data.version)
    expect(result.data.package).toBe(pin.data.package)
    expect(result.data.manifest_version).toBeTruthy()
    expect(result.data.npm_latest).toBe(pin.data.version)
    expect(result.data.behind).toBe(false)
    expect(result.data.npm_error).toBeUndefined()
  })

  it('落后：npm_latest > pinned → behind=true', async () => {
    const result = await getHarnessVersion(repoRoot, {
      npmView: async () => '99.0.0',
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data.npm_latest).toBe('99.0.0')
    expect(result.data.behind).toBe(true)
  })

  it('负向 · npm 探测失败 → npm_latest 空 + 可读 npm_error；不炸', async () => {
    const result = await getHarnessVersion(repoRoot, {
      npmView: async () => {
        throw new Error('ETIMEDOUT mock')
      },
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data.pinned).toBeTruthy()
    expect(result.data.npm_latest).toBeNull()
    expect(result.data.behind).toBeNull()
    expect(result.data.npm_error).toMatch(/ETIMEDOUT|探测|失败|超时/)
  })
})
