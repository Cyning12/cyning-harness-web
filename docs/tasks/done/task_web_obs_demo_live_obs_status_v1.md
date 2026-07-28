# Task：Phase B · harness 接入 + live status/timeline

> **状态**：`done`  
> **Phase**：`B`（依赖 Phase A CLOSED）  
> **关联 SPEC**：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md) §2.4 · 附录 A Phase B  
> **关联图谱**：[`docs/_tech_graph/01_struct.md`](../../_tech_graph/01_struct.md) · [`00_main.md`](../../_tech_graph/00_main.md)  
> **前置**：[`docs/tasks/done/task_web_obs_demo_scaffold_vite_shell_v1.md`](../done/task_web_obs_demo_scaffold_vite_shell_v1.md)  
> **落盘**：`docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md`

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-live-obs-status` |
| **test_strategy** | `required` |
| **test_strategy_note** | 可失败测：CLI 失败可读错误；成功路径可 mock spawn 或集成测（勿在浏览器 npx）；合并前 pnpm 三绿 |
| **code_quality_bar** | `recommended` |
| **freeze_id** | — |
| **orchestration** | `00 自主 loop · 单 30` |
| **semi_auto** | `false` |
| **audit_profile** | `human_only` |
| **invoke_retention_profile** | `default` |
| **required_invoke_hats** | `10,30,40` |
| **git_branch** | `task/web-obs-demo-live-obs-status` |
| **worktree_root** | （串行 · 仓根） |
| **graph_delta** | `docs/_tech_graph/00_main.md`（标注 live CLI 路径）；边界未变可仅注记 |
| **graph_delta_note** | 触达 `obs_api`：stub→live CLI；模块表默认不改 |
| **wiki_delta** | `n/a` |
| **wiki_delta_note** | harness-only · 无 WikiTrack（升级 2.18 存量迁移） |
| **experience_capture** | `required` |
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 22-R1, 30 | 00 代签 · Phase A 已 CLOSE |
| HG-AUDIT-R1 | approved | 30 | 00 代签 · human_only |
| HG-GRAPH-MODULES | approved | 30 | 沿用 A0 · Q8 |

---

## 背景与目标

Phase A 已有 stub `/obs`。本棒把观测 API 接到 **本仓真实** `@cyning/harness` ≥2.17.0：`status` / `timeline --json`（仅服务端 spawn），并 `harness init|upgrade`（preset 建议 `harness-only`）使落盘可观测非空。

**完成态**：`pnpm dev` 下 `/obs` 可加载 live 投影（或明确 CLI 错误）；`/docs` 仍可读；经 PR + quality 绿 squash 入 `main`。

---

## 范围

- [x] `npx @cyning/harness@2.17.0 init` 或 `upgrade`（preset `harness-only`；ide 按仓内习惯；提交必要 `.cyning-harness/` / 脚本，勿提交密钥）
- [x] 服务端将 stub 换为（或旁路）live：`status --target <仓根> --task <path> --json` · `timeline … --json`（默认 **不** `--ingest`）
- [x] `/obs` UI：可选 task 路径或默认 active/done 样例；重载按钮；页内只读声明保留
- [x] CLI 失败 / 无 task：可读错误（沿用 Phase A 失败语义）
- [x] 自动化测：至少覆盖 spawn 失败或 JSON 解析失败的可读投影；成功路径可用 mock
- [x] README：如何选 task、如何刷新 `/obs`
- [x] 分支 PR → quality 绿 → 00 squash merge（PR #7 · 2026-07-28）

## 非范围

- **禁止** 浏览器 `npx` / 前端直调 CLI
- **禁止** Web 写闸；**禁止** 默认 `timeline --ingest`（属 Phase D 策略）
- **禁止** 完整帽链 dogfood 证据包（Phase C）
- **禁止** 改 `cyning-harness` 产品源码
- **禁止** 直推 `main`；**禁止**默认 `--allow-*-gap`

---

## 失败路径

| 触发条件 | 系统行为 | 可重试 | 用户可见 |
|----------|----------|--------|----------|
| CLI 未装 / 版本低 / 非 0 | API 错误载荷；UI 可读 | 是 | CLI 不可用摘要 |
| 无 task 路径 | 空态/错误码 | 是 | 无可用 task |
| 闸 pending | 30 拒开工 | 是 | gate_id |

---

## 验收标准

- [x] 仓内已 init/upgrade（manifest 或等价可核对）
- [x] `/obs` 能展示 live status 和/或 timeline（相对 stub 可切换或替换）
- [x] 失败路径可读（测或手工记录于自检）
- [x] `pnpm lint` → `test` → `build` 绿；PR quality 绿
- [x] 只读声明仍在；无写闸 API
- [x] invoke 10+30+40；经验+KPI 已齐（Task_KPI%=91）

---

## 给执行帽的必读列表

1. 本 task · SPEC §2.4 · 附录 A Phase B  
2. `server/obsHandlers.ts` / stub 现状  
3. `docs/meta/ONTOLOGY_web_obs_demo_v1.md`  
4. 产品 USER_GUIDE status/timeline（若本地 cyning-harness 可读）

---

## 实现备忘（子 Agent 回填）

| 项 | 状态 | 备注 |
|----|------|------|
| harness init/upgrade | ✅ | `init --preset harness-only --ide cursor` · manifest 2.17.0；`local.json` gitignore |
| live status/timeline | ✅ | `server/harnessCli.ts` spawn；`?source=stub` 旁路；默认不 ingest |
| UI 重载 / task 选择 | ✅ | `ObsView.vue` 下拉 + 重载 + 只读横幅 |
| 测试 | ✅ | mock spawn：失败 / 非 0 / JSON 解析 / 成功 |
| PR | ✅ | https://github.com/Cyning12/cyning-harness-web/pull/7 · squash MERGED |
| 40 自检 / 关账预备 | ✅ | close 分支 · invoke_40 + CLOSE 摘要 · CHECK_00 合入行 |

**graph_delta**：`docs/_tech_graph/00_main.md` 注记 live CLI；`01_struct` obs_api 备注更新；模块边界未变。

---

## 测试策略（Harness）

**test_strategy**: `required`

- 30 前：`npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md --graph` → **PASS**（2026-07-28）

---

### 自检结论（执行者）

- **40 结论**：**pass** · 关账预备完成；待 00 KPI + `harness task close`
- verify `--graph`（40 · 2026-07-28）：PASS（闸三行 approved）；WARN 缺 40 → 本 close 已补 invoke_40
- 实现 PR：https://github.com/Cyning12/cyning-harness-web/pull/7 · squash MERGED · quality 绿
- 本地复跑（40 · 2026-07-28）：`pnpm lint` → `pnpm test`（12/12）→ `pnpm build` 绿
- 交付抽样：
  - `.cyning-harness/manifest.json` · version `2.17.0` · preset `harness-only`；`local.json` gitignore
  - `harnessCli.runHarnessJson`：status/timeline `--json`，args **不含** `--ingest`
  - `ObsView`：task 下拉 · live/stub ·「重新加载」· 只读横幅 · 失败 `error`/`errorDetail`
  - 测：`CLI_SPAWN_FAILED` / `CLI_NONZERO` / `CLI_JSON_PARSE` / mock 成功 / `WRITE_GATE_FORBIDDEN` / `NO_TASK`
- 边界：无浏览器 npx；无写闸 API；非范围遵守（无默认 ingest / 未改产品仓 / 无 Phase C dogfood）

---

### KPI（00）

| 项 | 值 |
|----|-----|
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |
| **Task_KPI%** | `91` |
| **语义状态** | `pass` · Phase B live status/timeline + init 闭环 |

| 大维 | 档位 | 说明 |
|------|------|------|
| D1 交付 | pass | init/manifest、live CLI、/obs、测、invoke10·30·40、自检齐 |
| D2 判断 | pass | 无默认 ingest；可测 spawn；stub 旁路保留；证据 PR #7/#8 |
| D3 上下文 | pass | SPEC Phase B / OBS 契约 / 只读边界 |
| D4 合规 | pass | PR squash；无 allow-*-gap；禁写闸有测 |
| D5 结果 | pass | quality 绿合入；本地 lint/test/build 绿 |

**judgment_notes**：无大维 warn/fail。

---

### 经验总结

（`experience_capture: required` · 40 草稿 · 00 关账确认）

1. **live 默认路径要可测**：`SpawnFn` 注入比真实 `npx` 更稳；失败码（spawn/非 0/JSON）与成功 mock 各至少一条，UI 才能宣称「可读」。
2. **默认禁 ingest 写进 spawn args 真值**：仅 README/注释不够；`runHarnessJson` 构造的 argv 必须不含 `--ingest`，避免 Phase D 策略被误开。
3. **stub 旁路保留对照价值**：`?source=stub` 让 CI/本地无 harness CLI 时仍可演示契约，与 live 切换同页，减少「CLI 挂了整页空白」。
4. **关账与实现 PR 分轨**：实现 #7 squash 后再开 `*-close` 补 40 invoke / 验收勾选 / CHECK 合入行，避免实现 diff 与文档关账混杂。
5. **invoke hats gap**：verify 会 WARN 缺 40；close 棒必须落盘 `invoke_*_40_*`，否则 CLOSE 前需 `--allow-invoke-gap`（本仓禁止默认 gap）。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 Phase B · 代签三闸 |
| 2026-07-28 | 30 实现 live obs + harness init · 回填备忘 |
| 2026-07-28 | 40 自检 pass · 关账预备 · invoke_40 + CLOSE 摘要 · 经验草稿 |
| 2026-07-28 | 00 KPI Task_KPI%=91 · status=done · 准备 merge #8 + close |
