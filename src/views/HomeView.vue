<template>
  <section class="panel">
    <h1>过程可观测 Demo</h1>
    <p class="lede">
      本仓把 Agent 落盘的 Harness 工件（task / invoke / review）做成
      <strong>只读投影</strong>。页内展示不等于签收真值，也不可代签
      <code>HG-*</code>。
    </p>

    <p class="readonly-banner">只读投影 · 非签收真值</p>

    <h2>启动</h2>
    <ol>
      <li><code>pnpm install</code></li>
      <li><code>pnpm dev</code> → 打开本页、`/obs`、`/docs`</li>
      <li>合并前：<code>pnpm lint</code> → <code>pnpm test</code> → <code>pnpm build</code></li>
    </ol>

    <h2>Phase B 边界</h2>
    <ul>
      <li>
        <code>/obs</code> 默认 live：服务端
        <code>npx @cyning/harness@2.17.0 status|timeline --json</code>（无
        <code>--ingest</code>）；可切 stub
      </li>
      <li>在 <code>/obs</code> 选择 task 后点「重新加载」刷新投影</li>
      <li><code>/docs</code> 仅扫读 <code>docs/tasks/**</code></li>
      <li>薄 API 仅 Node 侧（Vite middleware）；无写闸端点；禁止浏览器 npx</li>
    </ul>
  </section>
</template>
