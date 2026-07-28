# FEEDBACK · `@cyning/harness@2.22.2` ← cyning-harness-web

| 项 | 值 |
|----|-----|
| **状态** | `closed` |
| **日期** | 2026-07-28 |
| **钉** | `2.22.1` → **`2.22.2`** |
| **severity=block** | **无** |

## 执行摘要

| 步骤 | 结果 |
|------|------|
| `upgrade @2.22.2`（跨版） | OK · `from_version`=**`2.22.1`**（正确） |
| bump pin + check-harness-pin | PASS |
| 同版二次 `upgrade`（未 commit） | **S5 拒 apply**（工作区有 pin/manifest 脏）· 符合既有闸 |
| 同版二次 `upgrade`（commit 后） | 见下 · 验 U1：`from_version` **仍为** `2.22.1` |
| lint 默认 / `--strict` | PASS |
| wiki export | OK · warnings 0 |

## 问题表

| id | 现象 | severity | 建议 |
|----|------|----------|------|
| F-2222-01 | U1 修复可验证：跨版后 `from_version` 为上一钉；同版二次 upgrade（干净树）后仍保留历史串、不为 null | info | **正反馈** · 产品测已覆盖；web 对照通过 |
| F-2222-02 | 本仓习惯「upgrade → 立即 bump pin（未 commit）」时，同版二次 upgrade 会被 **S5** 挡住，无法在同工作区一次跑完「升完再二次 upgrade」剧本 | info | RUNBOOK 注明：验 U1 前须先 commit pin/manifest，或 stash 后再二次 upgrade |

## 经验

Wiki: [`docs/coding_wiki/topics/pin_and_upgrade.md`](../coding_wiki/topics/pin_and_upgrade.md)
