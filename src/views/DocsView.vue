<script setup lang="ts">
import { onMounted, ref } from 'vue'

type DocListItem = {
  relativePath: string
  name: string
  mtimeMs: number
}

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; code: string }

const items = ref<DocListItem[]>([])
const selected = ref<string>('')
const content = ref<string>('')
const listError = ref<string>('')
const contentError = ref<string>('')
const loadingList = ref(false)
const loadingContent = ref(false)

async function loadList() {
  loadingList.value = true
  listError.value = ''
  try {
    const res = await fetch('/api/docs')
    const body = (await res.json()) as ApiResult<DocListItem[]>
    if (!body.ok) {
      items.value = []
      listError.value = body.error
      return
    }
    items.value = body.data
    if (body.data.length > 0 && !selected.value) {
      await openDoc(body.data[0].relativePath)
    }
  } catch (err) {
    listError.value = err instanceof Error ? err.message : String(err)
  } finally {
    loadingList.value = false
  }
}

async function openDoc(relativePath: string) {
  selected.value = relativePath
  loadingContent.value = true
  contentError.value = ''
  content.value = ''
  try {
    const res = await fetch(
      `/api/docs/content?path=${encodeURIComponent(relativePath)}`,
    )
    const body = (await res.json()) as ApiResult<{
      relativePath: string
      content: string
    }>
    if (!body.ok) {
      contentError.value = body.error
      return
    }
    content.value = body.data.content
  } catch (err) {
    contentError.value = err instanceof Error ? err.message : String(err)
  } finally {
    loadingContent.value = false
  }
}

onMounted(loadList)
</script>

<template>
  <section class="panel">
    <h1>文档 · /docs</h1>
    <p class="readonly-banner">只读投影 · 非签收真值</p>
    <p class="lede">扫描 <code>docs/tasks/**</code> 下 Markdown；只读预览，不写闸。</p>

    <button type="button" class="btn" :disabled="loadingList" @click="loadList">
      {{ loadingList ? '刷新中…' : '刷新列表' }}
    </button>

    <p v-if="listError" class="err">{{ listError }}</p>

    <div class="docs-layout">
      <aside class="doc-list">
        <button
          v-for="item in items"
          :key="item.relativePath"
          type="button"
          class="doc-item"
          :class="{ active: item.relativePath === selected }"
          @click="openDoc(item.relativePath)"
        >
          <span class="doc-name">{{ item.name }}</span>
          <span class="doc-path">{{ item.relativePath }}</span>
        </button>
        <p v-if="!listError && items.length === 0" class="muted">暂无文档</p>
      </aside>
      <article class="doc-body">
        <p v-if="loadingContent" class="muted">读取中…</p>
        <p v-else-if="contentError" class="err">{{ contentError }}</p>
        <pre v-else-if="content" class="code">{{ content }}</pre>
        <p v-else class="muted">选择左侧文档以预览</p>
      </article>
    </div>
  </section>
</template>
