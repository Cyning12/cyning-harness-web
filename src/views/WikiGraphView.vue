<script setup lang="ts">
/**
 * Obsidian 风格 Wiki 关系图（只读投影）。
 * 数据来自 GET /api/obs/wiki-graph → harness wiki export --json。
 */
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationNodeDatum,
  type SimulationLinkDatum,
} from 'd3-force'

type ApiResult<T> =
  | { ok: true; data: T; warnings?: string[] }
  | { ok: false; error: string; code: string; detail?: string }

type WikiNode = { id: string; path?: string; title?: string }
type WikiEdge = { source: string; target: string; kind?: string }
type WikiGraph = {
  schema: string
  root?: string
  nodes: WikiNode[]
  edges: WikiEdge[]
  warnings?: string[]
}

type SimNode = SimulationNodeDatum & {
  id: string
  path?: string
  title: string
}

type SimLink = SimulationLinkDatum<SimNode> & {
  kind?: string
}

const router = useRouter()

const loading = ref(false)
const error = ref('')
const errorDetail = ref('')
const warnings = ref<string[]>([])
const graph = ref<WikiGraph | null>(null)
const svgEl = ref<SVGSVGElement | null>(null)
const width = ref(880)
const height = ref(520)
const renderTick = ref(0)
const simNodes = ref<SimNode[]>([])
const simLinks = ref<SimLink[]>([])

let sim: ReturnType<typeof forceSimulation<SimNode, SimLink>> | null = null
let dragId: string | null = null

function labelOf(n: WikiNode): string {
  if (n.title?.trim()) return n.title.trim()
  const p = n.path ?? n.id
  const base = p.split('/').pop() ?? p
  return base.replace(/\.md$/i, '')
}

function stopSim() {
  sim?.stop()
  sim = null
  simNodes.value = []
  simLinks.value = []
}

function bootSimulation(data: WikiGraph) {
  stopSim()
  const w = width.value
  const h = height.value
  const builtNodes: SimNode[] = data.nodes.map((n, i) => ({
    id: n.id,
    path: n.path,
    title: labelOf(n),
    x: w / 2 + Math.cos((i / Math.max(data.nodes.length, 1)) * Math.PI * 2) * 80,
    y: h / 2 + Math.sin((i / Math.max(data.nodes.length, 1)) * Math.PI * 2) * 80,
  }))
  const byId = new Map(builtNodes.map((n) => [n.id, n]))
  const builtLinks: SimLink[] = data.edges
    .filter((e) => byId.has(e.source) && byId.has(e.target))
    .map((e) => ({
      source: byId.get(e.source)!,
      target: byId.get(e.target)!,
      kind: e.kind,
    }))

  simNodes.value = builtNodes
  simLinks.value = builtLinks

  sim = forceSimulation(builtNodes)
    .force(
      'link',
      forceLink<SimNode, SimLink>(builtLinks)
        .id((d) => d.id)
        .distance(90)
        .strength(0.55),
    )
    .force('charge', forceManyBody().strength(-280))
    .force('center', forceCenter(w / 2, h / 2))
    .force('collide', forceCollide(28))
    .on('tick', () => {
      renderTick.value += 1
    })
}

async function load() {
  loading.value = true
  error.value = ''
  errorDetail.value = ''
  warnings.value = []
  try {
    const res = await fetch('/api/obs/wiki-graph')
    const body = (await res.json()) as ApiResult<WikiGraph>
    if (!body.ok) {
      error.value = `${body.error}${body.code ? ` [${body.code}]` : ''}`
      errorDetail.value = body.detail ?? ''
      graph.value = null
      stopSim()
      return
    }
    graph.value = body.data
    if (body.data.warnings?.length) warnings.value = body.data.warnings
    bootSimulation(body.data)
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
    graph.value = null
    stopSim()
  } finally {
    loading.value = false
  }
}

function onPointerDown(ev: PointerEvent, id: string) {
  dragId = id
  ;(ev.target as Element).setPointerCapture?.(ev.pointerId)
  sim?.alphaTarget(0.35).restart()
  const n = simNodes.value.find((x) => x.id === id)
  if (n) {
    n.fx = n.x
    n.fy = n.y
  }
}

function onPointerMove(ev: PointerEvent) {
  if (!dragId || !svgEl.value) return
  const rect = svgEl.value.getBoundingClientRect()
  const x = ((ev.clientX - rect.left) / rect.width) * width.value
  const y = ((ev.clientY - rect.top) / rect.height) * height.value
  const n = simNodes.value.find((x) => x.id === dragId)
  if (n) {
    n.fx = x
    n.fy = y
  }
}

function onPointerUp() {
  if (!dragId) return
  const n = simNodes.value.find((x) => x.id === dragId)
  if (n) {
    n.fx = undefined
    n.fy = undefined
  }
  dragId = null
  sim?.alphaTarget(0)
}

function openNode(n: SimNode) {
  const p = n.path ?? n.id
  if (!p.endsWith('.md')) return
  void router.push({ path: '/docs', query: { path: p } })
}

function linkPath(l: SimLink): string {
  void renderTick.value
  const s = l.source as SimNode
  const t = l.target as SimNode
  return `M${s.x ?? 0},${s.y ?? 0} L${t.x ?? 0},${t.y ?? 0}`
}

function nodeTransform(n: SimNode): string {
  void renderTick.value
  return `translate(${n.x ?? 0},${n.y ?? 0})`
}

onMounted(() => {
  void load()
})

onUnmounted(() => {
  stopSim()
})
</script>

<template>
  <section class="panel">
    <h1>Wiki 关系图</h1>
    <p class="readonly-banner">只读投影 · 非签收真值</p>
    <p class="lede">
      对标 Obsidian Graph View 观感：节点为 wiki 页，边为
      <code>wikilink</code> / Markdown 链。数据来自服务端
      <code>harness wiki export --json</code>（浏览器不跑命令）。
    </p>

    <div class="toolbar">
      <button type="button" class="btn" :disabled="loading" @click="load">
        {{ loading ? '加载中…' : '重新加载' }}
      </button>
      <span v-if="graph" class="muted stats">
        节点 {{ graph.nodes.length }} · 边 {{ graph.edges.length }}
        <template v-if="graph.root"> · 根 {{ graph.root }}</template>
      </span>
    </div>

    <p v-if="error" class="err">{{ error }}</p>
    <pre v-if="errorDetail" class="err-detail">{{ errorDetail }}</pre>

    <div v-if="warnings.length" class="warn-box" role="status">
      <p class="warn-title">导出警告</p>
      <ul>
        <li v-for="(w, i) in warnings" :key="i">{{ w }}</li>
      </ul>
    </div>

    <div v-if="graph && graph.nodes.length === 0" class="empty muted">
      空图：wiki 根下暂无节点。可检查 <code>docs/coding_wiki/</code>。
    </div>

    <div v-else-if="graph" class="graph-frame">
      <svg
        ref="svgEl"
        class="graph-svg"
        :viewBox="`0 0 ${width} ${height}`"
        role="img"
        aria-label="Wiki 关系图"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointerleave="onPointerUp"
      >
        <path
          v-for="(l, i) in simLinks"
          :key="'e' + i"
          class="edge"
          :d="linkPath(l)"
        />
        <g
          v-for="n in simNodes"
          :key="n.id"
          class="node"
          :transform="nodeTransform(n)"
          @pointerdown="onPointerDown($event, n.id)"
          @dblclick="openNode(n)"
        >
          <circle r="8" />
          <text dy="22" text-anchor="middle">{{ n.title }}</text>
        </g>
      </svg>
      <p class="hint muted">拖拽节点 · 双击打开文档页（若路径在 docs/**）</p>
    </div>
  </section>
</template>

<style scoped>
.toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: center;
  margin: 1rem 0 1.1rem;
}

.stats {
  font-size: 0.88rem;
}

.graph-frame {
  border: 1px solid var(--line);
  border-radius: var(--radius, 6px);
  background: #fbfcfd;
  overflow: hidden;
}

.graph-svg {
  display: block;
  width: 100%;
  height: auto;
  min-height: 360px;
  touch-action: none;
  cursor: grab;
}

.node {
  cursor: grab;
}

.node circle {
  fill: #3d4f5c;
  stroke: #fff;
  stroke-width: 1.5;
}

.node text {
  fill: #152028;
  font-size: 11px;
  font-weight: 500;
  pointer-events: none;
  user-select: none;
}

.edge {
  fill: none;
  stroke: #b7c2cb;
  stroke-width: 1.25;
}

.hint {
  margin: 0;
  padding: 0.45rem 0.75rem 0.65rem;
  font-size: 0.8rem;
}

.warn-box {
  margin: 0 0 1rem;
  padding: 0.7rem 0.9rem;
  border: 1px solid color-mix(in srgb, var(--warn, #9a6700) 45%, var(--line));
  background: color-mix(in srgb, var(--warn, #9a6700) 10%, transparent);
  border-radius: var(--radius, 6px);
}

.warn-title {
  margin: 0 0 0.35rem;
  font-weight: 600;
  font-size: 0.9rem;
}

.warn-box ul {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.85rem;
}

.err-detail {
  margin: 0.35rem 0 1rem;
  padding: 0.75rem;
  background: color-mix(in srgb, var(--err) 10%, transparent);
  border-radius: var(--radius, 6px);
  font-size: 0.8rem;
  font-family: ui-monospace, monospace;
  white-space: pre-wrap;
}

.empty {
  margin: 0.5rem 0 1rem;
}
</style>
