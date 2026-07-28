# Evidence SUMMARY · obs-demo epic A–E（2026-07-28）

| 项 | 值 |
|----|-----|
| **task** | [`docs/tasks/active/task_web_obs_demo_ci_evidence_v1.md`](../tasks/active/task_web_obs_demo_ci_evidence_v1.md) |
| **slug** | `web-obs-demo-ci-evidence` |
| **纪律包** | `@cyning/harness@2.17.0` |
| **branch** | `task/web-obs-demo-ci-evidence` |
| **hat** | 30（CI verify · 负向测 · 本 SUMMARY · 产品反馈） |
| **采集时区** | CST · 2026-07-28 |

> 可公开摘要：无密钥、无绝对机位路径。Web 为只读投影 · 非签收真值。

链式证据（脱敏）：

| Phase | 文件 |
|-------|------|
| C 帽链 dogfood | [`chain_dogfood_20260728.md`](./chain_dogfood_20260728.md) |
| D HGM 消费者 | [`hgm_consumer_20260728.md`](./hgm_consumer_20260728.md) |
| E 本 SUMMARY | 本文件 |
| 产品反馈 | [`ISSUE_DRAFT_cyning_harness_obs_demo_feedback_20260728.md`](./ISSUE_DRAFT_cyning_harness_obs_demo_feedback_20260728.md) |

---

## 1. 可复现命令（仓根）

### 1.1 CI 同款 harness verify（CLOSED 样例）

```bash
# 策略：CI 用 docs/tasks/done/ 已 CLOSE 样例（帽齐、闸稳）
# 禁止 --allow-*-gap；钉 2.17.0
npx --yes @cyning/harness@2.17.0 verify \
  --target . \
  --task docs/tasks/done/task_web_obs_demo_hgm_consumer_v1.md
```

期望：`VERIFY: PASS`；闸表三行 approved；无阻塞。

### 1.2 本棒 active task verify（开发中）

```bash
npx --yes @cyning/harness@2.17.0 verify \
  --target . \
  --task docs/tasks/active/task_web_obs_demo_ci_evidence_v1.md
```

期望：`VERIFY: PASS`；缺 40 仅 WARN（不挡 30；CLOSE 前补 40）。

### 1.3 质量门 + 负向测

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm test
pnpm build
```

负向用例（Vitest · `tests/obsHandlers.test.ts` · 标题含「负向」）：

| 场景 | 期望 code |
|------|-----------|
| live 无 task / 空 task | `NO_TASK` |
| spawn 失败 | `CLI_SPAWN_FAILED` |
| CLI 非 0 | `CLI_NONZERO` |
| 写闸拒绝 | `WRITE_GATE_FORBIDDEN` |

### 1.4 Actions

见 [`.github/workflows/quality.yml`](../../.github/workflows/quality.yml) 步骤 **Harness verify**（注释含 task 路径策略）。

---

## 2. 可公开计数 / 耗时区间（小样本 · 单机）

> 区间为本地一次采集的数量级；CI runner 可能 ±50%。单位：秒（wall）。

| 步骤 | 次数（本棒） | 耗时区间（s） | 结果 |
|------|--------------|---------------|------|
| `harness verify`（done/hgm 样例） | 1 | 0.8–1.5 | PASS |
| `harness verify`（active E） | 1 | 1.0–1.5 | PASS（WARN 缺 40） |
| `pnpm lint` | 1 | 0.9–1.5 | 绿 |
| `pnpm test`（18 cases） | 1 | 0.5–1.0 | 18/18 绿 |
| 其中标题含「负向」 | 5 | &lt;0.1（suite 内） | 绿 |
| `pnpm build` | 1 | 1.2–2.0 | 绿 |

### 过程计数（epic 可公开摘要）

| 指标 | 约数 | 来源 |
|------|------|------|
| Phase task 棒（A0→E） | 6 CLOSED/进行中 | tasks active/done |
| 过程闸代签次数（00） | 见 CHECK 台账 | [`CHECK_00_gate_proxy_basis_20260728.md`](./CHECK_00_gate_proxy_basis_20260728.md) |
| 阻塞开工的产品缺陷 | **0** | C/D/E 结论 |
| 非阻塞观察草稿 | 3（schema key / KPI 弱校验等） | issue 草稿 |

---

## 3. CI · harness verify 策略（真值）

| 项 | 约定 |
|----|------|
| 包钉 | `@cyning/harness@2.17.0` |
| 触发 | `quality` workflow · 在 lint/test/build **之后** |
| task | `docs/tasks/done/task_web_obs_demo_hgm_consumer_v1.md` |
| 为何 done | CLOSED 样例帽链齐、闸稳；active 易缺 40 / 漂移 |
| `--graph` | 本样例 `graph_delta` 已签收历史路径；CI 步与样例省略（与 Q5：E 起加 verify） |
| 禁止 | `--allow-invoke-gap` / 其他 allow-*-gap |

本地与 CI 命令一致，见 §1.1。

---

## 4. 本棒交付清单

| 交付 | 路径 / 说明 |
|------|-------------|
| 30 invoke | `docs/harness/invokes/by-task/web-obs-demo-ci-evidence/invoke_20260728_30_…` |
| workflow | `.github/workflows/quality.yml` · Harness verify |
| 负向测 | `tests/obsHandlers.test.ts`（≥2；本棒标「负向」5 条） |
| SUMMARY | 本文件 |
| 产品反馈 | `ISSUE_DRAFT_cyning_harness_obs_demo_feedback_20260728.md` |
| README | POINTER + CI 策略 |

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 30 首采 · Phase E 收口证据 |
