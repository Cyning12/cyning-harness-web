# BACKFILL_DRAFT · 回填 `@cyning/harness`（来自 cyning-harness-web · 2.18.x dogfood）

| 项 | 值 |
|----|-----|
| **状态** | `partially_landed` · 2.18.1/2.18.2 已发；**剩余 open 见下** |
| **日期** | 2026-07-28 |
| **真值证据** | [`FEEDBACK_harness_2_18_0_from_web_obs_20260728.md`](./FEEDBACK_harness_2_18_0_from_web_obs_20260728.md) |
| **产品 Open Folder** | `/Users/cyning/Desktop/Projects/cyning-harness`（另开 task/PR） |

> 本文件只列建议 diff 要点；合入须产品仓闸与维护者签收。

## 已落地（勿重复劳动）

| 产品版 | 对应 | 状态 |
|--------|------|------|
| **2.18.1** | USER_GUIDE §6.0b · templates 互链 · ONBOARDING（F-218-01..03 docs / F-218-05） | ✅ |
| **2.18.2** | 两层 `topics/` · USER_GUIDE「目录 vs 图」（F-218-06） | ✅ |
| （刻意不动） | F-218-04 保持 `schema: harness.wiki_graph.v1` 单字符串 | ✅ |

## 剩余 open（仍可回填产品）

| 优先级 | 建议 | FEEDBACK | 建议版号 |
|--------|------|----------|----------|
| **P0** | CLI：`lint`/`list` 缺 `wiki_delta` 的 task（升级后扫迁） | F-218-01 剩余 | **2.19.0** |
| P1 | USER_GUIDE / templates：明示「叙述勿写裸双括号 `[[`…`]]` 字面，否则 export 当边」 | F-218-07 | **2.18.3** docs 或并入 2.19 Notes |
| P2 | ONBOARDING 一句：`upgrade` **不**自动把已有 wiki 迁成 `topics/`；消费者自 `git mv` | 经验 #9 | 同上 docs patch |

## 建议 ISSUE 标题（剩余）

1. `feat(cli): lint/list tasks missing wiki_delta after upgrade`（**主回填**）
2. `docs: wiki export 防踩坑——叙述避免裸 [[wikilink]] 字面`
3. `docs(onboarding): upgrade 不自动迁移 coding_wiki 目录形状`

## 版号建议

- **2.18.3**（可选）：仅 docs 防踩坑（F-218-07 + upgrade≠迁 topics）
- **2.19.0**：CLI lint/list 缺 `wiki_delta`（F-218-01）

## 产品 checklist 勾选结果（本仓对照 · 非产品人签）

| 项 | 本仓结果 | 备注 |
|----|----------|------|
| 知悉破坏性须补 wiki_delta | ✅ | 已迁 8 done task |
| wiki export schema + nodes | ✅ | 2.18.2 后 nodes=10 · edges=43 · warnings=0 |
| Web 消费 | ✅ | `/wiki-graph` + API |
| 两层 topics 约定可执行 | ✅ | F-218-06 dogfood |

失败项→FEEDBACK：**无 block**；open 见上表。
