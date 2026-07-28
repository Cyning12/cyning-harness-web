<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="shell">
    <header class="top">
      <div class="brand">
        <p class="brand-name">cyning-harness-web</p>
        <p class="brand-tag">过程可观测 · 只读浏览，不能改写审批</p>
      </div>
      <nav aria-label="主导航">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/obs">运行状态</RouterLink>
        <RouterLink to="/docs">文档</RouterLink>
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
