# FEEDBACK · `@cyning/harness@2.18.0` ← cyning-harness-web dogfood

| 项 | 值 |
|----|-----|
| **状态** | `active` · Wave A+ 滚动追加 |
| **日期** | 2026-07-28 |
| **消费者仓** | `cyning-harness-web` |
| **钉版本目标** | 起钉 `2.18.0` → 现跟进 **`2.18.2`**（本波 pin bump） |
| **产品验收对照** | `cyning-harness/docs/CHECKLIST_acceptance_2.18.0_wiki_feedback_v1_zh.md` |

> 边做边记。每条：现象 · 复现命令 · 期望 · 严重度（block/warn/info）· 建议落点（CLI/docs/SPEC/闸）。

---

## 1) 问题表

| id | 现象 | 复现 | 期望 | severity | 建议产品落点 |
|----|------|------|------|----------|--------------|
| F-218-01 | 存量 done task 无 `wiki_delta`；`verify --task` 仅 WARN，文案写 close 将 BLOCK——易漏迁 | `npx @cyning/harness@2.18.0 verify --target . --task docs/tasks/done/task_web_obs_demo_hgm_consumer_v1.md`（迁移前） | 升级后扫缺 wiki_delta 的 lint/清单 | warn | CLI lint 或 USER_GUIDE 升级迁移专节 |
| F-218-02 | `n/a` vs `none` 难选 | 人工填 8 个 done task | USER_GUIDE 决策树：无 WikiTrack→n/a；有轨未改→none；改了→path | info | docs/USER_GUIDE |
| F-218-03 | `upgrade --yes` 不同步业务 task 元信息（预期） | `npx @cyning/harness@2.18.0 upgrade --yes` | CHANGELOG Notes 明示破坏性迁移不代写 | info | CHANGELOG · ONBOARDING |

---

## 2) 经验 / 改进建议

1. 批量迁移可在 `graph_delta_note` 后插两行；产品可提供 migrate 示例脚本。
2. CI 走 pin 后，考古 invoke 里的 `@2.17.0` 字面可保留；优先改最低依赖与 RUNBOOK/SPEC。
3. Wave C 前先 `wiki export --json --root docs/coding_wiki` 确认 schema，再绑 Web API。

---

## 3) 建议下一动作

（Wave D 填写）

---

## 迁移缺口表（Wave A · 2026-07-28）

| 文件 | 迁移前 | 迁移后 |
|------|--------|--------|
| `docs/tasks/done/task_web_obs_demo_*.md`（8） | 缺 wiki_delta | `n/a` + note harness-only |

摩擦：**有**（F-218-01/02）· 非零。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | Wave A 建骨架；upgrade+pin；8 task 迁移；F-218-01..03 |

---

## Wave C 消费侧（追加）

| id | 现象 | 复现 | 期望 | severity | 建议产品落点 |
|----|------|------|------|----------|--------------|
| F-218-04 | `wiki export --json` 无独立 `schema_version` 字段（仅 `schema` 字符串）——Web 用全等校验够用 | `wiki export --json --root docs/coding_wiki` | 保持 `harness.wiki_graph.v1` 稳定；破坏变更升 schema 名 | info | SPEC / USER_GUIDE |
| F-218-05 | 模板 `stable.md`/`context.md` 默认几乎无 `[[wikilink]]`，金样边几乎全来自自建页 | 拷贝 templates 后 export | templates 样例互链 2～3 条，降低空边困惑 | info | coding_wiki/templates |

### 经验补充

4. Web 应用 `schema === harness.wiki_graph.v1` 硬校验，避免 silent 吃错形状。
5. 力导向库选 `d3-force`（Vue 仓勿硬上 react-force-graph）。
6. 双击节点跳 `/docs?path=` 依赖 docs API 已扩到 `docs/**`（含 coding_wiki）。

---

## 3) 建议下一动作（定稿）

1. **产品 2.18.1 / docs**：USER_GUIDE 增加「升级后 wiki_delta 存量迁移」决策树 + 可选 lint（F-218-01/02）。
2. **templates**：给 stable/context 加最小 `[[wikilink]]` 互链样例（F-218-05）。
3. **CHANGELOG Notes**：明示 upgrade 不改写业务 task 元信息（F-218-03）。

**结论一行**：建议产品下一版以 **docs/ONBOARDING 迁移专节 + template 互链样例** 优先（不必急着改 close 闸语义）；Web 侧 2.18 消费者路径已 dogfood 可公开。

---

## 产品 2.18.1 / 2.18.2 消费对照（2026-07-28）

| 产品版 | 消费者动作 | 结果 |
|--------|------------|------|
| **2.18.1** | 对照 USER_GUIDE §6.0b / templates 互链 | F-218-01..03 / F-218-05 **已缓解**（docs）；CLI lint 仍待 2.19 |
| **2.18.2** | pin bump + 本仓 `coding_wiki` 迁两层 `topics/` | 见 F-218-06 |

| id | 现象 | 复现 | 期望 | severity | 建议产品落点 |
|----|------|------|------|----------|--------------|
| F-218-06 | 2.18.0 金样主题页在 wiki **根**平铺；人扫将随主题增长爆炸；图边仍正常 | 迁前 `ls docs/coding_wiki/`；迁后 `topics/` + export | 产品两层约定可执行；export 不依赖深度 | info | **已落** 2.18.2 templates README · USER_GUIDE「目录 vs 图」 |

### 经验补充

7. 目录是给人扫的，图是给边的：`git mv` 进 `topics/` 后须改 `[[topics/…]]`，再 `wiki export` 校验。
8. 消费者迁移可与 pin bump 同 PR；**不必**等 CLI 硬闸。

Wiki: [`docs/coding_wiki/`](../coding_wiki/) · [`topics/web_obs_demo.md`](../coding_wiki/topics/web_obs_demo.md)
