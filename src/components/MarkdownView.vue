<script setup lang="ts">
import { computed } from 'vue'
import { renderMarkdown } from '@/lib/renderMarkdown'

const props = defineProps<{
  source: string
}>()

const html = computed(() => renderMarkdown(props.source))
</script>

<template>
  <!-- 内容经 renderMarkdown（marked + DOMPurify）消毒后再注入 -->
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="markdown-body" v-html="html" />
</template>
