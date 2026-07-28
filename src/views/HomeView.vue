<script setup lang="ts">
import { onMounted, ref } from 'vue'
import MarkdownView from '@/components/MarkdownView.vue'

type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string; code: string }

// 首页经典样例（须在 docs/tasks/ 树下，API 才允许读取）
const SHOWCASE_PATH = 'docs/tasks/samples/showcase_getting_started.md'

const showcase = ref('')
const showcaseError = ref('')
const loading = ref(false)

async function loadShowcase() {
  loading.value = true
  showcaseError.value = ''
  showcase.value = ''
  try {
    const res = await fetch(
      `/api/docs/content?path=${encodeURIComponent(SHOWCASE_PATH)}`,
    )
    const body = (await res.json()) as ApiResult<{
      relativePath: string
      content: string
    }>
    if (!body.ok) {
      showcaseError.value = `无法加载示例：${body.error}`
      return
    }
    showcase.value = body.data.content
  } catch (err) {
    showcaseError.value = `无法加载示例：${err instanceof Error ? err.message : String(err)}`
  } finally {
    loading.value = false
  }
}

onMounted(loadShowcase)
</script>

<template>
  <section class="panel">
    <h1>Harness 过程可观测 Demo</h1>
    <p class="lede">
      本站只读浏览仓库里的说明文档，以及本地工具输出的状态。
      页面不能改写审批结果——屏幕上的内容仅供查看，不能代替人工签收。
    </p>

    <p class="readonly-banner">只读浏览 · 页面不能改写审批结果</p>

    <h2>快速上手</h2>
    <ol>
      <li><code>pnpm install</code></li>
      <li><code>pnpm dev</code> → 打开本页、「运行状态」、「文档」</li>
      <li>合并前：<code>pnpm lint</code> → <code>pnpm test</code> → <code>pnpm build</code></li>
    </ol>

    <h2>页面说明</h2>
    <ul>
      <li>
        <strong>文档</strong>：只读打开 <code>docs/tasks/</code> 下的 Markdown，排版预览。
      </li>
      <li>
        <strong>运行状态</strong>：由服务端调用本地命令行工具读取状态（浏览器不直接跑命令）。
        可切换「示例数据」对照；默认不写盘。
      </li>
      <li>本站没有「批准审批」类写接口；请勿在浏览器里尝试改写审批结果。</li>
    </ul>

    <h2>经典样例</h2>
    <p class="lede">
      下方直接渲染
      <code>{{ SHOWCASE_PATH }}</code>
      ，便于对照「文档」页的效果。
    </p>
    <p v-if="loading" class="muted">加载示例中…</p>
    <p v-else-if="showcaseError" class="err">{{ showcaseError }}</p>
    <MarkdownView v-else-if="showcase" :source="showcase" />
  </section>
</template>
