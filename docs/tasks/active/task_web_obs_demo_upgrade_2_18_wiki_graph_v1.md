# Task：升级 2.18.0 + wiki_delta 迁移 + Wiki Graph + 回填证据

> **状态**：`active`  
> **Phase**：`post-E` · Wave A–D（本 PR 合并交付）  
> **PROMPT**：[`docs/harness/guides/PROMPT_upgrade_2_18_wiki_graph_v1_zh.md`](../../harness/guides/PROMPT_upgrade_2_18_wiki_graph_v1_zh.md)

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-harness-2-18-wiki-graph` |
| **test_strategy** | `required` |
| **test_strategy_note** | wiki-graph API fixture 测；pin check；三绿 |
| **invoke_retention_profile** | `default` |
| **required_invoke_hats** | `10,30,40` |
| **git_branch** | `task/web-harness-2-18-wiki-graph` |
| **graph_delta** | `docs/_tech_graph/01_struct.md` |
| **graph_delta_note** | 增 `/wiki-graph` 与 wiki-graph API；更新 00_main |
| **wiki_delta** | `docs/coding_wiki` |
| **wiki_delta_note** | 新建 coding_wiki 金样 + templates 拷贝 |
| **experience_capture** | `required` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 22-R1, 30 | 维护者 Prompt 授权本波 · 2026-07-28 |
| HG-AUDIT-R1 | approved | 30 | human_only · 见 reviews |
| HG-GRAPH-MODULES | approved | 30 | 沿用 A0；本棒更新模块表行 |

---

## 范围

- [x] Wave A：upgrade 2.18.0 · bump pin · 8 done task 补 wiki_delta · coding_wiki · FEEDBACK
- [x] Wave B：check-pin / lint / test / build / verify-ci / wiki export 全绿
- [x] Wave C：`GET /api/obs/wiki-graph` · `/wiki-graph` d3-force 页 · 导航 · 测
- [x] Wave D：FEEDBACK 定稿 · BACKFILL_DRAFT · checklist 对照

## 非范围

- 改产品仓源码 / npm publish；Obsidian 桌面；UI 代签；默认 `--allow-*-gap`

## 失败路径

| 触发 | 行为 |
|------|------|
| wiki export 失败 | API/页可读错误 |
| pin 漂移 | check-harness-pin 非 0 |
| schema 不匹配 | WIKI_SCHEMA_MISMATCH |

## 验收

- [x] pin=2.18.0 · check PASS
- [x] done 样例 verify 无 wiki_delta WARN
- [x] wiki export nodes≥1
- [x] `/wiki-graph` 可渲染；只读横幅
- [x] FEEDBACK + BACKFILL_DRAFT 落盘

## 验证命令

```bash
node scripts/check-harness-pin.mjs
pnpm lint && pnpm test && pnpm build
node scripts/harness-verify-ci.mjs
npx --yes @cyning/harness@2.18.0 wiki export --json --root docs/coding_wiki
```

---

### 自检结论（执行者）

| 命令 | exit |
|------|------|
| check-harness-pin | 0 |
| pnpm lint/test/build | 0 |
| harness-verify-ci | 0 |
| wiki export | 0 · schema harness.wiki_graph.v1 · nodes 6 |

---

### KPI（00）

| 项 | 值 |
|----|-----|
| **Task_KPI%** | `90` |
| **语义** | pass · 2.18 升级迁移 + Wiki 图 + 回填包 |

---

### 经验总结

1. 存量 task 缺 `wiki_delta` 时 verify 仅 WARN——须主动扫迁（见 FEEDBACK F-218-01）。
2. `n/a` vs `none`：harness-only 无 WikiTrack 用 `n/a`。
3. Wiki: [`docs/coding_wiki/web_obs_demo.md`](../../coding_wiki/web_obs_demo.md) · 证据 [`docs/evidence/FEEDBACK_harness_2_18_0_from_web_obs_20260728.md`](../../evidence/FEEDBACK_harness_2_18_0_from_web_obs_20260728.md) · 回填草稿 [`docs/evidence/BACKFILL_DRAFT_cyning_harness_2_18_from_web_obs.md`](../../evidence/BACKFILL_DRAFT_cyning_harness_2_18_from_web_obs.md)。
4. 建议产品下一版：USER_GUIDE 迁移决策树 + templates 互链样例（2.18.1 docs）。
