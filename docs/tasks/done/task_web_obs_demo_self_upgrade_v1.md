# Task：Demo 自我升级（钉版本单源 + 只读版本投影）

> **状态**：`done`  
> **Phase**：`post-E`（自我升级 · PLAN C）  
> **合入**：PR [#23](https://github.com/Cyning12/cyning-harness-web/pull/23) squash · `d4e7f8f`  
> **PLAN**：[`docs/harness/guides/PLAN_web_obs_demo_self_upgrade_v1_zh.md`](../../harness/guides/PLAN_web_obs_demo_self_upgrade_v1_zh.md)  
> **关联 SPEC**：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md)（只读边界不变）

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-self-upgrade` |
| **test_strategy** | `required` |
| **test_strategy_note** | pin 解析可测；版本 API 失败路径可测；check 脚本漂移可失败 |
| **code_quality_bar** | `recommended` |
| **orchestration** | `00 自主 loop · 单 30` |
| **semi_auto** | `false` |
| **audit_profile** | `human_only` |
| **invoke_retention_profile** | `default` |
| **required_invoke_hats** | `10,30,40` |
| **git_branch** | `task/web-obs-demo-self-upgrade` |
| **graph_delta** | `docs/_tech_graph/01_struct.md` |
| **graph_delta_note** | 扩展 `obs_api`：版本探测 API；更新模块表 `obs_api` 行说明；不新增一级 module_id |
| **wiki_delta** | `n/a` |
| **wiki_delta_note** | harness-only · 无 WikiTrack（升级 2.18 存量迁移） |
| **experience_capture** | `required` |
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 22-R1, 30 | 00 代签 · 2026-07-28 · CHECK 台账 |
| HG-AUDIT-R1 | approved | 30 | 00 代签 · human_only · audit R1 |
| HG-GRAPH-MODULES | approved | 30 | 沿用 A0；本棒更新 `obs_api` 行 |

---

## 背景与目标

维护者同意 PLAN **C + R3**：本 Demo 可安全跟随 `@cyning/harness` 升级——**版本钉唯一真值**、维护者 **RUNBOOK**、Web **只读**展示 pinned / manifest / npm latest。

**完成态**：散落 `2.17.0` 同源；CI 与 live CLI 读同一 pin；首页或 `/obs` 有白话「纪律包版本」条；无浏览器升级写操作。

---

## 范围

### S1 · 钉 + 剧本

- [x] 新增 pin 真值文件（建议仓根 `harness.pin.json`：`{ "package": "@cyning/harness", "version": "2.17.0" }`）
- [x] `server/harnessCli.ts` 的 `HARNESS_PACKAGE` **从 pin 读取**（构建期或运行时读盘；勿再手写散落版本）
- [x] `.github/workflows/quality.yml`：Harness verify 步骤改为跑脚本（如 `scripts/harness-verify-ci.mjs`）读 pin 再 `npx`；**禁止** workflow 内再硬编码另一版本号（或 check 脚本强制一致）
- [x] `scripts/check-harness-pin.mjs`：断言 pin ↔ CLI 常量来源 ↔（可选）README/workflow 无漂移；故意漂移时 exit ≠ 0；可挂 `pnpm test` 或 quality 一步
- [x] （可选）`scripts/bump-harness-pin.mjs`：仅改 pin 文件版本，**不**执行 upgrade
- [x] 落盘 `docs/harness/guides/RUNBOOK_harness_upgrade_v1_zh.md`：干净 git → `npx @cyning/harness@<ver> upgrade --yes [--gate-check]` → bump pin → check → lint/test/build → verify → PR
- [x] README：链 RUNBOOK；钉版本叙述与 pin 一致（可用「见 harness.pin.json」避免第三处数字）

### S2 · 只读版本投影

- [x] `GET /api/obs/harness-version` → JSON：`pinned`、`manifest_version`（读 `.cyning-harness/manifest.json`）、`npm_latest?`、`behind?`、`error?` / 探测失败可读
- [x] npm 探测：服务端短超时（建议 ≤5s）；失败不挡页
- [x] UI：首页 **或** `/obs` 一条「纪律包版本」白话；落后时链到 RUNBOOK（**禁止**一键升级按钮 / 触发 upgrade API）
- [x] 更新 `docs/_tech_graph/01_struct.md` 的 `obs_api` 行：含版本探测
- [x] 单测：pin 解析；API/handler mock（含 npm 失败）；至少 1 负向

### 合入

- [x] 分支 `task/web-obs-demo-self-upgrade`；PR → quality 绿 → 00 squash merge（30 **勿**直推 main）
- [x] 落盘 30 invoke；回填 `### 自检结论（执行者）`

## 非范围

- 浏览器 / HTTP 触发 `harness upgrade` 或写闸
- 真实 npm 升版 dogfood（S3；当前 latest==pinned 时可只写 RUNBOOK 演练说明）
- 改 `cyning-harness` 产品仓；Phase F；默认 `--allow-*-gap`；直推 `main`

---

## 失败路径

| 触发条件 | 系统行为 | 可重试 | 用户可见 |
|----------|----------|--------|----------|
| pin 文件缺失/非法 | CLI/API 可读错误；check 非 0 | 是 | 配置错误提示 |
| npm view 超时/失败 | `npm_latest` 空 + 标记探测失败 | 是 | 版本条不崩溃 |
| manifest 缺失 | `manifest_version` 空 + 说明 | 是 | 可读 |
| 闸 pending | 30 拒开工 | 是 | gate_id |

---

## 验收标准

- [x] 全仓业务路径无第二处「权威」版本硬编码（check 脚本 PASS）
- [x] `pnpm lint` → `pnpm test` → `pnpm build` 绿
- [x] `pnpm dev` 可见版本条；无升级写入口（代码审阅：`HomeView` 纪律包版本条 + 链 RUNBOOK；无 upgrade API/按钮；合入后维护者可再目视）
- [x] RUNBOOK 可跟做（无绝对机径）
- [x] PR squash 合入 main（#23 · quality 绿）

---

## 必读

- PLAN：`docs/harness/guides/PLAN_web_obs_demo_self_upgrade_v1_zh.md`
- `server/harnessCli.ts` · `server/obsHandlers.ts` · `server/viteObsPlugin.ts`
- `.github/workflows/quality.yml`
- `docs/_tech_graph/01_struct.md`
- 产品：`npx @cyning/harness upgrade`（USER_GUIDE · 勿改产品仓）

---

## 验证命令

```bash
pnpm lint
pnpm test
pnpm build
node scripts/check-harness-pin.mjs
npx --yes @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_self_upgrade_v1.md --graph
```

（实现后 verify 钉版本应与 pin 一致；可用 `node scripts/harness-verify-ci.mjs` 替代手写版本。）

---

### 自检结论（执行者）

| 命令 | 结果 |
|------|------|
| `pnpm lint` | PASS |
| `pnpm test` | PASS（27；含 pin 解析负向 + npm 失败降级） |
| `pnpm build` | PASS |
| `node scripts/check-harness-pin.mjs` | PASS |
| `node scripts/harness-verify-ci.mjs docs/tasks/active/task_web_obs_demo_self_upgrade_v1.md --graph` | PASS（合入前 WARN 缺 40；现已补 invoke 40） |

交付：`harness.pin.json` 单源；CLI/CI 读 pin；`GET /api/obs/harness-version` + 首页版本条；RUNBOOK；无升级写入口。  
合入：PR #23 squash · `d4e7f8f`（00 · quality 绿）。

---

### KPI（00）

| 项 | 值 |
|----|-----|
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |
| **Task_KPI%** | `92` |
| **语义状态** | `pass` · pin 单源 + 只读版本投影 + RUNBOOK |

| 大维 | 档位 | 说明 |
|------|------|------|
| D1 交付 | pass | pin/CI/CLI/API/UI/RUNBOOK/测/check 齐 |
| D2 判断 | pass | 升级只走终端剧本；Web 只读 |
| D3 上下文 | pass | 对齐 PLAN C + 维护者同意 |
| D4 合规 | pass | PR squash；无 `--allow-*-gap`；graph_delta 路径合法 |
| D5 结果 | pass | #23 quality 绿；本地三绿 + check-pin |

**judgment_notes**：无大维 fail。S3 真实升版暂缓（latest==pinned）。

---

### 经验总结

1. **`graph_delta` 须为仓内路径或 `none`**：填 `update` 会 WARN/close BLOCK；本棒用 `docs/_tech_graph/01_struct.md`。
2. **版本钉单源优先于「文档再写一遍数字」**：README 指向 `harness.pin.json` + check 脚本，比三处手写更抗漂移。
3. **CI 用脚本读 pin 再 npx**：workflow 内硬编码版本是第二真值；`harness-verify-ci.mjs` 消掉。
4. **npm 探测必须降级**：短超时 + 失败不挡页；版本条是教学投影不是签收闸。
5. **禁止 UI 一键 upgrade**：Demo 教的是可观测与剧本，不是远程改仓机器人。
6. **`task close` 勿加 `--target .`**：该参是归档目标目录，不是仓根。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 · 代签三闸 · 派 30 |
| 2026-07-28 | 30 实现 · PR #23 squash · 00 KPI/经验 · 关账预备 |
