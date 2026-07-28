# invoke · 30 · web-obs-demo-self-upgrade

| 字段 | 值 |
|------|-----|
| **hat** | `30`（含 40 自检同上下文） |
| **task_slug** | `web-obs-demo-self-upgrade` |
| **date** | `2026-07-28` |
| **git_branch** | `task/web-obs-demo-self-upgrade` |
| **worktree_root** | 本仓根 |

## 人工闸扫描（GATE_VERIFY · 首输出）

| human_gate_id | task表status | 用户/invoke声称 | 一致？ | blocks_30 | 30可开工？ |
|---------------|--------------|-----------------|--------|-----------|------------|
| HG-TASK-DRAFT | approved | approved（00 代签） | Y | Y | Y |
| HG-AUDIT-R1 | approved | approved（00 代签） | Y | Y | Y |
| HG-GRAPH-MODULES | approved | approved（沿用 A0） | Y | Y | Y |

reviews：`docs/harness/reviews/task_web_obs_demo_self_upgrade_audit_R1_20260728.md` 存在 · 是  
pre-30 invoke：`invoke_20260728_00_*` · `invoke_20260728_10_*` 齐全 · 是  

结论：**可进入读码/改码**

## 交付摘要

- `harness.pin.json` · `server/harnessPin.ts` · CLI 从 pin 组装
- `scripts/harness-verify-ci.mjs` · `check-harness-pin.mjs` · `bump-harness-pin.mjs`
- `quality.yml` 改跑 pin 脚本 + check
- `GET /api/obs/harness-version` · 首页「纪律包版本」条 · RUNBOOK
- 单测：`tests/harnessPin.test.ts`（含负向）
- 编排文档（00 落盘）一并纳入本 PR

## 自检

见 task `### 自检结论（执行者）`：lint / test / build / check-pin / verify --graph 均 PASS。  
未 `gh pr merge`；未改产品仓；未浏览器触发 upgrade。
