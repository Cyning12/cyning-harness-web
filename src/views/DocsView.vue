<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MarkdownView from '@/components/MarkdownView.vue'

type DocListItem = {
  relativePath: string
  name: string
  mtimeMs: number
}

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; code: string }

const route = useRoute()
const router = useRouter()

const items = ref<DocListItem[]>([])
const selected = ref<string>('')
const content = ref<string>('')
const listError = ref<string>('')
const contentError = ref<string>('')
const loadingList = ref(false)
const loadingContent = ref(false)
/** 次要：查看 Markdown 源码 */
const showSource = ref(false)

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
  } catch (err) {
    listError.value = err instanceof Error ? err.message : String(err)
  } finally {
    loadingList.value = false
  }
}

async function openDoc(relativePath: string, syncQuery = true) {
  selected.value = relativePath
  loadingContent.value = true
  contentError.value = ''
  content.value = ''
  showSource.value = false
  if (syncQuery && route.query.path !== relativePath) {
    await router.replace({ path: '/docs', query: { path: relativePath } })
  }
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

async function openFromQueryOrDefault() {
  const q = route.query.path
  const pathFromQuery = typeof q === 'string' ? q.trim() : ''
  if (pathFromQuery) {
    await openDoc(pathFromQuery, false)
    return
  }
  if (items.value.length > 0) {
    await openDoc(items.value[0].relativePath)
  }
}

watch(
  () => route.query.path,
  (path) => {
    if (typeof path === 'string' && path.trim() && path !== selected.value) {
      void openDoc(path.trim(), false)
    }
  },
)

onMounted(async () => {
  await loadList()
  await openFromQueryOrDefault()
})
</script>

<template>
  <section class="panel">
    <h1>文档</h1>
    <p class="readonly-banner">只读浏览 · 页面不能改写审批结果</p>
    <p class="lede">
      左侧列出 <code>docs/tasks/</code>；正文内的相对
      <code>.md</code> 链接按本地文件语义解析，可打开
      <code>docs/**</code> 下互链（如 SPEC、图谱）。本页只读。
    </p>

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
        <p v-if="selected" class="doc-current muted">当前：{{ selected }}</p>
        <p v-if="loadingContent" class="muted">读取中…</p>
        <p v-else-if="contentError" class="err">{{ contentError }}</p>
        <template v-else-if="content">
          <div class="doc-toolbar">
            <button
              type="button"
              class="btn btn-sm"
              @click="showSource = !showSource"
            >
              {{ showSource ? '查看排版' : '查看源码' }}
            </button>
          </div>
          <pre v-if="showSource" class="code">{{ content }}</pre>
          <MarkdownView v-else :source="content" :base-path="selected" />
        </template>
        <p v-else class="muted">选择左侧文档以预览</p>
      </article>
    </div>
  </section>
</template>
