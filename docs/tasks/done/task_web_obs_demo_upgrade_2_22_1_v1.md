# Task：升级 2.22.1

> **状态**：`done`  
> **CLOSE**：本 PR 交付即关

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-upgrade-2-22-1` |
| **test_strategy** | `required` |
| **test_strategy_note** | check-pin · lint-wiki-delta · 三绿 |
| **invoke_retention_profile** | `minimal` |
| **required_invoke_hats** | `30,40` |
| **git_branch** | `task/upgrade-harness-2-22-1` |
| **graph_delta** | `none` |
| **graph_delta_note** | 仅 pin/upgrade/docs |
| **wiki_delta** | `docs/coding_wiki/topics/pin_and_upgrade.md` |
| **wiki_delta_note** | 钉 2.22.1 · FEEDBACK 指针 |
| **experience_capture** | `required` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 30 | 维护者「已发版，重新升级」 |
| HG-AUDIT-R1 | approved | 30 | 升级文档波 |

## 范围

- [x] #34 合入后 pin → **2.22.1**
- [x] lint 默认/strict · wiki export
- [x] FEEDBACK 2.22.1 · workflow 对齐 pin 样例
- [x] PR

### 经验总结

1. 2.20→2.22.1 一次跳升可行；无 local overlay 时 2.22 摩擦低。  
2. Wiki: [`docs/coding_wiki/topics/pin_and_upgrade.md`](../../coding_wiki/topics/pin_and_upgrade.md) · [`FEEDBACK_harness_2_22_1_from_web_obs_20260728.md`](../../evidence/FEEDBACK_harness_2_22_1_from_web_obs_20260728.md)
