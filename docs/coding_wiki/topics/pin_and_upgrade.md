# Pin 与升级

> 薄页：真值在仓根 pin 与 RUNBOOK，不在此重复长文。

## 真值

- Pin：[`harness.pin.json`](../../../harness.pin.json)（当前目标 **2.22.1**）
- 剧本：[`docs/harness/guides/RUNBOOK_harness_upgrade_v1_zh.md`](../../harness/guides/RUNBOOK_harness_upgrade_v1_zh.md)
- 产品 wiki_delta 迁移：产品仓 `docs/RUNBOOK_upgrade_wiki_delta_v1_zh.md`（≥2.19 · `--strict` ≥2.20 · pin 样例 ≥2.21）
- 产品 overlay：RUNBOOK §1.2 / §1.2.1（≥2.22）
- 检查：`node scripts/check-harness-pin.mjs` · `node scripts/bump-harness-pin.mjs <ver>`
- Dogfood：[`FEEDBACK_harness_2_20_0_…`](../../evidence/FEEDBACK_harness_2_20_0_from_web_obs_20260728.md) · [`FEEDBACK_harness_2_22_1_…`](../../evidence/FEEDBACK_harness_2_22_1_from_web_obs_20260728.md)

## 相关

- [[topics/web_obs_demo]] · [[topics/dogfood_feedback]] · [[README]]
