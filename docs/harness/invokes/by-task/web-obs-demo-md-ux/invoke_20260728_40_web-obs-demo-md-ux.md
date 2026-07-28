# Harness invoke snapshot · 40 自检 / 关账预备 · web-obs-demo-md-ux

| 字段 | 值 |
|------|-----|
| hat_id | 40 |
| template | （00 派发正文 · 本文件快照） |
| task_paths | docs/tasks/active/task_web_obs_demo_md_ux_v1.md |
| related_review_or_none | docs/harness/reviews/task_web_obs_demo_md_ux_CLOSE_20260728.md |
| git_branch | task/web-obs-demo-md-ux-close |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 40 自检 / 关账预备 Agent（00 派发 · md-ux） |

## 闸扫（自检时）

| human_gate_id | status | 结论 |
|---------------|--------|------|
| HG-TASK-DRAFT | approved | 过程闸已过 |
| HG-AUDIT-R1 | approved | 过程闸已过 |
| HG-GRAPH-MODULES | approved | 沿用 · graph_delta=none |

## 快照正文

`````text
你是 40 自检 / 关账预备（cyning-harness-web · md-ux）。00 派发。

【cwd】/Users/cyning/Desktop/Projects/cyning-harness-web

【前提】
- PR #19 已 squash 入 main：https://github.com/Cyning12/cyning-harness-web/pull/19
- task：docs/tasks/active/task_web_obs_demo_md_ux_v1.md

【步骤】
1. git fetch && git checkout main && git pull
2. 建分支 task/web-obs-demo-md-ux-close
3. 落盘 invoke_YYYYMMDD_40_web-obs-demo-md-ux.md
4. 核对：MarkdownView、/docs 渲染、首页样例、白话文案、消毒测；勾选验收；自检；经验≥3；不填 KPI
5. 可选 CLOSE 摘要；CHECK_00 #19 合入行一并纳入
6. commit + push + gh pr create；禁止 merge / task close / 直推 main

【回报】PR URL · 40 pass/fail · 阻塞
`````

## 40 自检结果（摘要）

| 项 | 结果 |
|----|------|
| MarkdownView 组件 | pass · `src/components/MarkdownView.vue` + `src/lib/renderMarkdown.ts`（marked + DOMPurify） |
| `/docs` 排版渲染 | pass · `DocsView` 默认 `MarkdownView`；可选「查看源码」pre |
| 首页样例 | pass · `HomeView` 拉 `docs/tasks/samples/showcase_getting_started.md` · 失败可读 |
| 白话文案 | pass · 顶栏/页脚/首页/文档导语白话；`/obs` 标签「示例数据」「显式写盘」 |
| 消毒单测 | pass · `tests/renderMarkdown.test.ts`（h1 + script/onerror 剥离） |
| PR #19 squash · quality 绿 | pass · MERGED → main · `efc4880` |
| invoke 10+30+40 | pass · 本文件补齐 40 |
| CHECK_00 PR#19 合入行 | pass · 纳入本 close PR |
| `pnpm lint/test/build` | pass · 0 / 20 tests / build ok |
| harness verify（落盘 40 后） | pass · 预期无 invoke hats gap |
| **结论** | **pass** · 可关账预备；待 00 KPI + harness task close |
