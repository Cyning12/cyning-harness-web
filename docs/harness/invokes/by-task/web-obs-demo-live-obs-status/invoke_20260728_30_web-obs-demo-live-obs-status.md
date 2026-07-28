# Harness invoke snapshot · 30 执行 · Phase B live-obs-status

| 字段 | 值 |
|------|-----|
| hat_id | 30 |
| template | PROMPT_30_web_obs_demo_live_obs_status.md |
| task_paths | docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md |
| related_review_or_none | docs/harness/reviews/task_web_obs_demo_live_obs_status_audit_R1_20260728.md |
| git_branch | task/web-obs-demo-live-obs-status |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 30 执行 Agent（00 派发 · Phase B live-obs-status） |

## 闸扫（开工前）

| human_gate_id | status | 结论 |
|---------------|--------|------|
| HG-TASK-DRAFT | approved | 可开工 |
| HG-AUDIT-R1 | approved | 可开工 |
| HG-GRAPH-MODULES | approved | 可开工（沿用 A0 · Q8） |

## 快照正文

`````text
你是 30（cyning-harness-web · Phase B · live-obs-status）。00 派发。

【cwd】/Users/cyning/Desktop/Projects/cyning-harness-web
【task】docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md
【slug】web-obs-demo-live-obs-status
【branch】task/web-obs-demo-live-obs-status

【开帽】
1. 落盘 invoke_YYYYMMDD_30_web-obs-demo-live-obs-status.md
2. 闸：HG-TASK-DRAFT / HG-AUDIT-R1 / HG-GRAPH-MODULES = approved
3. npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md --graph
4. 未过 STOP

【交付】
- npx @cyning/harness@2.17.0 init 或 upgrade（preset harness-only）；提交必要产物（无密钥）
- 服务端 live：status / timeline --json（仅 Node；默认不 --ingest）；可保留 stub 切换
- /obs：task 选择或默认样例 + 重载；只读声明；CLI 失败可读
- 自动化测（mock spawn 失败/成功均可）；README；pnpm lint/test/build 绿
- 将 00 已落盘的 Phase B task/invoke/review/CHECK/README 更新一并纳入 PR

【Git】从 main 拉分支 → commit → push → gh pr create；禁止 merge / 直推 main

【不做】浏览器 npx、写闸、默认 ingest、Phase C dogfood、改 cyning-harness 产品仓

【回报】PR URL · verify · 三绿 · 阻塞
`````
