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

    <h2>Phase A 边界</h2>
    <ul>
      <li><code>/obs</code> 当前为 stub <code>obs_status.v1</code> / <code>obs_timeline.v1</code>（非 live CLI）</li>
      <li><code>/docs</code> 仅扫读 <code>docs/tasks/**</code></li>
      <li>薄 API 仅 Node 侧（Vite middleware）；无写闸端点</li>
    </ul>
  </section>
</template>
