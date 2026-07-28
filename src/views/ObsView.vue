<script setup lang="ts">
import { onMounted, ref } from 'vue'

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; code: string }

const statusJson = ref<string>('')
const timelineJson = ref<string>('')
const error = ref<string>('')
const loading = ref(false)

async function load() {
  loading.value = true
  error.value = ''
  try {
    const [statusRes, timelineRes] = await Promise.all([
      fetch('/api/obs/status'),
      fetch('/api/obs/timeline'),
    ])
    const status = (await statusRes.json()) as ApiResult<unknown>
    const timeline = (await timelineRes.json()) as ApiResult<unknown>
    if (!status.ok) {
      error.value = status.error
      statusJson.value = ''
    } else {
      statusJson.value = JSON.stringify(status.data, null, 2)
    }
    if (!timeline.ok) {
      error.value = error.value || timeline.error
      timelineJson.value = ''
    } else {
      timelineJson.value = JSON.stringify(timeline.data, null, 2)
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <section class="panel">
    <h1>过程投影 · /obs</h1>
    <p class="readonly-banner">只读投影 · 非签收真值</p>
    <p class="lede">
      Phase A 使用服务端 stub JSON（契约名
      <code>obs_status.v1</code> / <code>obs_timeline.v1</code>）。
      live <code>harness status|timeline</code> 属 Phase B。
    </p>

    <button type="button" class="btn" :disabled="loading" @click="load">
      {{ loading ? '加载中…' : '重新加载' }}
    </button>

    <p v-if="error" class="err">{{ error }}</p>

    <h2>status</h2>
    <pre v-if="statusJson" class="code">{{ statusJson }}</pre>
    <p v-else class="muted">暂无 status 投影（空态或失败，见上方错误）</p>

    <h2>timeline</h2>
    <pre v-if="timelineJson" class="code">{{ timelineJson }}</pre>
    <p v-else class="muted">暂无 timeline 投影（空态或失败，见上方错误）</p>
  </section>
</template>
