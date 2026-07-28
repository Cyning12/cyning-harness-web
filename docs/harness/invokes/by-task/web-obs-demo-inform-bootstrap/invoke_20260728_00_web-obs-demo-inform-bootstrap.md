# Harness invoke snapshot · 00 统筹 · A0 Inform bootstrap

| 字段 | 值 |
|------|-----|
| hat_id | 00 |
| template | PROMPT_00_cyning_harness_web_autonomous_loop_v1_zh（本仓 epic 自主 loop） |
| task_paths | docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md |
| related_review_or_none | 无 |
| git_branch | task/web-obs-demo-inform-bootstrap |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 00 统筹 |

## 快照正文

`````text
你是 00 统筹 Agent（cyning-harness-web · epic 已签收 · Phase A0）。

【本轮已完成 / 动作】
1. 读 SPEC approved + PLAN + GUIDANCE + VERIFY 2.17.0 + KPI_RUBRIC_v1_3
2. 盘点：main 干净；无 active task → 拆 A0
3. 落盘 task：docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md
4. 落盘 invoke：by-task/web-obs-demo-inform-bootstrap/（00 + 10）
5. 代签：HG-TASK-DRAFT=approved · HG-AUDIT-R1=approved
6. HG-GRAPH-MODULES 不写入本 task 闸表（pending 会硬拒 30）；合入后签 01_struct 人签
7. verify（无 --graph）→ 派 30 → STOP（00 不编码）

【Q 默认】
A0 独立；改码才 verify --graph；永不 allow-*-gap；PR squash；00 可代签 HG-GRAPH-MODULES
`````

## verify（本轮）

`npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md` → **PASS**（WARN：缺 30/40 invoke · graph_delta 路径待 30 产出 · 工作区未 clean · 均不挡 may_start_30）

## 下一棒

- 角色：30
- Prompt：同目录 `PROMPT_30_web_obs_demo_inform_bootstrap.md`
- 等待：人/新窗口执行 30 · PR squash · 00 不编码
