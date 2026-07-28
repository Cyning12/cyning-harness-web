# Task：Phase A 脚手架 · Vite/Vue 壳 + 路由 + stub API

> **状态**：`in_progress`  
> **Phase**：`A`（依赖 A0 CLOSED）  
> **关联 SPEC**：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md)  
> **关联图谱**：[`docs/_tech_graph/01_struct.md`](../../_tech_graph/01_struct.md) · [`00_main.md`](../../_tech_graph/00_main.md)  
> **前置**：[`docs/tasks/done/task_web_obs_demo_inform_bootstrap_v1.md`](../done/task_web_obs_demo_inform_bootstrap_v1.md)  
> **落盘**：`docs/tasks/active/task_web_obs_demo_scaffold_vite_shell_v1.md`

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-scaffold-vite-shell` |
| **test_strategy** | `required` |
| **test_strategy_note** | 至少 1 个可失败测：stub API / 只读边界（禁写闸）或路由冒烟；合并前 `pnpm lint` → `pnpm test` → `pnpm build` |
| **code_quality_bar** | `recommended` |
| **freeze_id** | — |
| **orchestration** | `00 自主 loop · 单 30` |
| **semi_auto** | `false` |
| **audit_profile** | `human_only` |
| **invoke_retention_profile** | `default` |
| **required_invoke_hats** | `10,30,40` |
| **git_branch** | `task/web-obs-demo-scaffold-vite-shell` |
| **worktree_root** | （串行 · 仓根） |
| **graph_delta** | `docs/_tech_graph/00_main.md`（若路由/API 落点与图不一致则增量改）；模块表默认不改 |
| **graph_delta_note** | 触达 `web_ui` / `obs_api` 预期路径；边界未变则 `00_main` 可仅校对锚点 |
| **experience_capture** | `required` |
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 22-R1, 30 | 00 代签 · 2026-07-28 · A0 已 CLOSE |
| HG-AUDIT-R1 | approved | 30 | 00 代签 · human_only |
| HG-GRAPH-MODULES | approved | 30 | 沿用 A0 · `01_struct` 已 approved · Q8 |

---

## 背景与目标

A0 已建立 Inform。本棒交付 **可 `pnpm dev` 的最小 Web 壳**：路由 `/` · `/obs` · `/docs`，页内只读声明，服务端 stub（读盘 md + 假 status/timeline JSON），为 Phase B live CLI 打底。

**完成态**：本仓根 `pnpm install && pnpm dev` 可开三路由；`pnpm lint`/`test`/`build` 绿；经 PR squash 入 `main`。

---

## 范围

- [x] `package.json` + pnpm：Vite · Vue 3 · TypeScript（Element Plus **可选**；无则用朴素样式）
- [x] 路由：`/` 说明页 · `/obs` 过程投影（可 stub）· `/docs` 文档列表/预览（扫 `docs/tasks/**` 至少）
- [x] 薄服务端：**Vite middleware 或同仓小 Express 二选一**；仅 Node 侧；`GET` 读 md / stub `obs_status.v1`·`obs_timeline.v1`
- [x] 页内明示：「只读投影 · 非签收真值」；无写闸 API
- [x] 失败可读：无 task / 读盘失败返回可读错误（可 stub）
- [x] 至少 1 个自动化测试（Vitest 或等价）覆盖 stub 成功或禁写闸
- [x] `.github/workflows/quality.yml`：`pnpm lint` → `pnpm test` → `pnpm build`（Q5：A 起质量门）
- [x] README：如何 `pnpm install` / `pnpm dev`
- [ ] 分支 `task/web-obs-demo-scaffold-vite-shell` → PR → checks 绿 → **00 squash merge**

## 非范围

- **禁止** live `npx @cyning/harness status|timeline`（属 Phase B `live_obs_*`）
- **禁止** `harness init` 全量工程改（Phase B）
- **禁止** 浏览器 `npx`；**禁止** Web 写 `HG-*=approved`
- **禁止** 改 `cyning-harness` 产品源码；**禁止** Phase C–F
- **禁止** 直推 `main`；**禁止**默认 `--allow-*-gap`

---

## 失败路径

| 触发条件 | 系统行为 | 可重试 | 用户可见 |
|----------|----------|--------|----------|
| 闸 pending | 30 拒开工 | 是 | gate_id |
| 浏览器侧 spawn CLI | 设计禁止；测/审查打回 | 否 | N/A |
| 无 lint/test/build | CI/本地红；不得合入 | 是 | checks |
| 越界做 live CLI / harness init | 打回拆 Phase B | 是 | 越 Phase |

---

## 验收标准

- [ ] `pnpm install` → `pnpm dev` 可访问 `/` · `/obs` · `/docs`
- [ ] 页内可见只读声明
- [ ] `/docs` 能列出并打开至少 1 个仓内 md（如 done/A0 task）
- [ ] `/obs` 展示 stub JSON 或空态可读（非崩溃）
- [ ] `pnpm lint` → `pnpm test` → `pnpm build` 绿
- [ ] Actions quality workflow 存在且本 PR checks 可跑
- [ ] invoke 含 10+30+40；PR squash；KPI+经验关账前填齐

---

## 给执行帽的必读列表

1. 本 task · SPEC §2.1–2.3 · §4.1  
2. `docs/_tech_graph/01_struct.md` · `00_main.md`  
3. `docs/meta/ONTOLOGY_web_obs_demo_v1.md` 边界  
4. 工作区 GUIDANCE 过程可观测 §2（若可读）

---

## 实现备忘（子 Agent 回填）

| 项 | 状态 | 备注 |
|----|------|------|
| Vite/Vue 壳 | ✅ | pnpm + Vite 6 + Vue 3 + TS；朴素样式（未引入 Element Plus） |
| 三路由 + 只读声明 | ✅ | `/` `/obs` `/docs`；顶栏+页内「只读投影 · 非签收真值」 |
| middleware/Express | ✅ | `server/viteObsPlugin.ts` + `obsHandlers.ts`；stub status/timeline；禁写闸 |
| 测试 + Actions | ✅ | `tests/obsHandlers.test.ts`；`.github/workflows/quality.yml` |
| PR | ✅ | 见本 PR · 00 squash |
| graph_delta | ✅ | `00_main` 锚点校对；`01_struct` 路径备注更新为已建；模块边界未变 |

---

## 测试策略（Harness）

**test_strategy**: `required`

- 30 前：`npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_scaffold_vite_shell_v1.md --graph`
- 合并前：`pnpm lint` → `pnpm test` → `pnpm build`

---

### 自检结论（执行者）

- verify `--graph`：PASS（闸三行 approved；缺 40 WARN · close 前补）
- 本地：`pnpm lint` → `pnpm test` → `pnpm build`（见 PR 描述）
- 边界：无浏览器 npx；`/api/gates/*` → `WRITE_GATE_FORBIDDEN`；读盘限 `docs/tasks/**`
- 非范围遵守：无 live CLI、无 harness init、未改产品仓

---

### KPI（00）

（关账回溯）

---

### 经验总结

（`experience_capture: required`）

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 Phase A 首棒 · 代签三闸 |
