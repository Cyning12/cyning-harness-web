# Task：升级 2.18.2 + coding_wiki 两层 topics 迁移

> **状态**：`done`  
> **Phase**：post-E · dogfood 2.18.2 目录约定  
> **CLOSE**：[`docs/harness/reviews/task_web_obs_demo_upgrade_2_18_2_wiki_topics_CLOSE_20260728.md`](../../harness/reviews/task_web_obs_demo_upgrade_2_18_2_wiki_topics_CLOSE_20260728.md)

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-upgrade-2-18-2-wiki-topics` |
| **test_strategy** | `required` |
| **test_strategy_note** | check-pin · 三绿 · wiki export nodes/edges |
| **invoke_retention_profile** | `default` |
| **required_invoke_hats** | `30,40` |
| **git_branch** | `task/web-harness-2-18-2-wiki-topics` |
| **graph_delta** | `none` |
| **graph_delta_note** | 仅 wiki 目录重组；路由/API 不变 |
| **wiki_delta** | `docs/coding_wiki` |
| **wiki_delta_note** | 两层 topics/ · _index · 薄页指针 SPEC/图谱/RUNBOOK/FEEDBACK |
| **experience_capture** | `required` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 30 | 维护者「开始」授权 · 2026-07-28 |
| HG-AUDIT-R1 | approved | 30 | 文档/目录迁移 · CHECK 台账 |

---

## 范围

- [x] `upgrade --yes` @2.18.2 · bump `harness.pin.json`
- [x] `docs/coding_wiki` 迁两层：`topics/` + `_index` + README 约定
- [x] 主题薄页指针现有 SPEC / 图谱 / RUNBOOK / FEEDBACK
- [x] check-pin · lint · test · build · wiki export（nodes=10 · edges=43）
- [x] FEEDBACK F-218-06/07 · BACKFILL 剩余 open
- [x] PR → `main`（#31）

## 非范围

- 改产品仓；CLI lint（2.19）；UI 代签；直推 main

## 验收标准

- [x] pin = `2.18.2` · `check-harness-pin` PASS
- [x] 根无主题长文；主题在 `topics/`
- [x] `wiki export` schema `harness.wiki_graph.v1` · nodes=10 · edges=43
- [x] PR → `main`

### 自检结论（执行者）

| 命令 | exit |
|------|------|
| check-harness-pin | 0 |
| pnpm lint/test/build | 0 |
| harness-verify-ci | 0 |
| wiki export @2.18.2 | 0 · nodes 10 · edges 43 · warnings 0 |

### KPI（00）

| 项 | 值 |
|----|-----|
| **Task_KPI%** | `92` |
| **语义** | pass · pin 2.18.2 + topics 两层 + dogfood 回填清单 |

### 经验总结

1. 产品 2.18.2 目录约定可直接 dogfood：根三件套 + `topics/` 薄页即可。
2. README 正文勿写裸双括号字面——会被 export 当边解析（F-218-07）。
3. `upgrade` 不自动迁目录形状；与 pin bump 同 PR 手迁即可。
4. Wiki: [`docs/coding_wiki/`](../../coding_wiki/) · [`topics/web_obs_demo.md`](../../coding_wiki/topics/web_obs_demo.md) · FEEDBACK F-218-06/07 · BACKFILL 剩余 → 产品 **2.19 CLI lint**（主）+ 可选 docs 防踩坑。

## 验证命令

```bash
node scripts/check-harness-pin.mjs
pnpm lint && pnpm test && pnpm build
npx --yes @cyning/harness@2.18.2 wiki export --json --root docs/coding_wiki
node scripts/harness-verify-ci.mjs
```
