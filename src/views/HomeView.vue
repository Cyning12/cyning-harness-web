<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import MarkdownView from '@/components/MarkdownView.vue'

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: string; code: string }

type HarnessVersionInfo = {
  package: string
  pinned: string
  manifest_version: string | null
  npm_latest: string | null
  behind: boolean | null
  error?: string
  npm_error?: string
}

// 首页经典样例（须在 docs/tasks/ 树下，API 才允许读取）
const SHOWCASE_PATH = 'docs/tasks/samples/showcase_getting_started.md'
const RUNBOOK_PATH = 'docs/harness/guides/RUNBOOK_harness_upgrade_v1_zh.md'
const RUNBOOK_HREF =
  'https://github.com/Cyning12/cyning-harness-web/blob/main/docs/harness/guides/RUNBOOK_harness_upgrade_v1_zh.md'

const showcase = ref('')
const showcaseError = ref('')
const loading = ref(false)

const versionInfo = ref<HarnessVersionInfo | null>(null)
const versionError = ref('')
const versionLoading = ref(false)

const versionSummary = computed(() => {
  const v = versionInfo.value
  if (!v) return ''
  const parts = [`本仓钉 ${v.pinned}`]
  if (v.manifest_version) {
    parts.push(`接入清单 ${v.manifest_version}`)
  } else if (v.error) {
    parts.push('接入清单暂不可读')
  }
  if (v.npm_latest) {
    parts.push(`npm 最新 ${v.npm_latest}`)
  } else if (v.npm_error) {
    parts.push('npm 最新版暂时查不到')
  }
  return parts.join(' · ')
})

const versionTone = computed(() => {
  if (versionError.value) return 'err'
  const v = versionInfo.value
  if (!v) return ''
  if (v.behind === true) return 'behind'
  if (v.npm_error) return 'warn'
  return 'ok'
})

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

async function loadHarnessVersion() {
  versionLoading.value = true
  versionError.value = ''
  versionInfo.value = null
  try {
    const res = await fetch('/api/obs/harness-version')
    const body = (await res.json()) as ApiResult<HarnessVersionInfo>
    if (!body.ok) {
      versionError.value = `无法读取纪律包版本：${body.error}`
      return
    }
    versionInfo.value = body.data
  } catch (err) {
    versionError.value = `无法读取纪律包版本：${err instanceof Error ? err.message : String(err)}`
  } finally {
    versionLoading.value = false
  }
}

onMounted(() => {
  void loadShowcase()
  void loadHarnessVersion()
})
</script>

<template>
  <section class="panel">
    <h1>Harness 过程可观测 Demo</h1>
    <p class="lede">
      本站只读浏览仓库里的说明文档，以及本地工具输出的状态。
      页面不能改写审批结果——屏幕上的内容仅供查看，不能代替人工签收。
    </p>

    <p class="readonly-banner">只读浏览 · 页面不能改写审批结果</p>

    <div
      class="version-bar"
      :class="versionTone"
      role="status"
      aria-live="polite"
    >
      <p class="version-title">纪律包版本</p>
      <p v-if="versionLoading" class="muted">正在读取本仓钉版本…</p>
      <p v-else-if="versionError" class="err">{{ versionError }}</p>
      <template v-else-if="versionInfo">
        <p>{{ versionSummary }}</p>
        <p v-if="versionInfo.behind === true" class="behind-note">
          本仓钉版本落后于 npm。请维护者按终端剧本升级，不要在本页点升级。
          <a :href="RUNBOOK_HREF" target="_blank" rel="noopener noreferrer">
            打开升级说明（RUNBOOK）
          </a>
        </p>
        <p v-else-if="versionInfo.behind === false" class="ok-note">
          与 npm 最新版一致（或未检测到更新）。
        </p>
        <p v-if="versionInfo.npm_error" class="muted">
          {{ versionInfo.npm_error }}
        </p>
        <p v-if="versionInfo.error && !versionInfo.manifest_version" class="muted">
          {{ versionInfo.error }}
        </p>
      </template>
    </div>

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
      <li>
        纪律包升级请跟仓内
        <code>{{ RUNBOOK_PATH }}</code>
        （终端执行；本站无升级按钮）。
      </li>
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

<style scoped>
.version-bar {
  margin: 1rem 0 1.25rem;
  padding: 0.75rem 0.9rem;
  border-radius: 4px;
  border: 1px solid color-mix(in srgb, currentColor 18%, transparent);
  background: color-mix(in srgb, currentColor 5%, transparent);
  font-size: 0.92rem;
}

.version-bar.ok {
  border-color: color-mix(in srgb, seagreen 45%, transparent);
  background: color-mix(in srgb, seagreen 10%, transparent);
}

.version-bar.behind {
  border-color: color-mix(in srgb, darkorange 55%, transparent);
  background: color-mix(in srgb, darkorange 12%, transparent);
}

.version-bar.warn {
  border-color: color-mix(in srgb, goldenrod 50%, transparent);
  background: color-mix(in srgb, goldenrod 12%, transparent);
}

.version-bar.err {
  border-color: color-mix(in srgb, crimson 45%, transparent);
  background: color-mix(in srgb, crimson 10%, transparent);
}

.version-title {
  margin: 0 0 0.35rem;
  font-weight: 600;
}

.version-bar p {
  margin: 0.25rem 0;
}

.behind-note a,
.ok-note {
  font-size: 0.9rem;
}
</style>
