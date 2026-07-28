# Harness invoke snapshot · 30 执行 · Phase C chain-dogfood

| 字段 | 值 |
|------|-----|
| hat_id | 30 |
| template | PROMPT_30_web_obs_demo_chain_dogfood.md |
| task_paths | docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md |
| related_review_or_none | docs/harness/reviews/task_web_obs_demo_chain_dogfood_audit_R1_20260728.md |
| git_branch | task/web-obs-demo-chain-dogfood |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 30 执行 Agent（00 派发 · Phase C chain-dogfood） |

## 闸扫（开工前 · GATE_VERIFY）

| human_gate_id | status（task 表真值） | 结论 |
|---------------|----------------------|------|
| HG-TASK-DRAFT | approved | 可开工 |
| HG-AUDIT-R1 | approved | 可开工 |
| HG-GRAPH-MODULES | approved | 可开工（沿用 A0 · Q8） |

正式 verify：`npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md` → **PASS**（`graph_delta=none` · 未加 `--graph`）。

## 快照正文

`````text
你是 30（cyning-harness-web · Phase C · chain-dogfood）。00 派发。

【cwd】/Users/cyning/Desktop/Projects/cyning-harness-web
【task】docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md
【branch】task/web-obs-demo-chain-dogfood

【开帽】
1. 落盘 invoke_YYYYMMDD_30_web-obs-demo-chain-dogfood.md
2. 闸三行 approved
3. npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md
   （task 标 graph_delta=none；若你只写 evidence 可不加 --graph）
4. 未过 STOP

【主交付】
- docs/evidence/chain_dogfood_20260728.md：含可复现命令、闸前后 status/verify 摘录（脱敏）、/obs 对照说明、产品缺陷 issue 草稿或「无阻塞缺陷」结论
- 微改仅限 evidence（或 README 一行 POINTER）；禁止大改 Vue/API
- 可选：落盘极简 40 不在本棒（00 另派）；本棒只要 30 invoke + evidence + PR

【Git】从 main 拉分支 → commit → push → gh pr create；禁止 merge

【不做】改 cyning-harness 产品仓、默认 ingest、Phase D/E/F、直推 main

【回报】PR URL · evidence 路径 · verify · 阻塞
`````
