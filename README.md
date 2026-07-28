# cyning-harness-web

> **定位**：Harness **过程可观测**单仓 Demo（dogfood / 教学）。  
> **远程**：`git@github.com:Cyning12/cyning-harness-web.git`  
> **Open Folder**：本目录根（独立 git 仓；勿挂在父级 Projects 仓下提交业务码）。

## 从 0 怎么开（入口 = 00，不是 30）

1. 新会话粘贴 **00 统筹** 复制区：  
   [`../docs/harness/prompts/PROMPT_00_cyning_harness_web_bootstrap_v1_zh.md`](../docs/harness/prompts/PROMPT_00_cyning_harness_web_bootstrap_v1_zh.md)  
   （绝对路径：`/Users/cyning/Desktop/Projects/docs/harness/prompts/PROMPT_00_cyning_harness_web_bootstrap_v1_zh.md`）
2. 00 先：仓就绪 → **完整需求 SPEC** → 等人签收 → 再拆 task → 再按 Phase 派 30。
3. 方案参考（非 SPEC）：[`../docs/harness/guides/PLAN_cyning_harness_web_obs_demo_v1_zh.md`](../docs/harness/guides/PLAN_cyning_harness_web_obs_demo_v1_zh.md)
4. 30 仅闸后：[`../docs/harness/prompts/PROMPT_30_cyning_harness_web_bootstrap_v1_zh.md`](../docs/harness/prompts/PROMPT_30_cyning_harness_web_bootstrap_v1_zh.md)

## 初版原则

1. **本地 Agent 落盘** task / invoke / review（真值在 `docs/**`）。  
2. **Web 只读**：看最新文档 + `status` / `timeline` 投影。  
3. **禁止**：浏览器 `npx`；UI 代签闸表；初版不做 LLM 自动建 task。

## 需求 SPEC（签收真值候选）

- 路径：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md)
- 状态：`draft` · **待维护者 Sign-off**（未 `approved` 前不拆正式 task、不派 30）

## 状态

| 项 | 值 |
|---|---|
| 远程 | `Cyning12/cyning-harness-web`（当前可为空仓） |
| 入口 | **00 · SPEC 先行** |
| SPEC | `docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`（draft） |
| 脚手架 | 待 SPEC/task/闸后由 30 执行 |
| 参考 UI | Ops Desk `ops-desk-web` `/obs`（fixture） |
| 契约 | `@cyning/harness` ≥ 2.16 · `obs_status.v1` / `obs_timeline.v1` |
