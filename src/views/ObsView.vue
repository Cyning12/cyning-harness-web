<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type ApiResult<T> =
  | { ok: true; data: T; warnings?: string[] }
  | { ok: false; error: string; code: string; detail?: string }

type DocListItem = {
  relativePath: string
  name: string
  mtimeMs: number
}

type SourceMode = 'live' | 'stub'

type TimelineLike = {
  events?: unknown[]
  event_count?: number
  ingested?: boolean
  schema_version?: string
  schema?: string
}

type StatusLike = {
  hgm?: { event_count?: number; last_at?: string | null }
  may_start_30?: boolean
  schema_version?: string
  schema?: string
}

const DEFAULT_TASK =
  'docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md'

const statusJson = ref<string>('')
const timelineJson = ref<string>('')
const statusData = ref<StatusLike | null>(null)
const timelineData = ref<TimelineLike | null>(null)
const error = ref<string>('')
const errorDetail = ref<string>('')
const warnings = ref<string[]>([])
const loading = ref(false)
const tasks = ref<DocListItem[]>([])
const selectedTask = ref(DEFAULT_TASK)
const source = ref<SourceMode>('live')
/** 默认 off：禁止静默 ingest；勾选后才传 ?ingest=1 */
const ingestEnabled = ref(false)

const taskOptions = computed(() => {
  if (tasks.value.length === 0) {
    return [
      DEFAULT_TASK,
      'docs/tasks/done/task_web_obs_demo_chain_dogfood_v1.md',
    ]
  }
  return tasks.value.map((t) => t.relativePath)
})

const timelineEmpty = computed(() => {
  const d = timelineData.value
  if (!d) return false
  if (typeof d.event_count === 'number') return d.event_count === 0
  if (Array.isArray(d.events)) return d.events.length === 0
  return false
})

const statusHgmCount = computed(() => {
  const n = statusData.value?.hgm?.event_count
  return typeof n === 'number' ? n : null
})

const compareNote = computed(() => {
  const statusN = statusHgmCount.value
  const tl = timelineData.value
  const tlN =
    typeof tl?.event_count === 'number'
      ? tl.event_count
      : Array.isArray(tl?.events)
        ? tl.events.length
        : null
  if (statusN === null && tlN === null) return ''
  if (statusN !== null && tlN !== null) {
    if (statusN === tlN) {
      return `对照一致：status.hgm.event_count=${statusN} · timeline.event_count=${tlN}`
    }
    return `对照差异：status.hgm.event_count=${statusN} · timeline.event_count=${tlN}（可能因未 ingest / 缓存或投影窗口不同；以 CLI 真值为准）`
  }
  if (statusN !== null) {
    return `status.hgm.event_count=${statusN}（timeline 未给出可数事件）`
  }
  return `timeline.event_count=${tlN}（status 无 hgm.event_count）`
})

function formatErr(body: ApiResult<unknown>, httpOk: boolean): string {
  if (!httpOk && !('error' in body)) {
    return '请求失败（非 JSON 或网络错误）'
  }
  if (!body.ok) {
    const code = body.code ? ` [${body.code}]` : ''
    return `${body.error}${code}`
  }
  return ''
}

async function loadTasks() {
  try {
    const res = await fetch('/api/docs')
    const body = (await res.json()) as ApiResult<DocListItem[]>
    if (body.ok && body.data.length > 0) {
      tasks.value = body.data
      const prefer =
        body.data.find((d) => d.relativePath.includes('hgm_consumer')) ??
        body.data.find((d) => d.relativePath.includes('/active/')) ??
        body.data[0]
      if (!selectedTask.value || !body.data.some((d) => d.relativePath === selectedTask.value)) {
        selectedTask.value = prefer.relativePath
      }
    }
  } catch {
    // 列表失败不挡后续；保留默认样例路径
  }
}

async function load() {
  loading.value = true
  error.value = ''
  errorDetail.value = ''
  warnings.value = []
  statusJson.value = ''
  timelineJson.value = ''
  statusData.value = null
  timelineData.value = null

  const task = selectedTask.value.trim()
  if (!task && source.value === 'live') {
    error.value = '无可用 task：请选择 docs/tasks 下的 Markdown'
    loading.value = false
    return
  }

  const q = new URLSearchParams()
  if (task) q.set('task', task)
  q.set('source', source.value)
  const statusQs = q.toString()

  const tlQ = new URLSearchParams(q)
  if (ingestEnabled.value) tlQ.set('ingest', '1')
  const timelineQs = tlQ.toString()

  try {
    const [statusRes, timelineRes] = await Promise.all([
      fetch(`/api/obs/status?${statusQs}`),
      fetch(`/api/obs/timeline?${timelineQs}`),
    ])
    const status = (await statusRes.json()) as ApiResult<unknown>
    const timeline = (await timelineRes.json()) as ApiResult<unknown>

    if (!status.ok) {
      error.value = formatErr(status, statusRes.ok)
      errorDetail.value = status.detail ?? ''
    } else {
      statusData.value = status.data as StatusLike
      statusJson.value = JSON.stringify(status.data, null, 2)
      if (status.warnings?.length) {
        warnings.value.push(...status.warnings)
      }
    }

    if (!timeline.ok) {
      const tlErr = formatErr(timeline, timelineRes.ok)
      error.value = error.value || tlErr
      if (!errorDetail.value && timeline.detail) {
        errorDetail.value = timeline.detail
      }
    } else {
      timelineData.value = timeline.data as TimelineLike
      timelineJson.value = JSON.stringify(timeline.data, null, 2)
      if (timeline.warnings?.length) {
        warnings.value.push(...timeline.warnings)
      }
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await loadTasks()
  await load()
})
</script>

<template>
  <section class="panel">
    <h1>过程投影 · /obs</h1>
    <p class="readonly-banner">只读投影 · 非签收真值</p>
    <p class="lede">
      默认经服务端 spawn
      <code>harness status|timeline --json</code>（不带
      <code>--ingest</code>）。可用 stub 切换对照；浏览器不调 CLI。
      status 与 timeline 同页对照；空事件 / WARN 单独可读。
    </p>

    <div class="controls">
      <label class="field">
        <span>task</span>
        <select v-model="selectedTask" :disabled="loading">
          <option v-for="p in taskOptions" :key="p" :value="p">
            {{ p }}
          </option>
        </select>
      </label>

      <label class="field">
        <span>source</span>
        <select v-model="source" :disabled="loading">
          <option value="live">live（CLI）</option>
          <option value="stub">stub</option>
        </select>
      </label>

      <label class="check">
        <input v-model="ingestEnabled" type="checkbox" :disabled="loading || source === 'stub'">
        <span>显式 timeline <code>--ingest</code></span>
      </label>

      <button type="button" class="btn" :disabled="loading" @click="load">
        {{ loading ? '加载中…' : '重新加载' }}
      </button>
    </div>

    <p v-if="ingestEnabled" class="ingest-warn" role="alert">
      警告：勾选后服务端会对 <code>timeline</code> 追加
      <code>--ingest</code>，<strong>会写 events</strong>（HGM 落盘）。默认路径从不静默 ingest。
    </p>

    <p v-if="error" class="err">{{ error }}</p>
    <pre v-if="errorDetail" class="err-detail">{{ errorDetail }}</pre>

    <div v-if="warnings.length" class="warn-box" role="status">
      <p class="warn-title">CLI WARN（可读）</p>
      <ul>
        <li v-for="(w, i) in warnings" :key="i">{{ w }}</li>
      </ul>
    </div>

    <p v-if="compareNote" class="compare">{{ compareNote }}</p>

    <h2>status</h2>
    <pre v-if="statusJson" class="code">{{ statusJson }}</pre>
    <p v-else class="muted">暂无 status 投影（空态或失败，见上方错误）</p>

    <h2>timeline</h2>
    <p v-if="timelineEmpty" class="empty-events">
      空事件：当前 timeline 无匹配 HGM 事件（event_count=0）。
      可先只读对照 status.hgm；若需写盘再<strong>显式</strong>勾选上方
      <code>--ingest</code>（会写 events），或 CLI
      <code>graph ingest</code>。详见
      <code>docs/evidence/hgm_consumer_20260728.md</code>。
    </p>
    <pre v-if="timelineJson" class="code">{{ timelineJson }}</pre>
    <p v-else class="muted">暂无 timeline 投影（空态或失败，见上方错误）</p>
  </section>
</template>

<style scoped>
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
  align-items: flex-end;
  margin: 1rem 0 1.25rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
  min-width: min(100%, 22rem);
}

.field select {
  font: inherit;
  padding: 0.35rem 0.5rem;
}

.check {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  padding-bottom: 0.2rem;
}

.ingest-warn {
  margin: 0 0 1rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid color-mix(in srgb, darkorange 55%, transparent);
  background: color-mix(in srgb, darkorange 14%, transparent);
  border-radius: 4px;
  font-size: 0.9rem;
}

.warn-box {
  margin: 0 0 1rem;
  padding: 0.65rem 0.85rem;
  border: 1px solid color-mix(in srgb, goldenrod 50%, transparent);
  background: color-mix(in srgb, goldenrod 12%, transparent);
  border-radius: 4px;
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

.compare {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: color-mix(in srgb, currentColor 78%, transparent);
}

.empty-events {
  margin: 0 0 0.75rem;
  padding: 0.65rem 0.85rem;
  border-radius: 4px;
  background: color-mix(in srgb, currentColor 6%, transparent);
  font-size: 0.9rem;
}

.err-detail {
  margin: 0.35rem 0 1rem;
  padding: 0.75rem;
  background: color-mix(in srgb, crimson 12%, transparent);
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: pre-wrap;
  overflow-x: auto;
}
</style>
