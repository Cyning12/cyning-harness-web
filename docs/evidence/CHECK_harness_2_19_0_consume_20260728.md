# CHECK · `@cyning/harness@2.19.0` 消费者验收（cyning-harness-web）

| 项 | 值 |
|----|-----|
| **日期** | 2026-07-28 |
| **pin** | `2.19.0`（`upgrade --yes` + `bump-harness-pin`） |
| **对照** | FEEDBACK F-218-01 剩余 · F-218-07 · 经验 #9 · BACKFILL open |

## 预期 vs 结果

| 预期（回填） | 结果 | 符合 |
|--------------|------|------|
| `task lint-wiki-delta` 可跑；缺字段 exit 2 | 命令存在；本仓 `scope all` → scanned 10 · missing 0 · **PASS exit 0**；产品单测含 FAIL exit 2 | ✅ |
| verify 缺 wiki_delta 的 WARN 链到该命令 | 产品 `lib/verify.js` 文案含 `扫描: harness task lint-wiki-delta`（本仓已迁完，正向 verify 无 wiki WARN） | ✅ |
| USER_GUIDE §6.0b 以 CLI 取代纯 `rg` | 产品 USER_GUIDE 已写 `task lint-wiki-delta` | ✅ |
| F-218-07 防踩坑措辞 | templates README / USER_GUIDE 已改 | ✅（产品侧只读确认） |
| upgrade ≠ 自动迁 topics/ | ONBOARDING 已明示 | ✅ |
| 本仓 pin/三绿/wiki export 不回归 | check-pin PASS · lint/test/build PASS · export nodes=10 edges=43 warnings=0 · harness-verify-ci PASS | ✅ |

## 结论

**符合预期** · 2.18.x dogfood 剩余 open（含 F-218-01 CLI）在 **2.19.0** 已闭环；本仓可钉 2.19.0。

## 命令摘录

```bash
npx @cyning/harness@2.19.0 task lint-wiki-delta --target . --scope all
# → LINT-WIKI-DELTA: PASS · missing: 0
```
