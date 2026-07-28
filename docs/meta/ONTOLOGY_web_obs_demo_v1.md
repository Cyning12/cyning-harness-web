# Consumer Ontology Slice · cyning-harness-web（v1）

> **用途**：本仓过程可观测 Demo 的 **Inform 语义设定**最小切片。  
> **非用途**：不替代产品包 `DESIGN_ONTOLOGY` / `ontology.yaml`；**不**纳入 `harness ontology-check`。  
> **落盘**：`docs/meta/ONTOLOGY_web_obs_demo_v1.md`  
> **关联图**：[`docs/_tech_graph/01_struct.md`](../_tech_graph/01_struct.md) · [`docs/_tech_graph/00_main.md`](../_tech_graph/00_main.md)

---

## 1. 术语表（3–12 条）

| 术语 | 定义（一句话） | 反例 / 易混 |
| --- | --- | --- |
| 落盘真值 | 已写入仓库且可被闸 / verify / status 引用的文件与状态 | 聊天里的「口头完成」；未改闸表的「过了」 |
| 飞行中 | Agent / IDE 会话内存态或壳私有日志，仅供调度观测 | 把 transcript / wire 当 CLOSE 或签收证据 |
| Web 只读投影 | UI 展示落盘与 CLI JSON；**不**改写闸表或 task 状态 | 在浏览器里点按钮「代签」或写 `HG-*=approved` |
| 过程人闸 | `HG-*` 由人（或授权 00 代签）改 Markdown 闸表 | 用对话「继续」代替改文件 |
| 消费者 Demo | 本仓 dogfood：Agent 落盘 + Web 读盘；非产品包本体源 | 把本仓 ontology 当 `@cyning/harness` 产品真值 |

---

## 2. 核心类 / 关系（3–7）

| 类或关系 | 说明 | 与 `_tech_graph` 指针 |
| --- | --- | --- |
| Task | 可归档工作单元；含闸表与验收 | `docs/tasks/**` · 模块 `harness_docs` |
| InvokeSnapshot | 开帽指令落盘快照 | `docs/harness/invokes/by-task/` |
| ObsProjection | `status` / `timeline` JSON → Web `/obs` | `obs_api` → `web_ui`（`00_main`） |
| EvidencePack | 检查台账 / dogfood 证据 | 模块 `evidence` · `docs/evidence/**` |
| ModuleBoundary | 一级模块行；`HG-GRAPH-MODULES` 人签对象 | `01_struct.md` |

---

## 3. 边界声明

- **落盘真值 vs 飞行中**：签收 / CLOSE / verify 只认磁盘工件（task 闸表、invoke、review、evidence）；Cursor/Claude/Kimi 会话流 **不可**升格为真值。  
- **Web 不写闸**：`web_ui` / 浏览器 **禁止** 修改 `HG-*`、禁止默认在页内 `npx`；写闸仅人（或 AUTH 授权的 00）改 Markdown。  
- **本仓业务语义** 以本文件 + `docs/_tech_graph/` 为准；**纪律包产品本体**（帽子 / 闸 / HGM）见 `@cyning/harness`，勿在此复制全文。  
- 改路由 / API / 模块边界时：更新相关 flow / `01_struct`，并在 task 填 `graph_delta`。

---

## 修订记录

| 日期 | 说明 |
| --- | --- |
| 2026-07-28 | A0 · 自 `ONTOLOGY_consumer_slice_v1.md` 改写为本仓 Demo 切片 |
