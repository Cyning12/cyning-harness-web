# Harness invoke snapshot · 40 自检 / 关账预备 · Phase D hgm-consumer

| 字段 | 值 |
|------|-----|
| hat_id | 40 |
| template | （00 派发正文 · 本文件快照） |
| task_paths | docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md |
| related_review_or_none | docs/harness/reviews/task_web_obs_demo_hgm_consumer_CLOSE_20260728.md |
| git_branch | task/web-obs-demo-hgm-consumer-close |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 40 自检 / 关账预备 Agent（00 派发 · Phase D hgm-consumer） |

## 闸扫（自检时）

| human_gate_id | status | 结论 |
|---------------|--------|------|
| HG-TASK-DRAFT | approved | 过程闸已过 |
| HG-AUDIT-R1 | approved | 过程闸已过 |
| HG-GRAPH-MODULES | approved | 沿用 A0 · graph_delta 已标注显式 ingest |

## 快照正文

`````text
你是 40 自检 / 关账预备（cyning-harness-web · Phase D hgm-consumer）。00 派发。

【cwd】/Users/cyning/Desktop/Projects/cyning-harness-web

【前提】
- PR #13 已 squash 入 main：https://github.com/Cyning12/cyning-harness-web/pull/13
- task：docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md
- evidence：docs/evidence/hgm_consumer_20260728.md

【步骤】
1. git fetch && git checkout main && git pull
2. 建分支 task/web-obs-demo-hgm-consumer-close
3. 落盘 invoke_YYYYMMDD_40_web-obs-demo-hgm-consumer.md
4. 核对：策略文档、默认无 ingest 测、/obs timeline↔status、空态/WARN、显式 ingest 警告；勾选验收；自检；经验≥3；不填 KPI
5. 可选 CLOSE 摘要；CHECK_00 #13 合入行一并纳入
6. commit + push + gh pr create；禁止 merge / task close / 直推 main

【回报】PR URL · 40 pass/fail · 阻塞
`````

## 40 自检结果（摘要）

| 项 | 结果 |
|----|------|
| 策略文档 `hgm_consumer_20260728.md` | pass · §1 默认 off / 显式 on 条件·风险·入口 |
| 默认无 `--ingest` 测 | pass · `tests/obsHandlers.test.ts` 默认 argv / resolveIngestFlag / buildHarnessCliArgs |
| `/obs` timeline↔status | pass · ObsView 同页对照说明 + README / evidence §2 |
| 空事件 / WARN 可读 | pass · 空事件文案 + CLI WARN 区 + extractWarnLines 测 |
| 显式 ingest 页内警告 | pass · 勾选后「会写 events」`role=alert`；仅 timeline `?ingest=1` |
| PR #13 squash · quality 绿 | pass · MERGED → main · `b1fabba` |
| invoke 10+30+40 | pass · 本文件补齐 40 |
| CHECK_00 PR#13 合入行 | pass · 纳入本 close PR |
| `pnpm lint/test/build` | pass · 0 / 17 tests / build ok |
| `verify --graph`（落盘 40 后） | pass · 无 invoke hats gap（预期） |
| **结论** | **pass** · 可关账预备；待 00 KPI + harness task close |
