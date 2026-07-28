# 检查依据 · 00 代签过程人闸（2026-07-28）

| 项 | 值 |
|----|-----|
| **授权真值** | [`docs/harness/auth/AUTH_00_human_gate_proxy_v1.md`](../harness/auth/AUTH_00_human_gate_proxy_v1.md) |
| **epic SPEC** | [`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../spec/SPEC-cyning-harness-web-obs-demo_v1.md) · `approved` |
| **纪律包** | `@cyning/harness@2.17.0` |

> 本文件为**滚动台账**：每条代签一行；证据指针须可打开。

---

## 台账

| 时间（CST） | gate_id | task_slug | 检查动作（命令或读路径） | 结论 | 代签人 |
|-------------|---------|-----------|--------------------------|------|--------|
| 2026-07-28 ~10:50 | HG-TASK-DRAFT | web-obs-demo-inform-bootstrap | 通读 `docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md`：元信息/范围/非范围/验收/failure_paths 齐全；对照 SPEC 附录 A/B A0 | pass → approved | 00 |
| 2026-07-28 ~10:51 | HG-AUDIT-R1 | web-obs-demo-inform-bootstrap | 落盘 `docs/harness/reviews/task_web_obs_demo_inform_bootstrap_audit_R1_20260728.md` · 结论 pass · audit_profile=human_only | pass → approved | 00 |
| 2026-07-28 ~11:05 | （编排复核） | web-obs-demo-inform-bootstrap | `npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_inform_bootstrap_v1.md` → PASS；`status --json` → `may_start_30: true` | 可派 30 | 00 |
| 2026-07-28 ~11:08 | AUTH 升格 | epic | 维护者授权：过程人闸全权代签 + 检查依据强制落盘 + 00 仅派子 Agent + 终验交人 | 见 AUTH 文件 | 维护者→00 |
| 2026-07-28 ~11:09 | （派工） | web-obs-demo-inform-bootstrap | 00 经 Cursor Task 派子 Agent 执行 30；本窗不写 Inform 交付物；Prompt 真值 `PROMPT_30_web_obs_demo_inform_bootstrap.md` | 已派 · 等 PR | 00 |

### 待办（合入 A0 后补）

| 时间 | gate_id | task_slug | 检查动作 | 结论 | 代签人 |
|------|---------|-----------|----------|------|--------|
| （待） | HG-GRAPH-MODULES | web-obs-demo-inform-bootstrap | 验 `docs/_tech_graph/01_struct.md` ≥3 真实模块 + 边界覆盖；PR 已 squash | （待） | 00 |

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 首建台账；录入 A0 双闸 + verify 复核 + AUTH 升格 |
