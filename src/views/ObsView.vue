<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; code: string; detail?: string }

type DocListItem = {
  relativePath: string
  name: string
  mtimeMs: number
}

type SourceMode = 'live' | 'stub'

const DEFAULT_TASK =
  'docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md'

const statusJson = ref<string>('')
const timelineJson = ref<string>('')
const error = ref<string>('')
const errorDetail = ref<string>('')
const loading = ref(false)
const tasks = ref<DocListItem[]>([])
const selectedTask = ref(DEFAULT_TASK)
const source = ref<SourceMode>('live')

const taskOptions = computed(() => {
  if (tasks.value.length === 0) {
    return [
      DEFAULT_TASK,
      'docs/tasks/done/task_web_obs_demo_scaffold_vite_shell_v1.md',
    ]
  }
  return tasks.value.map((t) => t.relativePath)
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
  statusJson.value = ''
  timelineJson.value = ''

  const task = selectedTask.value.trim()
  if (!task && source.value === 'live') {
    error.value = '无可用 task：请选择 docs/tasks 下的 Markdown'
    loading.value = false
    return
  }

  const q = new URLSearchParams()
  if (task) q.set('task', task)
  q.set('source', source.value)
  const qs = q.toString()

  try {
    const [statusRes, timelineRes] = await Promise.all([
      fetch(`/api/obs/status?${qs}`),
      fetch(`/api/obs/timeline?${qs}`),
    ])
    const status = (await statusRes.json()) as ApiResult<unknown>
    const timeline = (await timelineRes.json()) as ApiResult<unknown>

    if (!status.ok) {
      error.value = formatErr(status, statusRes.ok)
      errorDetail.value = status.detail ?? ''
    } else {
      statusJson.value = JSON.stringify(status.data, null, 2)
    }

    if (!timeline.ok) {
      const tlErr = formatErr(timeline, timelineRes.ok)
      error.value = error.value || tlErr
      if (!errorDetail.value && timeline.detail) {
        errorDetail.value = timeline.detail
      }
    } else {
      timelineJson.value = JSON.stringify(timeline.data, null, 2)
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

      <button type="button" class="btn" :disabled="loading" @click="load">
        {{ loading ? '加载中…' : '重新加载' }}
      </button>
    </div>

    <p v-if="error" class="err">{{ error }}</p>
    <pre v-if="errorDetail" class="err-detail">{{ errorDetail }}</pre>

    <h2>status</h2>
    <pre v-if="statusJson" class="code">{{ statusJson }}</pre>
    <p v-else class="muted">暂无 status 投影（空态或失败，见上方错误）</p>

    <h2>timeline</h2>
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
