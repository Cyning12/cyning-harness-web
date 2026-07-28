# Harness invoke snapshot · 30 热修 · CI pnpm version 冲突

| 字段 | 值 |
|------|-----|
| hat_id | 30 |
| task_slug | web-obs-demo-scaffold-vite-shell |
| git_branch | task/web-obs-demo-scaffold-vite-shell |
| related_pr | https://github.com/Cyning12/cyning-harness-web/pull/4 |
| created_utc_or_local | 2026-07-28 CST |
| actor | 30 热修 Agent（00 派发 · CI 红） |

## 问题

`quality / lint-and-build`：`pnpm/action-setup@v4` Multiple versions of pnpm specified  
- workflow `version: 10`  
- `package.json` `packageManager: pnpm@10.32.1`

## 修复

`.github/workflows/quality.yml`：删除 `pnpm/action-setup` 的 `with.version`，以 `packageManager` 为单一真值。

## 范围

- 只修 CI；不扩 scope；禁止 merge（等 checks 绿由 00 合入）。
