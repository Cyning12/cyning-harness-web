# Harness invoke snapshot · 30 执行 · Phase D hgm-consumer

| 字段 | 值 |
|------|-----|
| hat_id | 30 |
| template | PROMPT_30_web_obs_demo_hgm_consumer.md |
| task_paths | docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md |
| related_review_or_none | docs/harness/reviews/task_web_obs_demo_hgm_consumer_audit_R1_20260728.md |
| git_branch | task/web-obs-demo-hgm-consumer |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 30 执行 Agent（00 派发 · Phase D hgm-consumer） |

## 人工闸扫描（GATE_VERIFY · 首输出）

| human_gate_id | task表status | 用户/invoke声称 | 一致？ | blocks_30 | 30可开工？ |
|---------------|--------------|-----------------|--------|-----------|------------|
| HG-TASK-DRAFT | approved | approved（00 派发） | Y | Y | Y |
| HG-AUDIT-R1 | approved | approved（00 派发） | Y | Y | Y |
| HG-GRAPH-MODULES | approved | approved（沿用） | Y | Y | Y |

reviews：`task_web_obs_demo_hgm_consumer_audit_R1_20260728.md` 存在且 R1 pass？ **是**

pre-30 invoke：`required ∩ {10,20,00}` → 已有 `00`、`10`？ **是**

结论：**可进入读码/改码**（机械 verify 见下；未过则 STOP）

正式 verify：`npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md --graph` → **PASS**（缺 40 不挡 30）。

## 快照正文

`````text
你是 30（cyning-harness-web · Phase D · hgm-consumer）。00 派发。

【cwd】/Users/cyning/Desktop/Projects/cyning-harness-web
【task】docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md
【branch】task/web-obs-demo-hgm-consumer

【开帽】
1. 落盘 invoke_YYYYMMDD_30_web-obs-demo-hgm-consumer.md
2. 闸三行 approved
3. npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md --graph
4. 未过 STOP

【交付】
- docs/evidence/hgm_consumer_*.md：ingest 策略（默认 off；显式 on 的条件/风险）
- /obs：timeline 与 status 对照；空事件/WARN 可读
- 默认 CLI argv 不含 --ingest（测断言）；可选显式 ingest 开关且页内警告「会写 events」
- README POINTER；pnpm lint/test/build 绿
- 将 00 已落盘的 D task/invoke/review 与相关 docs 一并 PR

【Git】从 main 拉分支 → push → gh pr create；禁止 merge；禁止改 cyning-harness 产品仓；禁止默认静默 ingest

【回报】PR URL · verify · 三绿 · 阻塞
`````
