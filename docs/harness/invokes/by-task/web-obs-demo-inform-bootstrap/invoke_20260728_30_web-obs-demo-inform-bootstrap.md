# Harness invoke snapshot · 30 执行 · A0 Inform bootstrap

| 字段 | 值 |
|------|-----|
| hat_id | 30 |
| template | PROMPT_30_web_obs_demo_inform_bootstrap.md |
| task_paths | docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md |
| related_review_or_none | docs/harness/reviews/task_web_obs_demo_inform_bootstrap_audit_R1_20260728.md |
| git_branch | task/web-obs-demo-inform-bootstrap |
| worktree_root | cyning-harness-web（仓根） |
| created_utc_or_local | 2026-07-28 CST |
| actor | 30 执行 Agent（Task 派发 · Phase A0 Inform） |

## 闸扫（开工前）

| human_gate_id | status | 结论 |
|---------------|--------|------|
| HG-TASK-DRAFT | approved | 可开工 |
| HG-AUDIT-R1 | approved | 可开工 |
| HG-GRAPH-MODULES | （不在本 task 闸表） | 产出写于 `01_struct` 人签表 · 留 pending · 00 合入后代签 |

## 快照正文

`````text
你是 30 执行 Agent（cyning-harness-web · Phase A0 · Inform bootstrap）。由 00 统筹窗口经 Task 派发；完成后向父 Agent 回报。

【Open Folder / cwd · 强制】
/Users/cyning/Desktop/Projects/cyning-harness-web
（独立 git 仓根；禁止改父仓 Projects、禁止改 cyning-harness 产品源码）

【主 task】
docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md
task_slug: web-obs-demo-inform-bootstrap
git_branch: task/web-obs-demo-inform-bootstrap

【开帽 · 缺一 STOP】
1. 先落盘本帽 invoke：docs/harness/invokes/by-task/web-obs-demo-inform-bootstrap/invoke_YYYYMMDD_30_web-obs-demo-inform-bootstrap.md（元数据表 + Prompt 快照；可参考同目录 PROMPT_30_web_obs_demo_inform_bootstrap.md）
2. 扫闸：HG-TASK-DRAFT、HG-AUDIT-R1 须为 approved；若 pending → 拒开工只报 gate_id
3. 本 task 闸表无 HG-GRAPH-MODULES 行；你在 01_struct 人签表留 pending，由 00 合入后代签
4. 跑：npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md（不加 --graph）
5. 未过 verify → STOP；过了再改文件

【必读】
1. 本 task 全文（范围/非范围/验收/failure_paths）
2. docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md §0.1 C · 附录 A（A0）
3. 若可读：工作区 GUIDANCE_harness_process_observability_shell_boundary_v1_zh.md §2
4. 模板参考（只读）：ONTOLOGY_consumer_slice_v1.md · graph/templates/01_struct.md

【交付（仅 Inform 文档 · 禁止 Vue/Vite/Express）】
1. docs/_tech_graph/01_struct.md — 真实一级模块表（删示例行），建议含：
   web_ui（src/**）· obs_api（薄服务端/middleware）· harness_docs（docs/tasks · docs/harness）· evidence（docs/evidence）
   表内人签 HG-GRAPH-MODULES 留 pending
2. docs/_tech_graph/00_main.md — 本仓主路径：Agent 落盘 → Web 只读投影（/ · /obs · /docs）
3. 建议：docs/_tech_graph/99_mermaid_protocol.md
4. docs/meta/ONTOLOGY_web_obs_demo_v1.md — 术语≥3 · 类/关系≥3 · 边界含「Web 不写闸 / 落盘真值 vs 飞行中」
5. README.md 增 POINTER 指向 Inform 路径（仓内已有 AUTH/终验 POINTER 则保留）
6. 回填 task「实现备忘」与「### 自检结论（执行者）」

【Git / PR · 强制】
- 从 main 拉分支 task/web-obs-demo-inform-bootstrap（若不存在）
- 将本棒交付 + 已有编排工件一并提交
- commit message 建议：docs(a0): inform bootstrap graph + ontology
- 开 PR 到 main（gh pr create）；勿直推 main；勿 squash merge（00 负责 merge）

【明确不做】
- package.json / Vite / Vue / Express / middleware
- harness init 工程改动
- 改 cyning-harness 产品仓
- --allow-invoke-gap
- 自签 HG-GRAPH-MODULES=approved
- Phase A scaffold
`````
