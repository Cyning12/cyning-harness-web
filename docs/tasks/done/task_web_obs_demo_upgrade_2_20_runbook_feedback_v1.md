# Task：升级 2.20.0 + wiki_delta RUNBOOK dogfood + FEEDBACK

> **状态**：`done`
> **CLOSE**：[`docs/harness/reviews/task_web_obs_demo_upgrade_2_20_runbook_feedback_CLOSE_20260728.md`](../../harness/reviews/task_web_obs_demo_upgrade_2_20_runbook_feedback_CLOSE_20260728.md)  
> **PROMPT**：维护者会话 · RUNBOOK 2.20 消费者验收

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-upgrade-2-20-runbook-feedback` |
| **test_strategy** | `required` |
| **test_strategy_note** | check-pin · lint-wiki-delta · 三绿 ·（可选）新 workflow |
| **invoke_retention_profile** | `minimal` |
| **invoke_retention_note** | 文档/升级 dogfood · 维护者单窗授权 |
| **required_invoke_hats** | `30,40` |
| **git_branch** | `task/upgrade-harness-2-20-runbook-feedback` |
| **graph_delta** | `none` |
| **graph_delta_note** | 无模块/路由变更 |
| **wiki_delta** | `docs/coding_wiki/topics/pin_and_upgrade.md` |
| **wiki_delta_note** | 指针钉版本至 2.20.0；FEEDBACK 链 |
| **experience_capture** | `required` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 30 | 维护者 Prompt 授权 · 2026-07-28 |
| HG-AUDIT-R1 | approved | 30 | 升级/文档 · CHECK 惯例 |

---

## 范围

- [x] upgrade + pin → **2.20.0**
- [x] `lint-wiki-delta` 默认绿；`--strict` 绿
- [x] wiki export 不回归
- [x] FEEDBACK + BACKFILL_DRAFT
- [x] 挂 `lint-wiki-delta` workflow（读 pin）
- [x] PR → main（本波）

## 非范围

- 改产品仓实现；削弱 close；默认 `--allow-wiki-gap`

## 验收

- [x] pin/manifest = 2.20.0
- [x] 默认 lint 绿；strict 绿
- [x] FEEDBACK ≥3 条可执行回馈 · **无 block**
- [x] PR URL（见合入说明）

### 经验总结

1. 2.20 对本仓主要是 RUNBOOK/`--strict`/CI 样例验收；字段早已齐。  
2. 产品 RUNBOOK 与本仓 pin 剧本有缺口（F-220-01..03）。  
3. Wiki: [`docs/coding_wiki/topics/pin_and_upgrade.md`](../../coding_wiki/topics/pin_and_upgrade.md) · FEEDBACK [`docs/evidence/FEEDBACK_harness_2_20_0_from_web_obs_20260728.md`](../../evidence/FEEDBACK_harness_2_20_0_from_web_obs_20260728.md)
