# 人类终验 Checklist · cyning-harness-web obs-demo epic

| 项 | 值 |
|----|-----|
| **状态** | `ready_for_human` · **请维护者勾选下方 A–D 并签收** |
| **关联 SPEC** | [`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../spec/SPEC-cyning-harness-web-obs-demo_v1.md) |
| **过程闸** | 由 00 代签（[`auth/AUTH_00_human_gate_proxy_v1.md`](./auth/AUTH_00_human_gate_proxy_v1.md)）；**不替代本终验** |
| **Phase F** | 默认不做；若升格须先改签 SPEC |

> **用法**：维护者逐项勾选后签 `accepted` / `rejected` / `accepted_with_followups`。

---

## 00 收口摘要（关账前由 00 填）

| 字段 | 值 |
|------|-----|
| 宣告完成日 | 2026-07-28 |
| 已 CLOSE task 列表 | A0 `web-obs-demo-inform-bootstrap` · A `web-obs-demo-scaffold-vite-shell` · B `web-obs-demo-live-obs-status` · C `web-obs-demo-chain-dogfood` · D `web-obs-demo-hgm-consumer` · E `web-obs-demo-ci-evidence`（均在 `docs/tasks/done/`） |
| 证据包指针 | [`docs/evidence/SUMMARY_obs_demo_20260728.md`](../evidence/SUMMARY_obs_demo_20260728.md) · [`chain_dogfood_20260728.md`](../evidence/chain_dogfood_20260728.md) · [`hgm_consumer_20260728.md`](../evidence/hgm_consumer_20260728.md) · [`ISSUE_DRAFT_…`](../evidence/ISSUE_DRAFT_cyning_harness_obs_demo_feedback_20260728.md) · [`CHECK_00_…`](../evidence/CHECK_00_gate_proxy_basis_20260728.md) |
| 已知残留 / 否决风险 | Phase C dogfood 未演示闸 pending→approved 翻转（00 先代签）；stub/live JSON 键名 `schema` vs `schema_version`（非阻塞草稿）；未做浏览器点选显式 ingest 写盘演示 |
| 建议人类重点抽查 | `pnpm dev` 三路由 + `/obs` live/stub/timeline；CI `quality` 含 harness verify；负向 Vitest；CHECK 台账与 AUTH 代签权 |

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
- [ ] 合入均为 PR squash（抽查 2–3 个 PR · 例 #4/#7/#13/#16）
- [ ] 00 未在本仓提交 Vue/业务实现（抽查：实现 PR 由 30 子 Agent；00 仅 docs/闸/KPI）

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
| 2026-07-28 | A0–E 全部 CLOSE · 状态改为 `ready_for_human` · 填 00 收口摘要 |
