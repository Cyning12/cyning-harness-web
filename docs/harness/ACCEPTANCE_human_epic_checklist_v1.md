# 人类终验 Checklist · cyning-harness-web obs-demo epic

| 项 | 值 |
|----|-----|
| **状态** | `draft` · **仅在 A0–E 全部 CLOSE 且 00 宣告「需求完全完成」后**由人类勾选 |
| **关联 SPEC** | [`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../spec/SPEC-cyning-harness-web-obs-demo_v1.md) |
| **过程闸** | 由 00 代签（[`auth/AUTH_00_human_gate_proxy_v1.md`](./auth/AUTH_00_human_gate_proxy_v1.md)）；**不替代本终验** |
| **Phase F** | 默认不做；若升格须先改签 SPEC |

> **用法**：00 在 epic 收口时把本节状态改为 `ready_for_human`，并填「00 收口摘要」；维护者逐项勾选后签 `accepted` / `rejected`。

---

## 00 收口摘要（关账前由 00 填）

| 字段 | 值 |
|------|-----|
| 宣告完成日 | （待） |
| 已 CLOSE task 列表 | （待） |
| 证据包指针 | `docs/evidence/`（待） |
| 已知残留 / 否决风险 | （待） |
| 建议人类重点抽查 | （待） |

---

## A. Phase A0–B（Demo 基线）

对照 SPEC §4.1：

- [ ] 独立仓：`git rev-parse --show-toplevel` = 本仓根
- [ ] `pnpm install` → `pnpm dev` 可开 `/` · `/obs` · `/docs`
- [ ] `/docs` 可见样例 task 正文
- [ ] `/obs` 有 status 和/或 timeline 投影 + 可重载
- [ ] 页内「只读投影 · 非签收真值」可见
- [ ] CLI 失败 / 无 task 等有可读错误
- [ ] 无浏览器 `npx`；无 Web 写闸 API
- [ ] `pnpm lint` → `pnpm test` → `pnpm build` 关键路径绿
- [ ] Inform：`docs/_tech_graph/01_struct.md` + `docs/meta/ONTOLOGY_web_obs_demo_v1.md` 可读；`HG-GRAPH-MODULES` 已 approved（过程闸由 00 签，人可抽查）

## B. Phase C–E（纪律包 / 篇 3）

对照 SPEC §4.2：

- [ ] C：至少一轮帽链 dogfood 有 invoke/review 或 CLOSE；`/obs` 能反映闸前后变化；缺陷在 `docs/evidence/`
- [ ] D：timeline 消费者路径可演示；Web↔CLI 对照有文档
- [ ] E：CI/脚本可跑 `harness verify`；≥2 负向自动化；证据含可复现命令与可公开计数/耗时
- [ ] 回馈：≥1 份指向 `cyning-harness` 的 issue 草稿，或「无阻塞缺陷」书面结论

## C. 编排与 Git 纪律抽查

- [ ] 过程人闸均有 CHECK 台账指针（`docs/evidence/CHECK_00_gate_proxy_basis_*.md`）
- [ ] 无默认 `--allow-*-gap` 豁免滥用
- [ ] 合入均为 PR squash（抽查 2–3 个 PR）
- [ ] 00 未在本仓提交 Vue/业务实现（抽查 git log / PR author 角色）

## D. 人类签收

| 项 | 值 |
|----|-----|
| 结论 | `pending` · 可选 `accepted` / `rejected` / `accepted_with_followups` |
| 维护者 | |
| 日期 | |
| 备注 / follow-ups | |

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 预置终验单；完成态前保持 draft |
