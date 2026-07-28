# 证据 · Markdown 相对链接兼容（2026-07-28）

| 项 | 值 |
|----|-----|
| **结论** | `pass` · 维护者验收通过 · 已合入 |
| **PR** | https://github.com/Cyning12/cyning-harness-web/pull/26 · squash · `f6703cf` |
| **范围** | 热修：正文相对 `.md` 链接按本地文件语义 → `/docs?path=`；读盘 `docs/**` |

## 验收要点

- 相对路径相对**当前文档目录**解析（与 IDE / Git 预览一致）
- `docs/spec`、`docs/_tech_graph` 等互链可打开
- 仓外 / 非 `.md` 不瞎跳；外链新标签
- `pnpm lint` / `test` / `build` + CI quality 绿

## 非范围（残留）

- 图片等非 md 资源；仓根 `README.md` 等 docs 外文件（未做 GitHub 降级）
