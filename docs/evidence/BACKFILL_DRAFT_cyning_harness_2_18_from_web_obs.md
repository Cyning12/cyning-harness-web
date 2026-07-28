# BACKFILL_DRAFT · 回填 `@cyning/harness`（来自 cyning-harness-web · 2.18.0 dogfood）

| 项 | 值 |
|----|-----|
| **状态** | `draft` · **≠ 已合入产品** |
| **日期** | 2026-07-28 |
| **真值证据** | [`FEEDBACK_harness_2_18_0_from_web_obs_20260728.md`](./FEEDBACK_harness_2_18_0_from_web_obs_20260728.md) |
| **产品 Open Folder** | `/Users/cyning/Desktop/Projects/cyning-harness`（另开 task/PR） |

> 本文件只列建议 diff 要点；合入须产品仓闸与维护者签收。

## 建议文件改动

| 产品路径 | 建议要点 | 对应 FEEDBACK |
|----------|----------|---------------|
| `docs/USER_GUIDE_v1.0_zh.md` | 增「升级后 wiki_delta 迁移」：`n/a` vs `none` vs path 决策树；存量扫缺字段 | F-218-01 · F-218-02 |
| `docs/ONBOARDING.md` / `CHANGELOG.md` | Notes：upgrade **不**代写业务 task 元信息；破坏性清单链到迁移节 | F-218-03 |
| `coding_wiki/templates/*.md` | stable/context 加 2～3 条 `[[wikilink]]` 互链样例 | F-218-05 |
| （可选）`lib/` lint | `harness lint tasks --wiki-delta` 或 verify 附带「缺字段文件列表」 | F-218-01 |
| `docs/CHECKLIST_acceptance_2.18.0_wiki_feedback_v1_zh.md` | 人签时对照本仓 FEEDBACK 勾选；失败项写 FEEDBACK id | Wave D |

## 建议 ISSUE 标题

1. `docs: wiki_delta 存量迁移决策树（n/a vs none）`
2. `chore(templates): coding_wiki 样例互链，避免 export 空边`
3. （可选）`feat(cli): lint/list tasks missing wiki_delta after upgrade`

## 版号建议

- **2.18.1**：仅 docs + templates → 优先  
- **2.19.0**：若做 CLI lint 新能力

## 产品 checklist 勾选结果（本仓对照 · 非产品人签）

对照 `cyning-harness/docs/CHECKLIST_acceptance_2.18.0_wiki_feedback_v1_zh.md`：

| 项 | 本仓结果 | 备注 |
|----|----------|------|
| 知悉破坏性须补 wiki_delta | ✅ | 已迁 8 done task |
| 缺字段 close BLOCK | ✅（产品语义） | 本仓用 verify WARN→迁后消失 |
| n/a + note 可过 | ✅ | 本仓默认 |
| wiki export schema + nodes | ✅ | nodes=6 edges=6 |
| Web 消费 | ✅ | `/wiki-graph` + API |

失败项→FEEDBACK：**无 block**；warn/info 见 F-218-01..05。
