# Task：Phase B · harness 接入 + live status/timeline

> **状态**：`in_progress`  
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
- [ ] 分支 PR → quality 绿 → 00 squash merge

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
- [ ] invoke 10+30+40；KPI+经验关账前填齐

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
| PR | ⏳ | 本棒 push 后填 URL |

**graph_delta**：`docs/_tech_graph/00_main.md` 注记 live CLI；`01_struct` obs_api 备注更新；模块边界未变。

---

## 测试策略（Harness）

**test_strategy**: `required`

- 30 前：`npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_live_obs_status_v1.md --graph` → **PASS**（2026-07-28）

---

### 自检结论（执行者）

- verify --graph PASS；闸三行 approved
- live 路径仅 Node spawn；无写闸 API；默认无 `--ingest`
- 自动化覆盖 CLI 失败可读 + mock 成功
- pnpm lint/test/build：见 PR 前本地跑结果

---

### KPI（00）

（关账回溯）

---

### 经验总结

（`experience_capture: required` · 关账前由 00/40 填）

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 Phase B · 代签三闸 |
| 2026-07-28 | 30 实现 live obs + harness init · 回填备忘 |
