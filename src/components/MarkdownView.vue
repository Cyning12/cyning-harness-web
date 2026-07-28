<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { renderMarkdown } from '@/lib/renderMarkdown'
import { resolveDocLink } from '@/lib/resolveDocLink'

const props = defineProps<{
  source: string
  /** 当前文档相对仓根路径；有值时相对 .md 链接按本地语义跳到 /docs?path= */
  basePath?: string
}>()

const router = useRouter()
const linkHint = ref('')

const html = computed(() => renderMarkdown(props.source))

function onClick(event: MouseEvent) {
  linkHint.value = ''
  const target = event.target
  if (!(target instanceof Element)) return
  const anchor = target.closest('a')
  if (!anchor || !(anchor instanceof HTMLAnchorElement)) return

  const href = anchor.getAttribute('href')
  if (!href) return

  // 无 basePath：保持默认浏览器行为（外链仍可用）
  if (!props.basePath) return

  const resolved = resolveDocLink(props.basePath, href)

  if (resolved.kind === 'external') {
    // 外链新标签，避免跳出 SPA 丢上下文
    event.preventDefault()
    window.open(resolved.href, '_blank', 'noopener,noreferrer')
    return
  }

  if (resolved.kind === 'hash') {
    // 页内锚点交给浏览器
    return
  }

  event.preventDefault()

  if (resolved.kind === 'doc') {
    void router.push({
      path: '/docs',
      query: { path: resolved.path },
      hash: resolved.hash || undefined,
    })
    return
  }

  linkHint.value = `无法在本站打开该链接（${resolved.reason}）：${resolved.raw}`
}
</script>

<template>
  <div>
    <!-- 内容经 renderMarkdown（marked + DOMPurify）消毒后再注入 -->
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div class="markdown-body" @click="onClick" v-html="html" />
    <p v-if="linkHint" class="link-hint" role="status">{{ linkHint }}</p>
  </div>
</template>

<style scoped>
.link-hint {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  color: crimson;
}
</style>
