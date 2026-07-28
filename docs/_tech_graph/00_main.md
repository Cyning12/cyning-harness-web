# 顶层流程总图（cyning-harness-web · A0→B）

> **用途**：本仓 Demo 主路径（人类可读简版）。  
> **Phase**：A0 Inform + A 脚手架 + **B live CLI**；后续可迁 YAML-first（见 `99_mermaid_protocol.md`）。  
> **边界**：落盘真值在 `docs/**`；Web 只读投影，不写闸。  
> **graph_delta（Phase B）**：模块边界未变；`obs_api` 主路径改为 Node spawn `status`/`timeline --json`（默认可 `?source=stub` 旁路；默认不 `--ingest`）。

## 主路径一句话

**Agent 落盘**（task / invoke / review / evidence）→ **obs_api 读盘 /（A stub · B+ spawn CLI）** → **Web 只读投影**（`/` · `/obs` · `/docs`）。

```mermaid
flowchart TD
    AGENT[[Agent / 00·30 帽链]]
    DOCS[(harness_docs · evidence)]
    API[[obs_api 薄服务端]]
    CLI[[harness status / timeline]]
    UI[[web_ui 只读页]]
    HOME[>/]
    OBS[>/obs]
    DOCPAGE[>/docs]
    STRUCT[>01_struct.md]

    AGENT --"落盘真值"--> DOCS
    DOCS --"读盘"--> API
    API --"spawn CLI JSON"--> CLI
    CLI --"投影"--> API
    API --"只读 API"--> UI
    UI --"?>"--> HOME
    UI --"?>"--> OBS
    UI --"?>"--> DOCPAGE
    AGENT --"Inform 边界"--> STRUCT

    %% 禁止：UI 写闸；浏览器内 npx；飞行中升格为签收真值
```

## Nodes

| ID | Label |
|----|-------|
| AGENT | Agent / 帽链落盘 |
| DOCS | harness_docs · evidence |
| API | obs_api 薄服务端 |
| CLI | harness status / timeline |
| UI | web_ui 只读页 |
| HOME / OBS / DOCPAGE | 路由 `/` · `/obs` · `/docs` |
| STRUCT | 01_struct 模块表 |

## 非路径（明确不做）

- Web / UI **不写** `HG-*` 闸表  
- 聊天 / transcript **不**作 CLOSE / 签收真值（见消费者本体边界）  
- Phase B：`obs_api` → spawn CLI JSON（仅服务端）；stub 仅为切换旁路；Web **永不**写闸 / 浏览器 npx
## 关联

- 模块表：[`01_struct.md`](./01_struct.md)
- 本体：[`../meta/ONTOLOGY_web_obs_demo_v1.md`](../meta/ONTOLOGY_web_obs_demo_v1.md)
- SPEC：[`../spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../spec/SPEC-cyning-harness-web-obs-demo_v1.md)
