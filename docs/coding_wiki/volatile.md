# coding_wiki · volatile

> **层**：volatile · **本 task 专属**；由 task「给执行帽必读」或 invoke §3 引用

## 相关页

- 稳定层：[[stable]]
- 项目层：[[context]]
- 本波主题：[[topics/pin_and_upgrade]] · [[topics/dogfood_feedback]]

## 用法

1. 每个 active task 在正文或 invoke 中 pointer 到本文件或 task 内小节  
2. Epic 子 task 可共用 Epic 级 volatile 片段  
3. 关账后归档或清空，避免 stale 上下文  

## 本 task

- task_slug：`web-obs-demo-upgrade-2-18-2-wiki-topics`
- 必读：[[README]] · [[_index]] · RUNBOOK
- `code_quality_bar`：`recommended`
- 目标：pin **2.18.2** · `topics/` 两层迁完 · export / 三绿

## 关账后

- 可复用条目 → 晋升 [[context]] / [[stable]]  
- 本文件清空或归档，避免下一 task 读到 stale volatile  
