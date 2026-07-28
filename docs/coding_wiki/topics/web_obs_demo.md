# Web Obs Demo

本仓过程可观测 Demo 的消费者 Wiki 入口。

相关：[[stable]] · [[context]] · [[topics/obs_readonly]] · [[_index]]

## 原则

- Web **只读投影**，不代签闸
- 纪律包版本真值：仓根 `harness.pin.json`（见 [[topics/pin_and_upgrade]]）
- 关系图消费：`npx @cyning/harness wiki export --json --root docs/coding_wiki` → `/wiki-graph`

## 路由

- `/` 首页 · `/obs` 状态 · `/docs` 文档 · `/wiki-graph` Wiki 图

## 真值

- SPEC：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md)
- 图谱：[`docs/_tech_graph/00_main.md`](../../_tech_graph/00_main.md)
