# Harness invoke snapshot · 10 需求细化 · A0 Inform bootstrap

| 字段 | 值 |
|------|-----|
| hat_id | 10 |
| template | TEMPLATE-requirements-invoke.md §3（本仓缩写 · epic skip_10_spec） |
| task_paths | docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md |
| related_review_or_none | 无 |
| git_branch | task/web-obs-demo-inform-bootstrap |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 00 代行 10 定稿（skip 完整 10-spec · epic 已签） |

## 快照正文

`````text
你正在扮演 Harness「需求与任务分析帽」（10 · 轻量定稿）。

【目标与上下文】
Phase A0 Inform bootstrap：绿野仓在 Vue 脚手架前建立一级模块表 + 消费者本体切片，使后续改码可答 graph_delta 并具备 HG-GRAPH-MODULES。

【已有材料】
- docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md（approved · skip_10_spec）
- docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md（00 已起草）

【审查驱动】无
【SDD】不涉及新 SPEC（§3 省略）
【新建重大 SPEC】否

【本帽结论 · 已写入 task】
- 范围：_tech_graph S0 + ONTOLOGY_web_obs_demo_v1 + README POINTER；经 PR squash
- 非范围：Vue/Vite/Express、harness init 工程改、产品仓改码、Phase F
- test_strategy：recommended（文件存在性）
- invoke_retention_profile：default · required_invoke_hats：10,30,40
- 闸：HG-TASK-DRAFT/HG-AUDIT-R1 由 00 代签 approved；HG-GRAPH-MODULES 本棒产出后签
- 失败路径：越 Phase / 空模块表 / 聊天代闸 → 拒或打回

【下一棒】30 执行 Inform 落盘（见 PROMPT_30_web_obs_demo_inform_bootstrap.md）
`````
