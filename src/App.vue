<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="shell">
    <header class="top">
      <div class="brand">
        <strong>cyning-harness-web</strong>
        <span class="badge">只读投影 · 非签收真值</span>
      </div>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/obs">过程投影</RouterLink>
        <RouterLink to="/docs">文档</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer class="foot">
      <p>Web 不写闸 · 禁止浏览器 npx · 落盘真值在 docs/**</p>
    </footer>
  </div>
</template>
