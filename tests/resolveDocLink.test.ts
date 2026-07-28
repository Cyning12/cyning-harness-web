import { describe, expect, it } from 'vitest'
import { normalizePosixPath, resolveDocLink } from '../src/lib/resolveDocLink'

describe('resolveDocLink · 与本地相对路径兼容', () => {
  const base = 'docs/tasks/done/task_web_obs_demo_md_ux_v1.md'

  it('相对 ../.. 解析到 docs/spec', () => {
    const r = resolveDocLink(base, '../../spec/SPEC-cyning-harness-web-obs-demo_v1.md')
    expect(r).toEqual({
      kind: 'doc',
      path: 'docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md',
      hash: '',
    })
  })

  it('同级相对链接', () => {
    const r = resolveDocLink(base, '../done/task_web_obs_demo_ci_evidence_v1.md')
    expect(r.kind).toBe('doc')
    if (r.kind !== 'doc') return
    expect(r.path).toBe('docs/tasks/done/task_web_obs_demo_ci_evidence_v1.md')
  })

  it('仓根写法 docs/... 保持不变', () => {
    const r = resolveDocLink(
      'docs/tasks/samples/showcase_getting_started.md',
      'docs/tasks/README.md',
    )
    expect(r).toEqual({
      kind: 'doc',
      path: 'docs/tasks/README.md',
      hash: '',
    })
  })

  it('保留 hash', () => {
    const r = resolveDocLink(base, '../../_tech_graph/01_struct.md#模块表必填')
    expect(r.kind).toBe('doc')
    if (r.kind !== 'doc') return
    expect(r.path).toBe('docs/_tech_graph/01_struct.md')
    expect(r.hash).toBe('#模块表必填')
  })

  it('外链与页内锚点', () => {
    expect(resolveDocLink(base, 'https://example.com/a').kind).toBe('external')
    expect(resolveDocLink(base, '#section').kind).toBe('hash')
  })

  it('非 md / 仓外 → unsupported', () => {
    const png = resolveDocLink(base, '../../logo.png')
    expect(png.kind).toBe('unsupported')
    const root = resolveDocLink(base, '../../../package.json')
    expect(root.kind).toBe('unsupported')
  })

  it('normalizePosixPath', () => {
    expect(normalizePosixPath('docs/tasks/../spec/./a.md')).toBe('docs/spec/a.md')
  })
})
