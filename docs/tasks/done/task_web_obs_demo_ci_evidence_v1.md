# Task：Phase E · CI harness verify + 负向边界 + 证据包

> **状态**：`done`  
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
| **wiki_delta** | `n/a` |
| **wiki_delta_note** | harness-only · 无 WikiTrack（升级 2.18 存量迁移） |
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

- [x] GitHub Actions（或扩展 quality）：对仓根跑 `npx @cyning/harness@2.17.0 verify`（指定 active/done 样例 task 路径策略写清）
- [x] ≥2 负向自动化：例如无 task / CLI 失败投影 / 禁写闸（可扩现有 Vitest）
- [x] `docs/evidence/SUMMARY_obs_demo_20260728.md`：复现命令 + 小样本计数/耗时区间（脱敏）
- [x] 产品反馈：`docs/evidence/ISSUE_DRAFT_cyning_harness_*.md` 或「无阻塞」总表
- [x] README POINTER；PR + quality（含新步骤）绿

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

- [x] CI 或脚本可跑 harness verify 且文档可复现
- [x] ≥2 负向自动化绿
- [x] SUMMARY 证据包存在且可公开
- [x] 产品 issue 草稿或无阻塞书面结论
- [x] invoke 10+30+40；KPI+经验已齐（Task_KPI%=92）

---

### 自检结论（执行者）

| 命令 / 核对 | cwd | 退出码 / 结果 |
|-------------|-----|----------------|
| 读 `quality.yml` Harness verify 步 | 仓根 | pass · 钉 2.17.0 · done/hgm 样例 · 禁 allow-*-gap |
| `npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/done/task_web_obs_demo_hgm_consumer_v1.md` | 仓根 | 0 · VERIFY PASS |
| `npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_ci_evidence_v1.md` | 仓根 | 0 · VERIFY PASS（落盘 40 前 WARN 缺 40；补齐后预期无 gap） |
| 负向 Vitest（标题含「负向」） | `tests/obsHandlers.test.ts` | pass · 5 条（NO_TASK×2 / CLI_SPAWN_FAILED / CLI_NONZERO / WRITE_GATE_FORBIDDEN）· suite 18/18 |
| 读 `SUMMARY_obs_demo_20260728.md` | 仓根 | pass · 复现命令 + 计数/耗时 · 无密钥/绝对机径 |
| 读 `ISSUE_DRAFT_cyning_harness_obs_demo_feedback_20260728.md` | 仓根 | pass · 总结论无阻塞；非阻塞草稿 4 条 |
| README「CI · harness verify（Phase E+）」 | README.md | pass |
| `pnpm lint` / `pnpm test` / `pnpm build` | 仓根 | 0 / 18 passed / build ok |
| PR #16 | — | MERGED squash · `714906c` · https://github.com/Cyning12/cyning-harness-web/pull/16 · quality 绿 |
| invoke 10/30/40 | `docs/harness/invokes/by-task/web-obs-demo-ci-evidence/` | pass · 本 close 补齐 40 |
| CHECK_00 PR#16 合入行 | `docs/evidence/CHECK_00_gate_proxy_basis_20260728.md` | pass · 纳入 close PR |
| 产品仓改动？ | — | 否 |
| **40 结论** | — | **pass** · 可关账预备；KPI / `task close` 交 00 |

已知未测：未在本机重跑 GitHub Actions runner；以 #16 / main push quality 绿 + 本地同款命令为准。

### KPI（00）

| 项 | 值 |
|----|-----|
| **kpi_rubric** | `KPI_RUBRIC_v1_3` |
| **kpi_aggregator** | `CLOSE` |
| **Task_KPI%** | `92` |
| **语义状态** | `pass` · Phase E / epic A0–E 收口棒 |

| 大维 | 档位 | 说明 |
|------|------|------|
| D1 交付 | pass | CI verify、负向≥2、SUMMARY、ISSUE_DRAFT、invoke10·30·40 |
| D2 判断 | pass | CI 用 done 金样；证据/反馈分文件；无假豁免 |
| D3 上下文 | pass | SPEC §4.2 E / Q5 |
| D4 合规 | pass | PR squash；无 allow-*-gap；未改产品仓 |
| D5 结果 | pass | #16/#17 quality（含 harness verify）绿 |

**judgment_notes**：无大维 fail。Epic 过程闭环完成；人类终验另单。

---

### 经验总结

1. **CI verify 用 done 样例**：active 易缺 40（仅 WARN）或漂移；`quality.yml` 钉 CLOSED 样例（本仓 hgm-consumer）才稳作金样。
2. **负向标题可点名**：Vitest 用例名带「负向」便于 SUMMARY/验收计数；本棒 5 条覆盖无 task / spawn / 非 0 / 写闸。
3. **证据包与产品反馈拆文件**：SUMMARY 放复现与计数；ISSUE_DRAFT 放无阻塞总表 + 非阻塞草稿，避免混写密钥风险与产品建议。
4. **关账预备与合入台账同 PR**：CHECK_00 的 PR#16 合入行与 40 invoke / CLOSE 摘要一并进 close 分支，减少 00 二次扫。
5. **终验交人**：过程闸由 00 代签不等于 epic 人类终验；`ACCEPTANCE_human_epic_checklist_v1.md` 须 `ready_for_human` 后由维护者勾选。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 起草 Phase E · 代签三闸 |
| 2026-07-28 | 30 执行：CI verify · 负向 · SUMMARY · issue 草稿 · PR |
| 2026-07-28 | 40 自检 / 关账预备：补齐 invoke 40 · 经验 · CLOSE 摘要 |
| 2026-07-28 | 00 KPI Task_KPI%=92 · status=done · 准备 merge #17 + close · 交人类终验 |
