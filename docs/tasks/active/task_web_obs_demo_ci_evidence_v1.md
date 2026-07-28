# Task：Phase E · CI harness verify + 负向边界 + 证据包

> **状态**：`in_progress`  
> **Phase**：`E`（依赖 Phase D CLOSED · epic v1 收口棒）  
> **关联 SPEC**：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md) §2.6 / §4.2 / 附录 A Phase E  
> **前置**：[`docs/tasks/done/task_web_obs_demo_hgm_consumer_v1.md`](../done/task_web_obs_demo_hgm_consumer_v1.md)  
> **落盘**：`docs/tasks/active/task_web_obs_demo_ci_evidence_v1.md`

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **task_slug** | `web-obs-demo-ci-evidence` |
| **test_strategy** | `required` |
| **test_strategy_note** | CI 挂 harness verify；≥2 负向自动化（无 CLI / 无 task / 禁写闸等）；证据 SUMMARY 可公开 |
| **code_quality_bar** | `recommended` |
| **orchestration** | `00 自主 loop · 单 30` |
| **semi_auto** | `false` |
| **audit_profile** | `human_only` |
| **invoke_retention_profile** | `default` |
| **required_invoke_hats** | `10,30,40` |
| **git_branch** | `task/web-obs-demo-ci-evidence` |
| **graph_delta** | `none` |
| **graph_delta_note** | CI/测/证据文档为主；不改模块边界则 none |
| **experience_capture** | `required` |
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |

### 人工闸

| human_gate_id | status | blocks_hats | 说明 |
|---------------|--------|-------------|------|
| HG-TASK-DRAFT | approved | 22-R1, 30 | 00 代签 |
| HG-AUDIT-R1 | approved | 30 | 00 代签 · human_only |
| HG-GRAPH-MODULES | approved | 30 | 沿用 |

---

## 背景与目标

Epic v1 收口：CI/脚本可跑 `harness verify`；至少 2 个负向自动化；`docs/evidence/SUMMARY_*` 含可复现命令与可公开计数/耗时；产品 issue 草稿或无阻塞结论（可复用 C/D 证据链）。

完成本棒后 **00** 将 `ACCEPTANCE_human_epic_checklist_v1.md` 标为 `ready_for_human` 交维护者终验（过程闸 ≠ 终验）。

---

## 范围

- [ ] GitHub Actions（或扩展 quality）：对仓根跑 `npx @cyning/harness@2.17.0 verify`（指定 active/done 样例 task 路径策略写清）
- [ ] ≥2 负向自动化：例如无 task / CLI 失败投影 / 禁写闸（可扩现有 Vitest）
- [ ] `docs/evidence/SUMMARY_obs_demo_20260728.md`：复现命令 + 小样本计数/耗时区间（脱敏）
- [ ] 产品反馈：`docs/evidence/ISSUE_DRAFT_cyning_harness_*.md` 或「无阻塞」总表
- [ ] README POINTER；PR + quality（含新步骤）绿

## 非范围

- Phase F LLM；改产品仓源码实现；默认 allow-*-gap；直推 main

---

## 失败路径

| 触发条件 | 系统行为 | 可重试 | 用户可见 |
|----------|----------|--------|----------|
| CI verify 失败 | PR 红；不得合入 | 是 | Actions 日志 |
| 负向测不足 2 | 打回 | 是 | 验收未过 |
| SUMMARY 含密钥/绝对机径 | 脱敏后重提 | 是 | 公开纪律 |

---

## 验收标准

- [ ] CI 或脚本可跑 harness verify 且文档可复现
- [ ] ≥2 负向自动化绿
- [ ] SUMMARY 证据包存在且可公开
- [ ] 产品 issue 草稿或无阻塞书面结论
- [ ] invoke 10+30+40；KPI+经验关账前填齐

---

### 自检结论（执行者）
（待）

### KPI（00）
（待）

### 经验总结
（待）

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 Phase E · 代签三闸 |
