# Issue 草稿 / 无阻塞总表 · cyning-harness 产品回馈（2026-07-28）

> **目标仓**：`cyning-harness`（产品包）  
> **来源仓**：`cyning-harness-web` dogfood（A0–E）  
> **纪律**：本文件仅草稿 / 书面结论；**禁止**在本棒改产品仓源码。  
> **钉版本**：`@cyning/harness@2.17.0`

---

## 总结论：**无阻塞缺陷**

Epic A0→E（Inform → 脚手架 → live obs → 帽链 dogfood → HGM 消费者 → CI+负向+证据）可走通：

- 闸表 / `gate-check` / `verify` / `status` / `timeline` 与 Web 只读投影一致；
- 默认 **不**静默 `--ingest`；禁 Web 写闸；
- CI 可挂 `harness verify`（done 样例）；负向自动化 ≥2 绿。

**未发现挡开工或挡 CI 的产品包错误。** 以下为非阻塞观察，供维护者择期开 issue。

链式证据：

| Phase | 证据 | 结论摘录 |
|-------|------|----------|
| C | [`chain_dogfood_20260728.md`](./chain_dogfood_20260728.md) §5 | 无阻塞；DRAFT-OBS-SCHEMA-KEY 等 |
| D | [`hgm_consumer_20260728.md`](./hgm_consumer_20260728.md) §4 | 无阻塞；WARN/空态可读 |
| E | [`SUMMARY_obs_demo_20260728.md`](./SUMMARY_obs_demo_20260728.md) | CI+负向绿；阻塞产品缺陷 = 0 |

---

## 非阻塞观察（可开 issue · 草稿）

### DRAFT-OBS-SCHEMA-KEY · low

| 字段 | 内容 |
|------|------|
| **标题** | stub `schema` vs CLI live `schema_version` 键名不一致 |
| **复现** | Web stub vs `status --json`；见 C evidence §4 |
| **期望** | 契约键名统一，或文档明示双读 |
| **归属** | 产品契约 **或** 本仓 stub 对齐 |
| **阻塞？** | 否（前端已双读/对照） |

### DRAFT-KPI-SCORE-SOFT · info

| 字段 | 内容 |
|------|------|
| **标题** | KPI 分数未被 CLI 硬校验（仅节存在性） |
| **复现** | SPEC 附录 D.1；close 前靠模板纪律 |
| **期望** | 若要自主 loop 硬挡 CLOSE：增 KPI 最小硬闸（升级列车 G3） |
| **归属** | 产品仓升级列车（非本 Demo 必改） |
| **阻塞？** | 否 |

### DRAFT-GRAPH-DELTA-CLOSE · info

| 字段 | 内容 |
|------|------|
| **标题** | `graph_delta` close 校验偏弱（条件/WARN） |
| **复现** | SPEC 附录 D.2 G1；本仓改码 task 靠编排纪律 |
| **期望** | close 硬闸（升级列车 U1） |
| **归属** | 产品仓 |
| **阻塞？** | 否（本 epic `graph_delta=none` 路径已验证） |

### DRAFT-INVOKE-GAP-WARN-ONLY · info

| 字段 | 内容 |
|------|------|
| **标题** | verify 对缺 40 仅 WARN、不挡 30 |
| **复现** | 任意缺 40 的 in_progress task · `verify` |
| **期望** | 保持现状（编排：00 派 40）或 close 硬挡 |
| **归属** | 编排纪律为主；非缺陷 |
| **阻塞？** | 否 |

---

## 建议维护者动作

1. **无需**为 A–E dogfood 紧急发版；`2.17.0` 可完成消费者闭环 + CI verify。  
2. 若开 issue：优先 DRAFT-OBS-SCHEMA-KEY（契约清晰度）；KPI/graph_delta 跟升级列车。  
3. 本仓 epic 终验见 [`docs/harness/ACCEPTANCE_human_epic_checklist_v1.md`](../harness/ACCEPTANCE_human_epic_checklist_v1.md)（过程闸 ≠ 终验）。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 30 汇总 C/D/E · 无阻塞总表 + issue 草稿 |
