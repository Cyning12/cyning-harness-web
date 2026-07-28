# FEEDBACK · `@cyning/harness@2.22.1` ← cyning-harness-web

| 项 | 值 |
|----|-----|
| **状态** | `closed` · 本波验收 |
| **日期** | 2026-07-28 |
| **钉** | `2.20.0` → **`2.22.1`**（跳过单独钉 2.21/2.22.0；能力已含） |
| **severity=block** | **无** |

## 执行摘要

| 步骤 | 结果 |
|------|------|
| 合入前置 | PR #34（2.20.0）已 squash → main |
| `upgrade --yes` @2.22.1 | OK · manifest `from 2.20.0` · overlay hint 打印 |
| bump pin | `2.20.0` → `2.22.1` · check-harness-pin PASS |
| `lint-wiki-delta` / `--strict` | PASS · scanned 11 · missing/issues 0 |
| wiki export | schema v1 · nodes 10 · edges 43 · warnings 0 |
| overlay | 无 `cyning-harness-local` 定制；默认 `graph_modules_path→01_struct`；仅 `.cursor/rules/06-harness-pointer.mdc` 小 diff |

## 问题表

| id | 现象 | severity | 建议 |
|----|------|----------|------|
| F-222-01 | 2.22.1 仅文档（§1.2.1）；本仓无 local overlay，**无法 dogfood「先 commit 再 upgrade」脏树序** | info | 有 AGENTS local 块的仓（ops）优先验 RB-ORD；web 可标 n/a |
| F-222-02 | 产品 `lint-wiki-delta.pin.yml.example`（2.21）与本仓已挂 workflow **语义等价**（本仓另含 check-harness-pin） | info | F-220-02 **已缓解**；本仓可保留现 workflow |
| F-222-03 | 从 2.20 一次跳到 2.22.1 可行；`check` 报已是最新 | info | 消费者可跳中间版，只要 pin/manifest 对齐 |

## 经验

1. Wiki: [`docs/coding_wiki/topics/pin_and_upgrade.md`](../coding_wiki/topics/pin_and_upgrade.md)
2. 无定制仓升 2.22.x 摩擦低；有定制须跟产品 RUNBOOK §1.2.1。
