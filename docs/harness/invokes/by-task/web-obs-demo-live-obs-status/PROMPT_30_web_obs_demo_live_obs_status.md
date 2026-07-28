# PROMPT · 30 · Phase B live obs

## 复制区

`````text
你是 30（cyning-harness-web · Phase B · live-obs-status）。

【cwd】/Users/cyning/Desktop/Projects/cyning-harness-web
【task】docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md
【branch】task/web-obs-demo-live-obs-status

1. 落盘 invoke_30；闸三行 approved
2. npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md --graph
3. harness init 或 upgrade @2.17.0（harness-only）；live status/timeline --json 仅服务端；默认不 --ingest
4. /obs 接 live（可保留 stub 切换）；失败可读；测；README；00 已落盘的 task/invoke/review 一并 PR
5. push + gh pr create；勿 merge；勿浏览器 npx；勿写闸；勿改产品仓

【终报】PR URL · verify · pnpm 三绿 · 阻塞
`````
