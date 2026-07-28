# Invoke · 30 · web-obs-demo-md-ux

| 字段 | 值 |
|------|-----|
| **hat** | `30` |
| **task_slug** | `web-obs-demo-md-ux` |
| **git_branch** | `task/web-obs-demo-md-ux` |
| **started_at** | `2026-07-28` |
| **status** | `done_pending_pr` |

## 开帽核闸

| human_gate_id | task 表 status | 结论 |
|---------------|----------------|------|
| HG-TASK-DRAFT | approved | 通过 |
| HG-AUDIT-R1 | approved | 通过 |
| HG-GRAPH-MODULES | approved | 通过 |

## verify

```text
npx @cyning/harness@2.17.0 verify --target . --task docs/tasks/active/task_web_obs_demo_md_ux_v1.md
→ VERIFY: PASS
WARN: invoke hats gap · 缺 40（close 前须补）
```

## 交付

| 项 | 路径 / 结果 |
|----|-------------|
| MarkdownView | `src/components/MarkdownView.vue` |
| renderMarkdown | `src/lib/renderMarkdown.ts`（marked + DOMPurify） |
| 样例 | `docs/tasks/samples/showcase_getting_started.md` |
| 单测 | `tests/renderMarkdown.test.ts`（标题 + script 消毒） |
| 三绿 | `pnpm lint` → `test` → `build` 绿 |

## 回报

- PR：https://github.com/Cyning12/cyning-harness-web/pull/19
- 组件：`src/components/MarkdownView.vue` · `src/lib/renderMarkdown.ts`
- 样例：`docs/tasks/samples/showcase_getting_started.md`
- verify：PASS · 三绿：lint/test/build 绿
- 阻塞：无（缺 40 invoke，关账前补；**未 merge**）
