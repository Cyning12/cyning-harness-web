# 模块边界登记表（cyning-harness-web · A0）

> **用途**：一级模块边界；**HG-GRAPH-MODULES** approved 后方可 **30 执行改码**（本棒仅 Inform，人签留 pending）。  
> **不是**：全仓 flow 一次画完；flow 按后续 task 增量维护。  
> **Phase**：A0 Inform bootstrap · 先于 Phase A 脚手架。

## 模块表（必填）

| module_id | 名称 | 路径 glob | 依赖方向（仅指向谁） | 负责人/备注 |
|-----------|------|-----------|----------------------|-------------|
| `web_ui` | Web 只读 UI | `src/**` | → `obs_api` | Vite/Vue 页面与路由（`/` · `/obs` · `/docs`）；Phase A 已建 |
| `obs_api` | 薄观测 API | `server/**` | → `harness_docs` · `evidence` | Vite middleware：读盘 md + Phase A stub status/timeline；B+ spawn CLI；**禁止**写闸 |
| `harness_docs` | Harness 落盘真值 | `docs/tasks/**` · `docs/harness/**` · `docs/spec/**` | —（被依赖） | task / invoke / review / auth / ACCEPTANCE；签收真值所在 |
| `evidence` | 证据与台账 | `docs/evidence/**` | —（被依赖） | C–E dogfood / 检查台账；非飞行中日志 |

### 填写规则

1. **module_id**：小写 snake_case；全仓唯一。
2. **路径 glob**：能覆盖该模块源码/文档根；尚未建树的模块以「预期落点」备注。
3. **依赖方向**：只写 **出边**；禁止循环 unless 文档化。
4. **一级模块**：通常 3～12 行；更细粒度放后续 flow / 子 task。

## 跨模块契约（可选）

| 契约 | 提供方 module_id | 消费方 | 说明 |
|------|------------------|--------|------|
| `obs_status.v1` / `obs_timeline.v1` | `obs_api` | `web_ui` | CLI JSON 只读投影；Web 不写闸 |
| 落盘闸表 / invoke / review | `harness_docs` | `obs_api` | 过程真值只认磁盘工件 |

## 人签记录（嵌入后填写）

| human_gate_id | status | 签核人 | 日期 | 说明 |
|---------------|--------|--------|------|------|
| HG-GRAPH-MODULES | approved | 00（代签 · AUTH） | 2026-07-28 | PR #1 squash 合入后验：4 真实一级模块（web_ui/obs_api/harness_docs/evidence）+ 边界覆盖；依据 CHECK 台账 |

## 关联

- 顶层图：[`00_main.md`](./00_main.md)
- 协议 POINTER：[`99_mermaid_protocol.md`](./99_mermaid_protocol.md)
- 消费者本体：[`../meta/ONTOLOGY_web_obs_demo_v1.md`](../meta/ONTOLOGY_web_obs_demo_v1.md)
