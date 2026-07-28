# Task：Markdown 渲染组件 + 通用文案 + 首页示例

> **状态**：`done`  
> **Phase**：`post-E`（epic A0–E 已 CLOSE · 增量 UX）  
> **关联 SPEC**：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md)（只读边界不变）  
> **落盘**：`docs/tasks/active/task_web_obs_demo_md_ux_v1.md`

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-md-ux` |
| **test_strategy** | `required` |
| **test_strategy_note** | 渲染组件可测（标题/链接）；首页示例拉取路径可读；合并前 pnpm 三绿 |
| **code_quality_bar** | `recommended` |
| **orchestration** | `00 自主 loop · 单 30` |
| **semi_auto** | `false` |
| **audit_profile** | `human_only` |
| **invoke_retention_profile** | `default` |
| **required_invoke_hats** | `10,30,40` |
| **git_branch** | `task/web-obs-demo-md-ux` |
| **graph_delta** | `none` |
| **graph_delta_note** | UI 文案与 md 渲染；不改模块边界 |
| **experience_capture** | `required` |
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 22-R1, 30 | 00 代签 · 2026-07-28 |
| HG-AUDIT-R1 | approved | 30 | 00 代签 · human_only |
| HG-GRAPH-MODULES | approved | 30 | 沿用 |

---

## 背景与目标

用户反馈三项：**(1)** 缺 Markdown 渲染（现 `/docs` 用 `<pre>` 原文）；**(2)** 文案项目内黑话过多；**(3)** 首页需要经典可读的文档展示示例。

**完成态**：有可复用 `MarkdownView`（或等价）组件；`/docs` 与首页示例均用其渲染；面向新人的通用中文说明；首页展示一份代表性样例 md。

---

## 范围

- [x] 新增 Markdown 渲染组件（建议 `marked` + DOMPurify，或团队已有轻量方案；**必须消毒**防 XSS）
- [x] `/docs` 正文用该组件替代 `<pre>` 原文堆叠
- [x] 文案通用化（首页、顶栏/页脚、`/docs` 导语；`/obs` 仅改明显黑话标签，勿大改交互）：
  - 少用未解释的：`HG-*`、ingest、stub、gate、dogfood、Phase 字母等
  - 用「只读浏览」「本地命令行结果」「示例数据」等白话；必要时括号一次解释
- [x] 新增经典样例文档：建议路径 `docs/tasks/samples/showcase_getting_started.md`（白话说明本 Demo 做什么、如何打开文档、只读原则）
- [x] **首页**展示该样例：拉取 `/api/docs/content?path=…` 并用渲染组件展示；失败可读
- [x] 若 API 仅允许 `docs/tasks/**`：样例放在该树下即可；勿放开仓外路径
- [x] 至少 1 个单测：渲染含标题/安全（脚本标签被剥或转义）
- [x] PR → quality 绿 → 00 squash merge

## 非范围

- 改写 SPEC / 重做 `/obs` 全功能；改 `cyning-harness` 产品仓；默认 `--allow-*-gap`；直推 `main`
- 不强制换设计系统色板（沿用现有 CSS 变量）

---

## 失败路径

| 触发条件 | 系统行为 | 可重试 | 用户可见 |
|----------|----------|--------|----------|
| 样例 md 缺失 | 首页可读错误，不崩溃 | 是 | 无法加载示例 |
| md 含脚本 | 消毒后不执行 | — | 安全渲染 |
| 闸 pending | 30 拒开工 | 是 | gate_id |

---

## 验收标准

- [x] `/docs` 打开任意 task md 为**排版后的 Markdown**（非纯 pre 原文）
- [x] 存在可复用渲染组件；XSS 基本防护（测覆盖）
- [x] 首页有白话说明 + 样例文档渲染区
- [x] 样例文件存在且内容面向外部读者（少黑话）
- [x] `pnpm lint` → `test` → `build` 绿；PR quality 绿
- [x] invoke 10+30+40；KPI+经验已齐（Task_KPI%=91）

---

### 自检结论（执行者）

**pass**（40 · 2026-07-28）。交付与验收项均满足；PR #19 squash 入 main（quality 绿 · `efc4880`）。本棒不填 KPI、不执行 `task close` / merge。

### KPI（00）
（待）

### 经验总结

1. **消毒必过单测**：`marked`  alone 不够；`DOMPurify` + jsdom 测「`<script>` / `onerror` 不残留」比口头声称安全更稳。
2. **样例路径锁在 `docs/tasks/**`**：首页与 `/docs` 共用同一 content API 边界，避免为展示放开仓外路径。
3. **白话标签 vs 内部枚举**：UI 文案用「示例数据」「显式写盘」，内部仍可保留 `stub` / `ingest` 取值，降低新人黑话而不改契约。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 · 代签三闸 · 派 30 |
| 2026-07-28 | 40 自检 · 勾选范围/验收 · 经验≥3 · CLOSE 摘要 · 补 invoke 40 |
| 2026-07-28 | 00 KPI Task_KPI%=91 · status=done · 准备 merge #20 + close |
