# BACKFILL_DRAFT · 回填 `@cyning/harness`（来自 cyning-harness-web · 2.18.x→2.19 dogfood）

| 项 | 值 |
|----|-----|
| **状态** | `landed` · 2.18.1 / 2.18.2 / **2.19.0** 已发且本仓验收通过 |
| **日期** | 2026-07-28 |
| **真值证据** | [`FEEDBACK_harness_2_18_0_from_web_obs_20260728.md`](./FEEDBACK_harness_2_18_0_from_web_obs_20260728.md) · [`CHECK_harness_2_19_0_consume_20260728.md`](./CHECK_harness_2_19_0_consume_20260728.md) |
| **产品 Open Folder** | `/Users/cyning/Desktop/Projects/cyning-harness` |

> 历史建议 diff；**剩余 open 已空**。

## 已落地

| 产品版 | 对应 | 状态 |
|--------|------|------|
| **2.18.1** | USER_GUIDE §6.0b · templates 互链 · ONBOARDING | ✅ |
| **2.18.2** | 两层 `topics/` ·「目录 vs 图」 | ✅ |
| **2.19.0** | `task lint-wiki-delta`（F-218-01）· verify WARN 链 · F-218-07 防踩坑 · upgrade≠迁 topics | ✅ 本仓 CHECK |
| （刻意不动） | F-218-04 schema 单字符串 | ✅ |

## 剩余 open

（无）

## 本仓 2.19.0 验收摘要

| 项 | 结果 |
|----|------|
| `lint-wiki-delta --scope all` | PASS · missing 0 / scanned 10 |
| pin / 三绿 / wiki export / verify-ci | PASS |
| 产品 CLI 负向（exit 2） | 产品 `test/task-lint-wiki-delta.test.js` 6/6 pass（只读对照） |
