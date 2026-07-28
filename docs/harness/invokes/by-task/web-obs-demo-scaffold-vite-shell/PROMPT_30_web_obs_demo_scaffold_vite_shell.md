# PROMPT · 30 · Phase A scaffold vite shell

> Open Folder = `/Users/cyning/Desktop/Projects/cyning-harness-web`

## 复制区

`````text
你是 30 执行 Agent（cyning-harness-web · Phase A · scaffold vite shell）。

【cwd】/Users/cyning/Desktop/Projects/cyning-harness-web

【task】docs/tasks/active/task_web_obs_demo_scaffold_vite_shell_v1.md
slug: web-obs-demo-scaffold-vite-shell
branch: task/web-obs-demo-scaffold-vite-shell

【开帽】
1. 落盘 invoke_YYYYMMDD_30_web-obs-demo-scaffold-vite-shell.md
2. 闸须 approved：HG-TASK-DRAFT / HG-AUDIT-R1 / HG-GRAPH-MODULES
3. npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_scaffold_vite_shell_v1.md --graph
4. 未过 STOP

【交付】
- pnpm + Vite + Vue3 + TS；路由 / · /obs · /docs；页内「只读投影 · 非签收真值」
- 薄 middleware 或 Express：读 docs/tasks/** md；stub obs_status.v1 / obs_timeline.v1（禁止浏览器 npx；禁止写闸 API）
- ≥1 自动化测试；.github/workflows/quality.yml（lint→test→build）
- README 启动说明；回填 task 实现备忘/自检
- 可把 docs/tasks/active/.gitkeep 一并提交（若存在）

【Git】从 main 拉分支 → commit → gh pr create → 勿 merge（00 做）→ 勿直推 main

【不做】live harness CLI、harness init、改 cyning-harness 产品仓、Phase B+

【终报】文件列表 · PR URL · verify · pnpm 三绿 · 阻塞
`````
