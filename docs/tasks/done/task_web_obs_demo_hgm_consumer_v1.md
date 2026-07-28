# Task：Phase D · HGM 消费者闭环（timeline + 显式 ingest）

> **状态**：`done`  
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
| **wiki_delta** | `n/a` |
| **wiki_delta_note** | harness-only · 无 WikiTrack（升级 2.18 存量迁移） |
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
- [x] invoke 10+30+40；KPI+经验已齐（Task_KPI%=90）

---

### 自检结论（执行者）

| 命令 / 核对 | cwd | 退出码 / 结果 |
|-------------|-----|----------------|
| 读 `docs/evidence/hgm_consumer_20260728.md` | 仓根 | pass · §1 策略（默认 off / 显式 on）· §2 `/obs` · §3 复现 · §4 无阻塞产品结论 |
| `/obs` ObsView：timeline↔status · 空事件 · CLI WARN · 显式 ingest「会写 events」 | `src/views/ObsView.vue` | pass · 同页对照 + 空态文案 + WARN 区 + `role=alert` |
| 默认无 `--ingest` 测 | `tests/obsHandlers.test.ts` | pass · 默认 argv 不含；显式才含；resolveIngestFlag 缺省 false |
| `npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md --graph` | 仓根 | 0 · VERIFY PASS（落盘 40 前 WARN 缺 40） |
| `pnpm lint` / `pnpm test` / `pnpm build` | 仓根 | 0 / 17 passed / build ok |
| PR #13 | — | MERGED squash · `b1fabba` · https://github.com/Cyning12/cyning-harness-web/pull/13 |
| invoke 10/30/40 | `docs/harness/invokes/by-task/web-obs-demo-hgm-consumer/` | pass · 本 close 补齐 40 |
| README Phase D 指针 | README.md | pass · 链至 evidence · `/obs` 显式 ingest 说明 |
| 产品仓改动？ | — | 否 |
| **40 结论** | — | **pass** · 可关账预备；KPI / `task close` 交 00 |

已知未测：本棒未重开 `pnpm dev` 浏览器点选 ingest（以 #13 合入代码 + evidence §2 curl 步骤 + 单测断言为准）。

### KPI（00）

| 项 | 值 |
|----|-----|
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |
| **Task_KPI%** | `90` |
| **语义状态** | `pass` · Phase D HGM 消费者闭环（默认禁 ingest + 显式开关） |

| 大维 | 档位 | 说明 |
|------|------|------|
| D1 交付 | pass | evidence/UI/测/invoke10·30·40/自检齐 |
| D2 判断 | pass | 默认 off 可测；显式双提醒；未静默 ingest |
| D3 上下文 | pass | SPEC Phase D / 篇 3 消费者 dogfood |
| D4 合规 | pass | PR squash；无 allow-gap；未改产品仓 |
| D5 结果 | pass | #13/#14 quality；本地三绿 |

**judgment_notes**：无大维 fail。未做浏览器点选 ingest 写盘演示（证据标为已知未测）。

---

### 经验总结

1. **默认 off 须可测**：仅文档写「禁止静默 ingest」不够；须有 `buildHarnessCliArgs` / `getObsTimeline` 默认 argv **不含** `--ingest` 的断言，显式路径才含。
2. **空 timeline 是合法态**：`event_count=0` + CLI WARN 应投影为可读空态，不可当失败崩溃；与 status 同页对照时两边 event_count 可暂时不一致（未 ingest）。
3. **显式 ingest 必须双提醒**：UI 勾选后页内「会写 events」+ API 仅 `?ingest=1` 才追加旗标；status 路径永不带 `--ingest`。
4. **缺 40 不挡 30、挡 CLOSE**：`verify` WARN「缺 40」允许 30 开工；required_invoke_hats 含 40 时关账预备棒必须补齐 invoke。
5. **消费者侧 dogfood 可零改产品仓**：本 Phase 仅 Web/docs/测；产品反馈记「无阻塞」即可，字段统一类观察另开产品仓 issue。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 Phase D · 代签三闸 |
| 2026-07-28 | 40 自检：勾选验收 · 经验回填 · CLOSE 预备 · 不填 KPI |
| 2026-07-28 | 00 KPI Task_KPI%=90 · status=done · 准备 merge #14 + close |
