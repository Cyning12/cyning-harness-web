import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  getObsStatus,
  getObsTimeline,
  listTaskDocs,
  readTaskDoc,
  rejectWriteGate,
  resolveIngestFlag,
  resolveObsSource,
  resolveSafeTaskMd,
} from '../server/obsHandlers'
import {
  buildHarnessCliArgs,
  extractJsonPayload,
  extractWarnLines,
  type SpawnFn,
  type SpawnResult,
} from '../server/harnessCli'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SAMPLE_TASK =
  'docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md'

function mockSpawn(result: Partial<SpawnResult> & { stdout?: string }): SpawnFn {
  return async () => ({
    exitCode: 'exitCode' in result ? (result.exitCode as number | null) : 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    timedOut: result.timedOut ?? false,
  })
}

function capturingSpawn(
  result: Partial<SpawnResult> & { stdout?: string },
  sink: { args?: string[] },
): SpawnFn {
  return async (args) => {
    sink.args = args
    return mockSpawn(result)(args, { cwd: repoRoot, timeoutMs: 1000 })
  }
}

describe('obs API · stub / live / 只读边界', () => {
  it('stub obs_status.v1 成功且标注 source=stub', async () => {
    const result = await getObsStatus(repoRoot, SAMPLE_TASK, { source: 'stub' })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const data = result.data as { schema: string; source: string; note: string }
    expect(data.schema).toBe('obs_status.v1')
    expect(data.source).toBe('stub')
    expect(data.note).toMatch(/非签收真值/)
  })

  it('stub obs_timeline.v1 成功', async () => {
    const result = await getObsTimeline(repoRoot, null, { source: 'stub' })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    const data = result.data as { schema: string; events: unknown[] }
    expect(data.schema).toBe('obs_timeline.v1')
    expect(data.events.length).toBeGreaterThan(0)
  })

  it('live 无 task → 可读 NO_TASK', async () => {
    const result = await getObsStatus(repoRoot, null, { source: 'live' })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.code).toBe('NO_TASK')
    expect(result.error).toMatch(/无可用 task/)
  })

  it('live spawn 失败 → 可读 CLI 错误', async () => {
    const spawn = mockSpawn({
      exitCode: null,
      stderr: 'spawn npx ENOENT',
    })
    const result = await getObsStatus(repoRoot, SAMPLE_TASK, {
      source: 'live',
      spawn,
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.code).toBe('CLI_SPAWN_FAILED')
    expect(result.error).toMatch(/CLI 不可用/)
  })

  it('live CLI 非 0 → CLI_NONZERO', async () => {
    const spawn = mockSpawn({
      exitCode: 1,
      stderr: 'harness: task not found',
    })
    const result = await getObsTimeline(repoRoot, SAMPLE_TASK, {
      source: 'live',
      spawn,
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.code).toBe('CLI_NONZERO')
    expect(result.detail).toMatch(/task not found/)
  })

  it('live JSON 解析失败 → CLI_JSON_PARSE', async () => {
    const spawn = mockSpawn({
      exitCode: 0,
      stdout: 'not-json-at-all',
    })
    const result = await getObsStatus(repoRoot, SAMPLE_TASK, {
      source: 'live',
      spawn,
    })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.code).toBe('CLI_JSON_PARSE')
  })

  it('live 成功路径（mock spawn）投影 JSON', async () => {
    const payload = {
      schema_version: 'obs_status.v1',
      task_path: SAMPLE_TASK,
      may_start_30: true,
    }
    const spawn = mockSpawn({
      exitCode: 0,
      stdout: JSON.stringify(payload),
    })
    const result = await getObsStatus(repoRoot, SAMPLE_TASK, {
      source: 'live',
      spawn,
    })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data).toEqual(payload)
  })

  it('默认 timeline argv 不含 --ingest', async () => {
    const sink: { args?: string[] } = {}
    const payload = {
      schema_version: 'obs_timeline.v1',
      event_count: 0,
      events: [],
      ingested: false,
    }
    const spawn = capturingSpawn(
      {
        exitCode: 0,
        stdout: JSON.stringify(payload),
        stderr: 'WARN: 无 HGM 数据（该 task 无匹配事件）',
      },
      sink,
    )
    const result = await getObsTimeline(repoRoot, SAMPLE_TASK, {
      source: 'live',
      spawn,
    })
    expect(result.ok).toBe(true)
    expect(sink.args).toBeDefined()
    expect(sink.args).not.toContain('--ingest')
    if (!result.ok) return
    expect(result.warnings?.[0]).toMatch(/WARN/)
  })

  it('显式 ingest=true 才带 --ingest', async () => {
    const sink: { args?: string[] } = {}
    const payload = {
      schema_version: 'obs_timeline.v1',
      event_count: 1,
      events: [{ kind: 'test' }],
      ingested: true,
    }
    const spawn = capturingSpawn(
      { exitCode: 0, stdout: JSON.stringify(payload) },
      sink,
    )
    const result = await getObsTimeline(repoRoot, SAMPLE_TASK, {
      source: 'live',
      spawn,
      ingest: true,
    })
    expect(result.ok).toBe(true)
    expect(sink.args).toContain('--ingest')
  })

  it('buildHarnessCliArgs：status/timeline 默认无 ingest；显式才追加', () => {
    const statusArgs = buildHarnessCliArgs({
      subcommand: 'status',
      repoRoot: '/tmp/repo',
      taskPath: SAMPLE_TASK,
      ingest: true,
    })
    expect(statusArgs).not.toContain('--ingest')

    const tlDefault = buildHarnessCliArgs({
      subcommand: 'timeline',
      repoRoot: '/tmp/repo',
      taskPath: SAMPLE_TASK,
    })
    expect(tlDefault).not.toContain('--ingest')

    const tlIngest = buildHarnessCliArgs({
      subcommand: 'timeline',
      repoRoot: '/tmp/repo',
      taskPath: SAMPLE_TASK,
      ingest: true,
    })
    expect(tlIngest).toContain('--ingest')
  })

  it('resolveIngestFlag 默认 false；仅显式真值', () => {
    expect(resolveIngestFlag(null)).toBe(false)
    expect(resolveIngestFlag('')).toBe(false)
    expect(resolveIngestFlag('0')).toBe(false)
    expect(resolveIngestFlag('false')).toBe(false)
    expect(resolveIngestFlag('1')).toBe(true)
    expect(resolveIngestFlag('true')).toBe(true)
    expect(resolveIngestFlag('yes')).toBe(true)
  })

  it('extractWarnLines 提取 WARN', () => {
    const lines = extractWarnLines(
      'noise\nWARN: 无 HGM 数据\nWARN: invoke hats gap · 缺 40\nok\n',
    )
    expect(lines).toEqual(['WARN: 无 HGM 数据', 'WARN: invoke hats gap · 缺 40'])
  })

  it('extractJsonPayload 容忍前缀噪声', () => {
    const data = extractJsonPayload('noise\n{"a":1}\n')
    expect(data).toEqual({ a: 1 })
  })

  it('resolveObsSource 默认 live', () => {
    expect(resolveObsSource(null)).toBe('live')
    expect(resolveObsSource('stub')).toBe('stub')
  })

  it('拒绝写闸 API', () => {
    const result = rejectWriteGate()
    expect(result.ok).toBe(false)
    expect(result.code).toBe('WRITE_GATE_FORBIDDEN')
  })

  it('拒绝 docs/tasks 外路径与路径穿越', () => {
    const out = resolveSafeTaskMd(repoRoot, 'docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md')
    expect(out.ok).toBe(false)
    if (out.ok) return
    expect(out.code).toBe('PATH_OUT_OF_SCOPE')

    const traversal = resolveSafeTaskMd(repoRoot, 'docs/tasks/../../package.json')
    expect(traversal.ok).toBe(false)
  })

  it('可读 docs/tasks 下至少一个 md', async () => {
    const listed = await listTaskDocs(repoRoot)
    expect(listed.ok).toBe(true)
    if (!listed.ok) return
    expect(listed.data.length).toBeGreaterThan(0)

    const first = listed.data[0]
    const doc = await readTaskDoc(repoRoot, first.relativePath)
    expect(doc.ok).toBe(true)
    if (!doc.ok) return
    expect(doc.data.content.length).toBeGreaterThan(0)
  })
})
