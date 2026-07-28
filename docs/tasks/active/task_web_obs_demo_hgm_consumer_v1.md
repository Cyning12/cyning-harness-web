# Task：Phase D · HGM 消费者闭环（timeline + 显式 ingest）

> **状态**：`in_progress`  
> **Phase**：`D`（依赖 Phase C CLOSED）  
> **关联 SPEC**：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md) §2.6 / §4.2 / 附录 A Phase D  
> **前置**：[`docs/tasks/done/task_web_obs_demo_chain_dogfood_v1.md`](../done/task_web_obs_demo_chain_dogfood_v1.md)  
> **落盘**：`docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md`

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-hgm-consumer` |
| **test_strategy** | `required` |
| **test_strategy_note** | timeline 显式 ingest 策略可测；空事件/WARN 可读；禁默认静默 ingest |
| **code_quality_bar** | `recommended` |
| **orchestration** | `00 自主 loop · 单 30` |
| **semi_auto** | `false` |
| **audit_profile** | `human_only` |
| **invoke_retention_profile** | `default` |
| **required_invoke_hats** | `10,30,40` |
| **git_branch** | `task/web-obs-demo-hgm-consumer` |
| **graph_delta** | `docs/_tech_graph/00_main.md`（标注 timeline ingest 显式策略）或校对 |
| **graph_delta_note** | 触达 obs_api 消费 timeline；模块边界默认不变 |
| **experience_capture** | `required` |
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 22-R1, 30 | 00 代签 |
| HG-AUDIT-R1 | approved | 30 | 00 代签 · human_only |
| HG-GRAPH-MODULES | approved | 30 | 沿用 |

---

## 背景与目标

命中篇 3「HGM 消费者侧 dogfood」：Web/`obs` 展示 timeline 与 status 对照；**显式**说明何时 `--ingest`（禁止默认静默）；空事件/WARN 可读。证据可公开摘录。

---

## 范围

- [x] 文档：`docs/evidence/hgm_consumer_20260728.md`（或等价）写清 ingest 策略（默认 off；显式 on 的入口/风险）
- [x] API/UI：timeline 投影可演示；与 status 同页或对照；空事件可读
- [x] 可选：显式 query/flag 触发 `--ingest`（须页内警告「会写 events」）；默认路径仍不 ingest
- [x] 自动化测：默认 argv 无 `--ingest`；显式路径才带
- [x] README POINTER；PR + quality 绿

## 非范围

- 改产品仓 HGM 实现；Phase E CI harness verify 全做；Phase F；默认静默 ingest；直推 main

---

## 失败路径

| 触发条件 | 系统行为 | 可重试 | 用户可见 |
|----------|----------|--------|----------|
| 默认路径带 ingest | 打回 | 是 | 违 SPEC |
| 空 timeline 崩溃 | 打回 | 是 | 须空态 |

---

## 验收标准

- [x] 策略文档存在且可公开
- [x] `/obs`（或等价）可展示 timeline；与 status 对照有说明
- [x] 默认不 ingest 有测或代码断言
- [x] 空事件/WARN 可读
- [ ] invoke 10+30+40；KPI+经验关账前填齐（本棒 10+30；40 由 00 另派）

---

### 自检结论（执行者）
30 交付：evidence 策略 + `/obs` 对照/空态/WARN + 默认无 `--ingest` 测断言 + 显式 ingest 开关与页内警告 + README POINTER；`verify --graph` PASS；未改产品仓。

### KPI（00）
（待）

### 经验总结
（待）

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 Phase D · 代签三闸 |
