# invoke · 40 · web-obs-demo-self-upgrade

| 字段 | 值 |
|------|-----|
| **hat** | `40` |
| **task_slug** | `web-obs-demo-self-upgrade` |
| **date** | `2026-07-28` |
| **与 30** | 同上下文自检（见 `invoke_20260728_30_web-obs-demo-self-upgrade.md`） |

## 自检命令结果

| 命令 | 结果 |
|------|------|
| `pnpm lint` | PASS |
| `pnpm test` | PASS（27） |
| `pnpm build` | PASS |
| `node scripts/check-harness-pin.mjs` | PASS |
| `node scripts/harness-verify-ci.mjs … --graph` | PASS |

结论：与 task `### 自检结论（执行者）` 一致；可交 00 开 PR / 后续 CLOSE（KPI · experience 由 00）。
