# Harness invoke snapshot · 30 执行 · Phase A scaffold vite shell

| 字段 | 值 |
|------|-----|
| hat_id | 30 |
| template | PROMPT_30_web_obs_demo_scaffold_vite_shell.md |
| task_paths | docs/tasks/active/task_web_obs_demo_scaffold_vite_shell_v1.md |
| related_review_or_none | docs/harness/reviews/task_web_obs_demo_scaffold_vite_shell_audit_R1_20260728.md |
| git_branch | task/web-obs-demo-scaffold-vite-shell |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 30 执行 Agent（00 派发 · Phase A scaffold） |

## 闸扫（开工前）

| human_gate_id | status | 结论 |
|---------------|--------|------|
| HG-TASK-DRAFT | approved | 可开工 |
| HG-AUDIT-R1 | approved | 可开工 |
| HG-GRAPH-MODULES | approved | 可开工（沿用 A0 · 01_struct） |

## 快照正文

`````text
你是 30 执行 Agent（cyning-harness-web · Phase A · scaffold vite shell）。由 00 派发。

【cwd · 强制】
/Users/cyning/Desktop/Projects/cyning-harness-web

【主 task】
docs/tasks/active/task_web_obs_demo_scaffold_vite_shell_v1.md
slug: web-obs-demo-scaffold-vite-shell
branch: task/web-obs-demo-scaffold-vite-shell

【开帽】
1. 落盘 docs/harness/invokes/by-task/web-obs-demo-scaffold-vite-shell/invoke_YYYYMMDD_30_web-obs-demo-scaffold-vite-shell.md
2. 确认闸 approved：HG-TASK-DRAFT / HG-AUDIT-R1 / HG-GRAPH-MODULES
3. 跑：npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_scaffold_vite_shell_v1.md --graph
4. 未过 → STOP

【交付】
- pnpm + Vite + Vue3 + TypeScript
- 路由 `/` · `/obs` · `/docs`；页内「只读投影 · 非签收真值」
- 薄服务：Vite middleware 或同仓 Express；读 `docs/tasks/**` md；stub `obs_status.v1` / `obs_timeline.v1`
- 禁止浏览器 npx；禁止任何写闸 API
- ≥1 自动化测试（Vitest 等）
- `.github/workflows/quality.yml`：pnpm lint → test → build
- README 启动说明；回填 task 实现备忘与自检
- 若 `docs/tasks/active/.gitkeep` 存在可一并提交；00 已落盘的 scaffold task/invoke/review/CHECK 更新也一并纳入本 PR

【Git】
- git fetch && git checkout main && git pull
- git checkout -b task/web-obs-demo-scaffold-vite-shell
- commit + push + gh pr create --base main
- 禁止 merge / 直推 main

【不做】
live harness CLI、harness init、改 cyning-harness 产品仓、Phase B+

【回报 ≤20 行】文件列表 · PR URL · verify · lint/test/build · 阻塞
`````
