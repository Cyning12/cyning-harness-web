<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="shell">
    <header class="top">
      <div class="brand">
        <strong>cyning-harness-web</strong>
        <span class="badge">只读浏览 · 不能改写审批</span>
      </div>
      <nav>
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/obs">运行状态</RouterLink>
        <RouterLink to="/docs">文档</RouterLink>
        <RouterLink to="/wiki-graph">Wiki 图</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
    <footer class="foot">
      <p>
        本站只读浏览说明文档与本地工具状态 · 页面不能改写审批结果 ·
        真值文件在仓库 <code>docs/</code>
      </p>
    </footer>
  </div>
</template>
