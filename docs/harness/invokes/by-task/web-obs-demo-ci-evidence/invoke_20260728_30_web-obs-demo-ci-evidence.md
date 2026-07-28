# Harness invoke snapshot · 30 执行 · Phase E ci-evidence

| 字段 | 值 |
|------|-----|
| hat_id | 30 |
| template | PROMPT_30_web_obs_demo_ci_evidence.md |
| task_paths | docs/tasks/active/task_web_obs_demo_ci_evidence_v1.md |
| related_review_or_none | docs/harness/reviews/task_web_obs_demo_ci_evidence_audit_R1_20260728.md |
| git_branch | task/web-obs-demo-ci-evidence |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 30 执行 Agent（00 派发 · Phase E ci-evidence） |

## 人工闸扫描（GATE_VERIFY · 首输出）

| human_gate_id | task表status | 用户/invoke声称 | 一致？ | blocks_30 | 30可开工？ |
|---------------|--------------|-----------------|--------|-----------|------------|
| HG-TASK-DRAFT | approved | approved（00 派发） | Y | Y | Y |
| HG-AUDIT-R1 | approved | approved（00 派发） | Y | Y | Y |
| HG-GRAPH-MODULES | approved | approved（沿用） | Y | Y | Y |

reviews：`task_web_obs_demo_ci_evidence_audit_R1_20260728.md` 存在且 R1 pass？ **是**

pre-30 invoke：`required ∩ {10,20,00}` → 已有 `00`、`10`？ **是**

结论：**可进入读码/改码**（机械 verify 见下；未过则 STOP）

正式 verify：`npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_ci_evidence_v1.md` → **PASS**（`graph_delta=none` · 不加 `--graph`；缺 40 不挡 30）。

## 快照正文

`````text
你是 30（cyning-harness-web · Phase E · ci-evidence）。00 派发。

【cwd】/Users/cyning/Desktop/Projects/cyning-harness-web
【task】docs/tasks/active/task_web_obs_demo_ci_evidence_v1.md
【branch】task/web-obs-demo-ci-evidence

【开帽】
1. 落盘 invoke_YYYYMMDD_30_web-obs-demo-ci-evidence.md
2. 闸三行 approved
3. npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_ci_evidence_v1.md
4. 未过 STOP

【交付】
- 扩展 `.github/workflows/`：跑 `npx @cyning/harness@2.17.0 verify`（task 可用 `docs/tasks/done/` 下已 CLOSE 样例；策略写进 workflow 注释与 README）
- ≥2 负向自动化（Vitest 等）：无 task / CLI 失败 / 禁写闸（可扩现有测）
- `docs/evidence/SUMMARY_obs_demo_20260728.md`：可复现命令 + 可公开计数/耗时（脱敏）
- 产品反馈：issue 草稿或无阻塞总表（可链 C/D evidence）
- 将 00 落盘的 E 编排件与 D 归档一并 PR；pnpm 三绿 + Actions 绿

【Git】从 main 拉分支 → push → gh pr create；禁止 merge；禁止改 cyning-harness 产品仓源码

【回报】PR URL · verify · CI · 阻塞
`````
