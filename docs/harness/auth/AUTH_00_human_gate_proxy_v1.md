# 授权 · 00 窗口代签过程人闸（本仓 · epic 有效）

| 项 | 值 |
|----|-----|
| **状态** | `active` |
| **生效日** | 2026-07-28 |
| **授权人** | 维护者（本对话显式授权 · Cyning12 会话） |
| **被授权方** | **当前 00 统筹窗口**（cyning-harness-web · epic `cyning-harness-web-obs-demo`） |
| **检查依据落盘** | [`docs/evidence/CHECK_00_gate_proxy_basis_20260728.md`](../../evidence/CHECK_00_gate_proxy_basis_20260728.md) |
| **人类终验** | [`docs/harness/ACCEPTANCE_human_epic_checklist_v1.md`](../ACCEPTANCE_human_epic_checklist_v1.md)（**仅 epic 全完成后**交人勾选） |

---

## 1. 授权范围

在本 epic（SPEC `approved` · Phase A0–E；F 默认不做）内，**00 统筹窗口**可代签下列**过程人闸**（改 Markdown 闸表 `pending`→`approved`）：

| 闸类 | 示例 gate_id | 说明 |
|------|--------------|------|
| Task 起草 / 审核 | `HG-TASK-DRAFT` · `HG-AUDIT-R1` | 含 `audit_profile=human_only` 时 00 代行 R1 书面审落盘 |
| 图谱模块 | `HG-GRAPH-MODULES` | 须有检查依据（模块表非空、边界覆盖）；见 §3 |
| 下游 task 过程闸 | 各 task 闸表中 `HG-*` | 聊天「继续」≠ 闸；**须改文件** |
| 关账编排闸 | task CLOSE 前所需过程闸 | 不替代人类对 **epic 终验** 的签字 |

**不在本授权内**：

- 改写已签 epic SPEC 正文结论（升格 Phase F 等须维护者改签 SPEC）
- Web UI / 任何 API **写闸**
- 代签 **人类终验 checklist**（见 `ACCEPTANCE_human_epic_checklist_v1.md`）
- 修改 `cyning-harness` 产品仓源码

---

## 2. 编排纪律（本授权同时确认）

1. **00 不执行改码 / Inform 落盘实现**：派 **子 Agent（Task / 新窗口 30）**；本窗口仅拆 task、落盘 invoke、代签闸、verify 编排、`gh` 合入、关账 KPI。
2. **开帽先落盘 invoke**；禁止默认 `--allow-*-gap`。
3. **合入**：PR + squash；禁直推 `main`。
4. **每次代签**须在 [`CHECK_00_gate_proxy_basis_*.md`](../../evidence/CHECK_00_gate_proxy_basis_20260728.md)（或同目录增量条）留下**检查依据**指针。

---

## 3. 代签最低检查依据（强制）

| 闸 | 最低依据（须可复验） |
|----|----------------------|
| `HG-TASK-DRAFT` | task 存在；范围/非范围/验收/failure_paths/元信息齐全；对照 SPEC 附录 |
| `HG-AUDIT-R1` | `docs/harness/reviews/*_audit_R*.md` 结论 pass 或 human_only 代行记录 |
| `HG-GRAPH-MODULES` | `docs/_tech_graph/01_struct.md` ≥3 真实一级模块 + 边界覆盖说明 |
| 其他 `HG-*` | task 正文或 review 写明检查命令/路径；00 跑过或引用子 Agent 证据 |

维护者可随时抽查否决；否决后 00 须把对应闸改回 `pending` 并记证据。

---

## 4. 签收记录

| 日期 | 动作 | 证据 |
|------|------|------|
| 2026-07-28 | 维护者对话授权：00 可签收**所有过程人闸**；须检查依据落盘；00 派子 Agent 不自执行；完成后人类终验 checklist | 本文件 + CHECK_00… + ACCEPTANCE… |

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 首稿 · 对齐用户三点授权 |
