import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getWikiGraph } from '../server/obsHandlers'
import {
  buildWikiExportArgs,
  type SpawnFn,
  type SpawnResult,
} from '../server/harnessCli'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const fixturePath = path.join(repoRoot, 'tests/fixtures/wiki_graph_v1.json')

function mockSpawn(result: Partial<SpawnResult> & { stdout?: string }): SpawnFn {
  return async () => ({
    exitCode: 'exitCode' in result ? (result.exitCode as number | null) : 0,
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    timedOut: result.timedOut ?? false,
  })
}

describe('wiki-graph API', () => {
  it('buildWikiExportArgs 读 pin 且含 wiki export --json', () => {
    const args = buildWikiExportArgs({
      repoRoot,
      wikiRoot: 'docs/coding_wiki',
    })
    expect(args).toContain('wiki')
    expect(args).toContain('export')
    expect(args).toContain('--json')
    expect(args).toContain('--root')
    expect(args).toContain('docs/coding_wiki')
    expect(args.some((a) => a.startsWith('@cyning/harness@'))).toBe(true)
  })

  it('fixture JSON → getWikiGraph 解析 nodes≥1', async () => {
    const raw = fs.readFileSync(fixturePath, 'utf8')
    const fixture = JSON.parse(raw) as { schema: string; nodes: unknown[] }
    expect(fixture.schema).toBe('harness.wiki_graph.v1')
    expect(fixture.nodes.length).toBeGreaterThan(0)

    const spawn = mockSpawn({ stdout: raw })
    const result = await getWikiGraph(repoRoot, { spawn })
    expect(result.ok).toBe(true)
    if (!result.ok) return
    expect(result.data.schema).toBe('harness.wiki_graph.v1')
    expect(result.data.nodes.length).toBeGreaterThan(0)
    expect(result.data.edges.length).toBeGreaterThan(0)
  })

  it('负向 · wiki root 含 .. 拒绝', async () => {
    const result = await getWikiGraph(repoRoot, { wikiRoot: 'docs/../package.json' })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.code).toBe('INVALID_WIKI_ROOT')
  })

  it('负向 · schema 不匹配', async () => {
    const spawn = mockSpawn({
      stdout: JSON.stringify({ schema: 'other', nodes: [], edges: [] }),
    })
    const result = await getWikiGraph(repoRoot, { spawn })
    expect(result.ok).toBe(false)
    if (result.ok) return
    expect(result.code).toBe('WIKI_SCHEMA_MISMATCH')
  })
})
