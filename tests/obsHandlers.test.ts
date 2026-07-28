import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  getObsStatus,
  getObsTimeline,
  listTaskDocs,
  readTaskDoc,
  rejectWriteGate,
  resolveObsSource,
  resolveSafeTaskMd,
} from '../server/obsHandlers'
import {
  extractJsonPayload,
  type SpawnFn,
  type SpawnResult,
} from '../server/harnessCli'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const SAMPLE_TASK =
  'docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md'

function mockSpawn(result: Partial<SpawnResult> & { stdout?: string }): SpawnFn {
  return async () => ({
    exitCode: 'exitCode' in result ? (result.exitCode as number | null) : 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    timedOut: result.timedOut ?? false,
  })
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
