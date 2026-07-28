import { describe, expect, it } from 'vitest'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  getObsStatus,
  getObsTimeline,
  listTaskDocs,
  readTaskDoc,
  rejectWriteGate,
  resolveSafeTaskMd,
} from '../server/obsHandlers'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

describe('obs stub API · 只读边界', () => {
  it('stub obs_status.v1 成功且标注 source=stub', () => {
    const result = getObsStatus(
      'docs/tasks/active/task_web_obs_demo_scaffold_vite_shell_v1.md',
    )
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data.schema).toBe('obs_status.v1')
    expect(result.data.source).toBe('stub')
    expect(result.data.note).toMatch(/非签收真值/)
  })

  it('stub obs_timeline.v1 成功', () => {
    const result = getObsTimeline(null)
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data.schema).toBe('obs_timeline.v1')
    expect(result.data.events.length).toBeGreaterThan(0)
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
