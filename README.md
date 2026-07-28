# cyning-harness-web

> **定位**：Harness **过程可观测**单仓 Demo（dogfood / 教学）。  
> **远程**：`git@github.com:Cyning12/cyning-harness-web.git`  
> **Open Folder**：本目录根（独立 git 仓）。  
> **纪律包**：`@cyning/harness` ≥ **2.17.0**

## 入口（epic 已签收 · 自主统筹）

1. **新窗口**粘贴 **00 自主 loop**：  
   `/Users/cyning/Desktop/Projects/docs/harness/prompts/PROMPT_00_cyning_harness_web_autonomous_loop_v1_zh.md`
2. SPEC 真值（已 `approved`）：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md)
3. 方案参考：工作区 `docs/harness/guides/PLAN_cyning_harness_web_obs_demo_v1_zh.md`
4. 30 仅闸后由 00 派发（Open Folder = 本仓根）

## 原则

1. Agent 落盘 task / invoke / review（真值在 `docs/**`）。  
2. Web 只读：文档 + `status` / `timeline`。  
3. 禁止：浏览器 `npx`；UI 代签；默认不做 LLM 建 task（Phase F）。  
4. 00 **不编码**；合入经 PR + CI；钉 `@cyning/harness@≥2.17.0`。

## 状态

| 项 | 值 |
|---|---|
| SPEC | `approved` · 2026-07-28 · skip_10_spec |
| 下游闸 | **00 代签** |
| 阶段 | A0 → A → B → C → D → E（F 默认不做） |
| 契约 | `obs_status.v1` / `obs_timeline.v1` |
