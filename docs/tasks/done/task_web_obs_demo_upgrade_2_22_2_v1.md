# Task：升级 2.22.2（U1 from_version）

> **状态**：`done`

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-upgrade-2-22-2` |
| **test_strategy** | `required` |
| **git_branch** | `task/upgrade-harness-2-22-2` |
| **graph_delta** | `none` |
| **graph_delta_note** | pin only |
| **wiki_delta** | `docs/coding_wiki/topics/pin_and_upgrade.md` |
| **wiki_delta_note** | 钉 2.22.2 |
| **experience_capture** | `required` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 30 | 维护者「再次更新」 |
| HG-AUDIT-R1 | approved | 30 | 升级波 |

### 经验总结

1. U1：跨版 `from_version=2.22.1`；同版二次须先 commit（S5）。  
2. Wiki: [`pin_and_upgrade.md`](../../coding_wiki/topics/pin_and_upgrade.md) · [`FEEDBACK_harness_2_22_2_from_web_obs_20260728.md`](../../evidence/FEEDBACK_harness_2_22_2_from_web_obs_20260728.md)
