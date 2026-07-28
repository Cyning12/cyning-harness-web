# BACKFILL_DRAFT · `@cyning/harness` ← web · 2.20.0 dogfood

| 项 | 值 |
|----|-----|
| **状态** | `open` · 仅 docs/ci 建议 |
| **日期** | 2026-07-28 |
| **证据** | [`FEEDBACK_harness_2_20_0_from_web_obs_20260728.md`](./FEEDBACK_harness_2_20_0_from_web_obs_20260728.md) |
| **产品 Open Folder** | `/Users/cyning/Desktop/Projects/cyning-harness` |

## 剩余 open

| 优先级 | 建议 | FEEDBACK | 建议版号 |
|--------|------|----------|----------|
| P0 | RUNBOOK §1：有 pin/单源版本文件时同步 bump；无则跳过 | F-220-01 | **2.20.1** docs |
| P0 | RUNBOOK §5 + ci/samples/README：可复制的样例获取命令（GitHub raw / npm pack） | F-220-03 | **2.20.1** |
| P1 | CI 样例注释「读 pin」片段或 `*.pin.yml.example` | F-220-02 | **2.20.1** |
| P2 | wiki 迁移 RUNBOOK 升级命令钉 `@<目标版>` | F-220-04 | 2.20.1 / 2.21 Notes |
| — | `--strict` 行为与 §0 | F-220-05 | **无需改**（正反馈） |

## 非范围（本回填）

- 改 lint-wiki-delta CLI 语义  
- export 伪链过滤（可另 info）  
- 削弱 close / 默认 allow-wiki-gap  
