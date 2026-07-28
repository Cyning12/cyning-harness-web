# Task：Phase C · 帽链 dogfood（微改 + /obs 对照）

> **状态**：`in_progress`  
> **Phase**：`C`（依赖 Phase B CLOSED）  
> **关联 SPEC**：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md) §2.6 / §4.2 / 附录 A Phase C  
> **前置**：[`docs/tasks/done/task_web_obs_demo_live_obs_status_v1.md`](../done/task_web_obs_demo_live_obs_status_v1.md)  
> **落盘**：`docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md`

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-chain-dogfood` |
| **test_strategy** | `recommended` |
| **test_strategy_note** | 过程 dogfood：以落盘 invoke/review + `/obs` 对照为主；微改须仍过 pnpm 三绿若触码 |
| **code_quality_bar** | `recommended` |
| **orchestration** | `00 自主 loop · 单 30` |
| **semi_auto** | `false` |
| **audit_profile** | `human_only` |
| **invoke_retention_profile** | `full` |
| **required_invoke_hats** | `10,30,40` |
| **git_branch** | `task/web-obs-demo-chain-dogfood` |
| **graph_delta** | `none` |
| **graph_delta_note** | 微改不触及模块边界（README 一行或 docs/evidence 注记）；若改码边界则改填 |
| **experience_capture** | `required` |
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 22-R1, 30 | 00 代签 |
| HG-AUDIT-R1 | approved | 30 | 00 代签 · human_only |
| HG-GRAPH-MODULES | approved | 30 | 沿用 · Q8 |

---

## 背景与目标

用本仓跑一小轮真实帽链：闸 → verify → 30 **极小**改动 → review/CLOSE 痕迹；并用 `/obs`（live）对照闸前后 `may_start_30` / 过程投影。缺陷只记 `docs/evidence/`，不改产品仓源码。

**完成态**：`docs/evidence/chain_dogfood_*` 有可公开摘要；本 task invoke full 齐；微改经 PR 合入。

---

## 范围

- [x] 开帽落盘本 task 的 10/30/40（profile **full**）
- [x] 30 微改（择一，极小）：README 增一行 dogfood 指针，或 `docs/evidence/chain_dogfood_20260728.md` 正文（推荐后者为主交付）
- [x] 记录：`gate-check`/`verify`/`status --json` 闸前后摘录（脱敏）写入 evidence
- [x] `/obs` 对照说明（截图式文字或 JSON 字段差异）
- [x] 产品缺陷 → `docs/evidence/` issue 草稿或「无阻塞缺陷」结论
- [x] PR squash 入 main

## 非范围

- 大范围改 UI/API；Phase D ingest 策略全做；改 `cyning-harness` 源码；Phase F；直推 main；`--allow-*-gap`

---

## 失败路径

| 触发条件 | 系统行为 | 可重试 | 用户可见 |
|----------|----------|--------|----------|
| 微改扩成功能开发 | 打回 | 是 | 越 scope |
| 无 evidence | CLOSE 挡 | 是 | 缺证据 |

---

## 验收标准

- [x] `docs/evidence/chain_dogfood_*.md` 存在且含复现命令 + 闸前后对照
- [x] invoke 按 full/required 齐（至少 10,30,40）
- [x] 微改已 PR 合入；若触码则 quality 绿
- [x] 产品反馈：issue 草稿或无阻塞书面结论
- [x] KPI+经验关账前填齐（经验已填 · KPI 待 00）

---

## 实现备忘 / 自检 / KPI / 经验

### 自检结论（执行者）

| 命令 / 核对 | cwd | 退出码 / 结果 |
|-------------|-----|----------------|
| 读 `docs/evidence/chain_dogfood_20260728.md` | 仓根 | pass · §1 复现命令 · §3 闸前后 · §4 `/obs` · §5 无阻塞 |
| `npx @cyning/harness@2.17.0 gate-check --target . --task docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md` | 仓根 | 0 · 三闸 approved · 落盘 40 前 WARN 缺 40 |
| `npx @cyning/harness@2.17.0 verify --target . --task …`（无 `--graph`） | 仓根 | 0 · VERIFY PASS |
| `npx @cyning/harness@2.17.0 status … --json` | 仓根 | `may_start_30: true` · `last_invoke.hat_id=30`（落盘 40 前）· `reviews.CLOSE=false` |
| PR #10 | — | MERGED squash · `3ec0198` · https://github.com/Cyning12/cyning-harness-web/pull/10 |
| invoke 10/30/40 | `docs/harness/invokes/by-task/web-obs-demo-chain-dogfood/` | pass · 本 close 补齐 40 |
| README Phase C 指针 | README.md | pass · 链至 evidence |
| 触码？ | — | 否（docs-only）· 无需重跑 pnpm 三绿 |
| **40 结论** | — | **pass** · 可关账预备；KPI / `task close` 交 00 |

已知未测：本棒未重开 `pnpm dev` 浏览器点检（以 #10 合入 evidence §4 与 CLI 一致为准）。

### KPI（00）

（待）

### 经验总结

1. **代签先于翻转**：本轮 dogfood 由 00 先代签三闸再派 30，CLI/`/obs` 全程 `may_start_30: true`，可观测增量主要落在 `last_invoke` 与 invoke-gap WARN，而非闸状态翻转。
2. **缺 40 不挡 30、挡 CLOSE**：`verify` WARN「缺 40」不挡开工；full profile 关账前必须补齐 40 invoke（本棒职责）。
3. **live vs stub 键名**：stub 用 `schema`、CLI live 用 `schema_version`；对照时勿把 stub 当真值，前端需双读或后续统一契约（DRAFT-OBS-SCHEMA-KEY）。
4. **证据优先于改码**：Phase C 主交付是 `docs/evidence/chain_dogfood_*` + README POINTER；未改 Vue/API 即可完成帽链对照，降低越 scope 风险。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 Phase C · 代签三闸 |
| 2026-07-28 | 40 自检：勾选验收 · 经验回填 · CLOSE 预备 |
