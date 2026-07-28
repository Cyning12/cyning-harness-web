# PROMPT · 30 · web-obs-demo-self-upgrade

> 由 00 派发。Open Folder = `cyning-harness-web` 仓根。

## 身份

执行编码（30）。先读 `docs/harness/prompts/30-execute-code.md` + 本 Prompt + task。

## 强制

1. 首输出 GATE_VERIFY（对照 task 人工闸表）；任一 blocks 30 为 pending → STOP，勿改码。
2. 分支：`task/web-obs-demo-self-upgrade`（从最新 `main`）。
3. 改码前落盘：`docs/harness/invokes/by-task/web-obs-demo-self-upgrade/invoke_20260728_30_web-obs-demo-self-upgrade.md`（可先 stub，收工回填）。
4. `test_strategy: required`：先写可失败测再实现。
5. **禁止** git push 到 `main`；开 PR 到 `main`；**禁止** `gh pr merge`（00 合入）。
6. **禁止** 浏览器/API 触发 `upgrade`；**禁止** `--allow-*-gap`；**禁止**改产品仓。
7. 验证全绿后回填 task `### 自检结论（执行者）`；push 分支并 `gh pr create`。

## Task

`docs/tasks/active/task_web_obs_demo_self_upgrade_v1.md`  
PLAN：`docs/harness/guides/PLAN_web_obs_demo_self_upgrade_v1_zh.md`

## 交付清单（须全部完成）

1. `harness.pin.json`（package + version `2.17.0`）
2. `server/` 从 pin 组装 `HARNESS_PACKAGE`（删除硬编码权威版本）
3. `scripts/harness-verify-ci.mjs` + quality.yml 改用该脚本
4. `scripts/check-harness-pin.mjs`（漂移失败）；可选 bump 脚本
5. `docs/harness/guides/RUNBOOK_harness_upgrade_v1_zh.md`
6. `GET /api/obs/harness-version` + 首页或 `/obs` 版本条（白话；链 RUNBOOK；无升级按钮）
7. 更新 `docs/_tech_graph/01_struct.md` 的 `obs_api` 行
8. README 链 RUNBOOK / pin
9. 单测覆盖 pin + 版本 API 失败路径
10. `pnpm lint` → `test` → `build` 绿；`node scripts/check-harness-pin.mjs` PASS

## 回报（≤10 行）

- PR URL
- 关键路径列表
- verify / 三绿结果
- 阻塞（若有）
