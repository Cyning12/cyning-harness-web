# PROMPT · 30 执行 · A0 Inform bootstrap（web-obs-demo）

> **用法**：新窗口整段粘贴「复制区」。  
> **Open Folder**：`/Users/cyning/Desktop/Projects/cyning-harness-web`（必须 = 仓根）  
> **分支**：`task/web-obs-demo-inform-bootstrap`  
> **禁止**：Vue/Vite/Express 脚手架；直推 `main`；改 `cyning-harness` 产品源码

---

## 复制区（整段粘贴）

`````text
你是 30 执行 Agent（cyning-harness-web · Phase A0 · Inform bootstrap）。

【Open Folder / cwd】
/Users/cyning/Desktop/Projects/cyning-harness-web
（ls 应见 README.md · docs/spec/ · docs/tasks/active/）

【主 task】
docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md
task_slug: web-obs-demo-inform-bootstrap
git_branch: task/web-obs-demo-inform-bootstrap

【开帽 · 缺一 STOP】
1. 先落盘本帽 invoke：docs/harness/invokes/by-task/web-obs-demo-inform-bootstrap/invoke_YYYYMMDD_30_web-obs-demo-inform-bootstrap.md（元数据表 + 本 Prompt 快照）
2. 扫闸：HG-TASK-DRAFT、HG-AUDIT-R1 须为 approved；若 pending → 拒开工只报 gate_id
3. 本 task 闸表**无** HG-GRAPH-MODULES 行（产品硬闸：pending 会拒 30）；你在 01_struct 人签表留 pending，由 00 合入后代签
4. 跑：npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md
   （本棒不加 --graph）
5. 未过 verify → STOP；过了再改文件

【必读】
1. 本 task 全文（范围/非范围/验收/failure_paths）
2. docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md §0.1 C · 附录 A（A0）
3. 工作区 docs/harness/guides/GUIDANCE_harness_process_observability_shell_boundary_v1_zh.md §2
4. 模板参考（只读）：cyning-harness/harness/templates/ONTOLOGY_consumer_slice_v1.md · cyning-harness/graph/templates/01_struct.md

【交付（仅 Inform 文档）】
1. docs/_tech_graph/01_struct.md — 真实一级模块表（删示例行），建议含：
   web_ui（src/**）· obs_api（薄服务端/middleware）· harness_docs（docs/tasks · docs/harness）· evidence（docs/evidence）
   表内人签记录可留 HG-GRAPH-MODULES pending（由 00 合入后代签）
2. docs/_tech_graph/00_main.md — 本仓主路径：Agent 落盘 → Web 只读投影（/ · /obs · /docs）
3. 建议：docs/_tech_graph/99_mermaid_protocol.md（可简短 POINTER）
4. docs/meta/ONTOLOGY_web_obs_demo_v1.md — 术语≥3 · 类/关系≥3 · 边界含「Web 不写闸 / 落盘真值 vs 飞行中」
5. README.md 增 POINTER 指向上述 Inform 路径（勿大改产品叙事）
6. 回填 task「实现备忘」与「### 自检结论（执行者）」

【Git / PR】
- 从 main 拉分支 task/web-obs-demo-inform-bootstrap（若 00 未建）
- 提交仅本棒路径；message 建议：docs(a0): inform bootstrap graph + ontology
- 开 PR → 等 checks（若无 Actions 则注明）→ 由 00 squash merge（你可创建 PR，勿直推 main）
- 合并后勿自签 HG-GRAPH-MODULES

【明确不做】
- package.json / Vite / Vue / Express / middleware 实现
- harness init 工程改动
- 改 cyning-harness 产品仓
- --allow-invoke-gap 等豁免
- Phase A scaffold 或更后 Phase

【终报 ≤15 行】
- 新建/改动文件列表
- 模块表 module_id 列表
- PR URL（若已开）
- verify 结论
- 阻塞项（无则写无）
`````
