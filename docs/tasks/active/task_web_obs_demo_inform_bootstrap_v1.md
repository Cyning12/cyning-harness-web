# Task：Inform bootstrap · 模块表 + 消费者本体（A0）

> **状态**：`in_progress`  
> **Phase**：`A0`（先于脚手架改码）  
> **关联 SPEC**：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md)（`approved` · skip_10_spec）  
> **关联图谱**：本棒产出 `docs/_tech_graph/`（S0 骨架）  
> **落盘**：`docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md`；关账后 `git mv` → `docs/tasks/done/`

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-inform-bootstrap` |
| **test_strategy** | `recommended` |
| **test_strategy_note** | 纯 Inform：文件存在性 + 模块表非空 + 术语 ≥3；无 Vue/API 单测 |
| **code_quality_bar** | `not_applicable` |
| **freeze_id** | — |
| **orchestration** | `00 自主 loop · 单 30` |
| **semi_auto** | `false` |
| **audit_profile** | `human_only` |
| **invoke_retention_profile** | `default` |
| **required_invoke_hats** | `10,30,40` |
| **git_branch** | `task/web-obs-demo-inform-bootstrap` |
| **worktree_root** | （串行 · 仓根） |
| **graph_delta** | `docs/_tech_graph/01_struct.md` · `docs/_tech_graph/00_main.md` |
| **graph_delta_note** | A0 首建图谱骨架与一级模块表；非 `none` |
| **experience_capture** | `required` |
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 22-R1, 30 | 00 代签 · 2026-07-28 · epic 已签 · A0 独立 |
| HG-AUDIT-R1 | approved | 30 | 00 代签 · 2026-07-28 · audit_profile=human_only · skip 正式 22 |

> **`HG-GRAPH-MODULES`（产品硬闸）**：`evaluateMayStart30` 对表内 `HG-GRAPH-MODULES=pending` **一律拒 30**。本 A0 的 Inform 30 负责**写出** `01_struct`，故 **不把该闸写入上表**（否则无法开工）。合入后由 **00** 在 `01_struct` 人签表 + 本 task 验收勾选中记 `approved`，并在后续 **改码** task 闸表写入 `HG-GRAPH-MODULES=approved`（Q8）。  
> **00 代签授权**：[`docs/harness/auth/AUTH_00_human_gate_proxy_v1.md`](../../harness/auth/AUTH_00_human_gate_proxy_v1.md) · 检查台账 [`docs/evidence/CHECK_00_gate_proxy_basis_20260728.md`](../../evidence/CHECK_00_gate_proxy_basis_20260728.md)。过程闸 ≠ 人类终验（[`ACCEPTANCE_human_epic_checklist_v1.md`](../../harness/ACCEPTANCE_human_epic_checklist_v1.md)）。

---

## 背景与目标

Epic 已签收。绿野仓在脚手架（Phase A）改码前，先完成 **Inform bootstrap**：一级模块边界表 + 本仓消费者术语/轻量本体，使后续改码 task 可答 `graph_delta`，并满足 `HG-GRAPH-MODULES` 人签前置（Q6 / SPEC §0.1 C）。

**完成态**：`docs/_tech_graph/` S0 可读；`docs/meta/ONTOLOGY_web_obs_demo_v1.md` 可引用；`01_struct` 人签表 `HG-GRAPH-MODULES` → `approved`（00 在 PR 合入后代签）；经 PR squash 入 `main`。

---

## 范围

- [ ] 建立 `docs/_tech_graph/` S0 骨架（可自 `@cyning/harness` `graph/templates/` 复制后改写，勿整仓抄无关示例）
  - 至少：`01_struct.md`（真实一级模块表，**删除模板示例行**）
  - 至少：`00_main.md`（可手写简版 flowchart；可选 `.ai.md` / `.graph.yaml`）
  - 建议：`99_mermaid_protocol.md`（可 POINTER 产品模板要点）
  - 可选：`02_version.md` 一行时间线（A0 起步）
- [ ] `01_struct` 一级模块建议覆盖（可微调命名，须覆盖边界）：
  - `web_ui` — Vite/Vue 页面与路由（`src/**` 预期）
  - `obs_api` — 薄服务端/middleware（读盘 + spawn CLI）
  - `harness_docs` — `docs/tasks` · `docs/harness/**` · 落盘真值
  - `evidence` — `docs/evidence/**`（C–E 用）
- [ ] 落盘 `docs/meta/ONTOLOGY_web_obs_demo_v1.md`（自产品 `ONTOLOGY_consumer_slice_v1.md` 改写）：术语 3–12 条 + 核心类/关系 3–7 + 边界声明（落盘真值 vs 飞行中；Web 只读不写闸）
- [ ] README 增一小段 POINTER：Inform 真值路径（`_tech_graph` · ontology）
- [ ] 分支 `task/web-obs-demo-inform-bootstrap` → PR → CI（若尚无 Actions，本棒**不强制**加 workflow；本地文件存在性自检即可）→ **squash merge** → 删已合并分支
- [ ] 合入后回填 `### 自检结论`；00 在 `01_struct` 人签表代签 `HG-GRAPH-MODULES` + KPI/经验 → `task close`

## 非范围

- **禁止** Vue/Vite/Express 脚手架与业务实现（属 Phase A `scaffold_*`）
- **禁止** `harness init` 全量改工程配置（属 Phase B；本棒仅 Inform 文档）
- **禁止** 改 `cyning-harness` 产品源码；缺口只记 issue 草稿意向
- **禁止** Phase F / LLM 建 task
- **禁止** 直推 `main`；**禁止** `--allow-invoke-gap` / `--allow-*-gap` 默认豁免

---

## 失败路径

| 触发条件 | 系统行为 | 可重试 | 用户可见 |
|----------|----------|--------|----------|
| `HG-TASK-DRAFT` / `HG-AUDIT-R1` 仍 pending 即开 30 | 30 **拒开工** | 是 | 须 00 改闸表 |
| `01_struct` 仅模板示例行 / 空表 | 打回；不得代签图谱模块闸 | 是 | 一级模块未覆盖 |
| 本棒写入 Vue/Vite/package.json 脚手架 | 打回；拆出 Phase A task | 是 | 越 Phase |
| 用聊天「继续」代替闸 approved | 无效；须改 Markdown 闸表 | 否 | 闸真值在文件 |
| 父仓 / Ops Desk 误改 | 拒；仅本仓根 | 否 | Open Folder 纪律 |

---

## 验收标准

- [ ] `docs/_tech_graph/01_struct.md` 存在且 ≥3 行真实一级模块（非示例占位）
- [ ] `docs/_tech_graph/00_main.md` 存在且描述本仓 Demo 主路径（Agent 落盘 → Web 只读投影）
- [ ] `docs/meta/ONTOLOGY_web_obs_demo_v1.md` 术语 ≥3、类/关系 ≥3、边界声明含「Web 不写闸」
- [ ] `01_struct` 人签表 `HG-GRAPH-MODULES` → **approved**（00 代签，合入后）
- [ ] invoke：`docs/harness/invokes/by-task/web-obs-demo-inform-bootstrap/` 含 10（已有）+ 30 + 40
- [ ] PR squash 入 `main`；证据指针（PR URL）写入自检或 CLOSE
- [ ] `### KPI（00）` + `### 经验总结` 关账前填齐（`KPI_RUBRIC_v1_3`）

---

## 给执行帽的必读列表

1. `docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md` §0 / §0.1 / 附录 A–B（A0）
2. 工作区 `docs/harness/guides/PLAN_cyning_harness_web_obs_demo_v1_zh.md`（方案参考）
3. 工作区 `docs/harness/guides/GUIDANCE_harness_process_observability_shell_boundary_v1_zh.md` §2
4. 产品模板：`npx` 包内 / 本地 `cyning-harness/harness/templates/ONTOLOGY_consumer_slice_v1.md` · `graph/templates/01_struct.md`
5. 本 task 全文（范围 / 非范围 / failure_paths）

---

## 实现备忘（子 Agent 回填）

| 项 | 状态 | 备注 |
|----|------|------|
| `_tech_graph` 骨架 | ✅ | `01_struct` · `00_main` · `99_mermaid_protocol` |
| `01_struct` 模块表 | ✅ | `web_ui` · `obs_api` · `harness_docs` · `evidence`；无模板示例行 |
| ontology 切片 | ✅ | `docs/meta/ONTOLOGY_web_obs_demo_v1.md` |
| README POINTER | ✅ | 增「Inform 真值（A0）」表 |
| PR / merge | ⏳ | 30 开 PR；**squash merge 由 00** |
| 图谱模块人签（01_struct） | ⏳ | `HG-GRAPH-MODULES=pending`；合入后 00 代签 approved |

---

## 测试策略（Harness）

**test_strategy**: `recommended`

- 本地自检：`test -f docs/_tech_graph/01_struct.md` 等；通读模块表无示例行
- **本棒不加** `verify --graph`（`HG-GRAPH-MODULES` 为本棒产出；后续 **改码** task 一律 `verify --task … --graph`）
- 30 开干前：`npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md`

---

### 自检结论（执行者）

- **verify（开工前）**：`npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md` → **PASS**（闸 HG-TASK-DRAFT / HG-AUDIT-R1 approved；WARN：缺 40 invoke · graph_delta 路径当时未建 · 工作区未 clean — 均不挡 may_start_30）
- **文件存在性**：`01_struct` · `00_main` · `99_mermaid_protocol` · `ONTOLOGY_web_obs_demo_v1` · README Inform POINTER — 已落盘
- **模块表**：`web_ui` · `obs_api` · `harness_docs` · `evidence`（非示例行）
- **本体**：术语 ≥5 · 类/关系 ≥5 · 边界含「Web 不写闸」与「落盘真值 vs 飞行中」
- **人签**：`01_struct` 内 `HG-GRAPH-MODULES=pending`（30 **未**自签）
- **越界检查**：未改 `package.json` / Vue / Vite / Express；未改 `cyning-harness` 产品仓
- **PR URL**：（提交开 PR 后回填）
- **CI**：若仓库尚无 GitHub Actions → 注明「无 CI checks」

---

### KPI（00）

（`kpi_aggregator: CLOSE` · 关账回溯 · 至少 `Task_KPI%: N` 或 D1–D5 / 四维 1–5）

---

### 经验总结

（`experience_capture: required` · ≥3 条或 ≥80 字）

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 A0 · 代签 HG-TASK-DRAFT / HG-AUDIT-R1 |
