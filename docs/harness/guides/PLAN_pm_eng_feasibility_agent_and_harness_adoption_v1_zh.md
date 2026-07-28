# PLAN · 产品↔技术沟通 Agent + Harness 推广面（v1.1）

| 项 | 内容 |
|----|------|
| **状态** | `draft` · 研讨落盘 · **≠** 已立项签收 SPEC |
| **日期** | 2026-07-28 |
| **版本** | v1.1（§8 五项已决） |
| **落盘仓** | `cyning-harness-web`（本 PLAN 旁路落盘；**实现仓另建**，见 §8.1） |
| **关联** | `@cyning/harness` · Ops Desk / kimi-code · `kimi-code-meta` · 本仓 Demo |
| **动机** | ① 沟通辅助 Agent 可落地骨架；② 推广面（含 MCP）与异质 Agent 接入 |

> **读法**：§1–§2 定边界；§3 沟通 Agent；§4–§6 推广；§7 阶段；**§8 已决事项**（含 MCP 工具表）；§9 指针。  
> **冲突时**：正式 epic SPEC / STRATEGY_MASTER 签收后覆盖本文。

---

## 1. 三句话定位

1. **沟通 Agent（轨 A）**：面向产品→技术，**不改码**；澄清 + 读图谱 + **产品可读报告** + 可选导出技术 task。  
2. **cyning-harness（轨 B）**：技术侧 AI Coding OS；在**新实现仓**上 dogfood 全流程。  
3. **MCP / Demo / Ops Desk（轨 C）**：只读插头与观测；**推广与复用**，不替代 A/B。

---

## 2. 为何总问 MCP（问题重述）

| 真实问题 | MCP 能帮什么 | MCP 帮不了什么 |
|----------|--------------|----------------|
| 新团队已有 AI Coding，如何插入并显价值？ | 标准只读工具面，IDE 即挂即用 | 不能强迫对方改用帽链 |
| 已有非 Coding Agent（导购等）能否省事用上？ | 任意 MCP 客户端可调同一 Tool | 不能把全套闸套到导购对话 |
| 对外如何讲可集成？ | 「Lens：只读 MCP」 | 获客主入口仍是对话产品 / `npx init` |

**结论**：MCP = **P1 适配层**；获客靠对话 Agent + Harness 交接 + 可观测。  
**首发工具「具体有什么」→ 见 §8.3**（不再用含糊说法）。

---

## 3. 沟通 Agent · 立项骨架（轨 A）

### 3.1 用户

| | 说明 |
|--|------|
| **主用户** | 产品 / 业务 |
| **下游** | 技术同学 / 技术侧 Coding Agent |
| **非用户** | 把本 Agent 当改码入口的人 |

### 3.2 能力

1. 多轮澄清 → 可评审问题定义  
2. 按需读目标仓 `_tech_graph` / 模块说明 / SPEC / ontology  
3. 产出 **产品侧可行性报告**（可读、通用）；**另步**才导出 Harness task / Prompt 草稿  
4. 不改码、不批闸、不 `task close`  
5. 会话 checkpoint + 报告落盘留痕  
6. 凡结论（含粗估）须带 **依据标注**（见 §8.4）

### 3.3 编排与仓

| 层 | 选型 | 职责 |
|----|------|------|
| 实现仓 | **独立新 Git 仓**（§8.1） | 不与 Ink / harness-web / 产品包混用 |
| 对话图 | **复用** Ops Desk / kimi-code 方向的 LangGraph + checkpointer（§8.5） | 澄清环 · 可回放 |
| 只读 Tool | 进程内实现；**同实现**挂 MCP（§8.3） | 读图谱 / 文档 / harness 只读投影 |
| 产品产出 | `docs/briefs/`（或等价） | 报告 · 通用可读 |
| 技术产出 | 显式「导出给技术」→ `docs/tasks/active` 等 | pending 闸；与报告目录隔离 |
| 纪律 | 本实现仓 `init` `@cyning/harness` | dogfood 全链路 |

### 3.4 报告 vs task（目录与语义 · §8.2）

| 产物 | 目录（建议） | 读者 | 要求 |
|------|--------------|------|------|
| **可行性报告** | `docs/briefs/YYYYMMDD_<slug>.md` | 产品 / 业务 / 评审会 | 少术语；结构固定；依据可见；**不**冒充已签收 task |
| **会话摘要**（可选） | `docs/briefs/sessions/` | 复盘 | 澄清问答要点 |
| **Harness task 草稿** | 仅导出后：`docs/tasks/active/task_*.md` | 工程师 | 全套元信息；闸 **pending** |
| **30 Prompt 草稿** | `docs/harness/invokes/…` 或 `docs/briefs/export/` | 工程师 | 不自动开工 |

报告模板最低章节（通用、可读）：

1. 背景与诉求（产品语言）  
2. 已澄清结论 / 仍待确认  
3. 影响面（对照图谱，附链接）  
4. 可行性判断（可行 / 有条件 / 暂不可行）  
5. 粗估（人天区间 + **依据** + 置信度）  
6. 建议下一步（导出 task / 再开澄清 / 人工评审）  
7. 附录：引用的图谱/文档路径列表  

**禁止**：把报告直接当 `docs/tasks` 真值；导出 task 须产品或技术显式确认。

### 3.5 非范围

- 自动过闸 / 自动改码  
- 替代 Ops Desk  
- 首发就做导购等业务 MCP 包（L0–L3 另阶段）  

---

## 4. 新团队已有 AI Coding（摘要）

薄 `init` → 1～2 痛点闸 → Demo 对照 → CI verify → 可选 MCP Lens → 沟通 Agent 出报告/导出 task。  
**不**替换对方 Coding Agent；补关账纪律与可观测。

---

## 5. 非 Coding Agent（导购等 · 摘要）

全套 Harness 默认不套；复用 L0–L3（方法论 / 结论模板 / 知识只读 / MCP 检索）。  
工程仓改策略配置时再上全套 OS。业务 MCP **第二包**，不进 §8.3 首发。

---

## 6. 推广面优先级

| 面 | 优先级 |
|----|--------|
| 对话沟通 Agent + 独立仓 dogfood Harness | **P0** |
| `npx` init + 报告/交接模板 | **P0** |
| harness-web / Ops Desk 观测 | P0 对照 / 工作区主线 |
| **只读 MCP（coding profile · §8.3）** | **P1** |
| 业务 Agent MCP 包 | P2 |

原则：默认只读；与 Agent/Web **共用库**；不宣传「MCP = 完整 Harness」。

---

## 7. 分阶段

| 阶段 | 交付 |
|------|------|
| **M0** | 本 PLAN · 报告模板 · 新仓建仓 + harness init |
| **M1** | LangGraph 澄清 + 读图谱 + **briefs 报告**（含依据字段） |
| **M2** | 显式导出 pending task / Prompt；一条真 PR 接棒 |
| **M3** | MCP coding profile（§8.3 表） |
| **M4** | 业务 L0–L3 模板 / 第二 MCP 包（可选） |
| **并行** | kimi-code LangGraph 复用 + **kimi-code-meta 针对性升级**（§8.5） |

---

## 8. 已决事项（原「待决」· 2026-07-28）

### 8.1 落点：新目录 / 新仓 · 不混用 · 实践 Harness

| 决策 | 内容 |
|------|------|
| **结论** | **独立新 Git 仓**（建议名待定，例：`cyning-feasibility-agent` / `cyning-pm-brief-agent`），与 Ink、`cyning-harness`、`cyning-harness-web` **代码与 task 树不混用** |
| **Harness** | 新仓立即 `npx @cyning/harness init`，自用 task/闸/PR/CI，作为**又一个消费者 dogfood**（继 web 之后） |
| **本 PLAN** | 可暂留 web 仓 `docs/harness/guides/`；新仓建好后 **POINTER 迁过去或双链** |
| **工作区** | `Projects/` 下并列目录；根 `.gitignore` 按需忽略（同 web） |

### 8.2 报告与 task 区分

| 决策 | 内容 |
|------|------|
| **结论** | **物理目录与语义都分开**：报告 = 产品侧；task = 技术侧 |
| **报告** | `docs/briefs/`；强调**可读性、通用性**（少 Harness 黑话；黑话进附录） |
| **task** | 仅「导出给技术」动作写入 `docs/tasks/**`；闸保持 pending |
| **通用性** | 报告模板不绑定单一业务域；换目标仓只换「读图根路径 / 项目名」 |

### 8.3 MCP 首发清单（coding profile · 具体工具表）

> **首发 = 只做「编码/工程仓」只读包**；导购等业务包 = 第二包（P2）。  
> 下列每个名字是 **一个 MCP Tool**（实现上可先做同名函数，再包一层 MCP）。

| # | Tool 名（建议） | 输入（要点） | 输出 | 用途（一句话） |
|---|-----------------|--------------|------|----------------|
| 1 | `harness_pin_info` | `root?` | pin/manifest 版本 | 当前钉了哪版纪律包 |
| 2 | `harness_list_tasks` | `scope: active\|done\|all` | 路径列表 + 标题 | 有哪些 task 可观测 |
| 3 | `harness_status` | `task` 路径 | `status --json` 摘要 | 闸/是否可 30 等一屏状态 |
| 4 | `harness_timeline` | `task`；**默认 ingest=false** | timeline JSON 摘要 | 过程事件（默认不写盘） |
| 5 | `harness_verify_summary` | `task` | PASS/BLOCK/WARN 摘要 | 开工前/关账前机械结果 |
| 6 | `harness_lint_wiki_delta` | `scope?` | missing 列表；缺则说明 exit 语义 | 升级后谁缺 `wiki_delta` |
| 7 | `harness_wiki_graph` | `root?` 默认 `docs/coding_wiki` | nodes/edges 摘要或 JSON | Wiki 关系图数据 |
| 8 | `harness_read_graph` | 相对路径（仅允许 `docs/_tech_graph/**`） | 文件正文/节选 | 读架构图谱真值 |
| 9 | `harness_read_doc` | 相对路径（允许 `docs/**` 白名单） | 正文节选 | 读 SPEC/模块说明等 |

**首发明确不做（高危 / 易破坏边界）：**

- `task close` / 改 `HG-*=approved` / `upgrade` / 任意写业务码  
- `timeline --ingest` 默认开（若提供，须单独 tool + 警告）  
- 业务域工具（SKU/政策/导购话术）——属第二包  

**谁会用这张表：** Cursor 等 Coding Agent、沟通 Agent 后端（同一实现）、以后外团队「已有 AI Coding」只挂 Lens。

### 8.4 粗估与结论依据（须校准 / 须注明）

| 决策 | 内容 |
|------|------|
| **结论** | **需要依据**；禁止无来源的「人天数字」装成事实 |
| **新项目** | 允许**猜测/类比**，但必须写：`依据类型` + `依据内容` + `置信度` |
| **依据类型（枚举建议）** | `graph`（图谱模块数/边）· `doc`（SPEC/报告引用）· `history`（同类已关闭 task 人天）· `analogy`（他仓类比）· `expert`（人工标定）· `guess`（无数据猜测） |
| **报告字段** | 每条粗估与关键可行性句旁强制：`依据：…` · `置信度：高/中/低` |
| **校准** | 有历史关闭 task 时优先 `history`；无则 `guess/analogy` 并在报告顶栏声明「粗估未校准」 |
| **后续** | 实现仓用 Harness 关账后回填实际人天，形成简易校准表（M2+） |

### 8.5 LangGraph：复用 kimi-code 方向 · 并升级 kimi-code-meta

| 决策 | 内容 |
|------|------|
| **结论** | **复用**，不另起无关的第二套编排哲学；主对齐 **Ops Desk / kimi-code** 的 P1 LangGraph + checkpointer |
| **沟通 Agent** | 作为**同一编排栈上的另一条图**（或可组合子图）：节点偏澄清/读图/出 briefs，**不**接改码 tool |
| **kimi-code-meta** | Track C 虽已关账，为支撑复用须做**针对性升级**（图契约、会话/checkpoint 元数据、与 briefs/task 导出指针等——另开 meta 升级 task，不塞进 web Demo） |
| **边界** | Ops Desk 仍服务 kimi 观测主线；沟通 Agent 独立仓部署；**共享库 / meta 契约**，不共享「可写闸」权限 |

```text
kimi-code-meta（升级后的契约/图元数据）
        │
        ├─► Ops Desk / kimi-code · LangGraph（观测与既有编排）
        │
        └─► 沟通 Agent 新仓 · LangGraph（澄清→briefs；只读 tool）
                 │
                 └─► 导出 pending task → 技术侧 Harness（可在目标业务仓或本仓 dogfood）
```

---

## 9. 相关指针

| 资源 | 路径 |
|------|------|
| 本仓 Demo README | [`../../../README.md`](../../../README.md) |
| Ontology 只读边界 | [`../../meta/ONTOLOGY_web_obs_demo_v1.md`](../../meta/ONTOLOGY_web_obs_demo_v1.md) |
| Harness ONBOARDING | 产品仓 `docs/ONBOARDING.md` |
| Ops Desk 规划 | 工作区 `docs/harness/guides/PLAN_ops_desk_execution_v1_zh.md` |
| kimi-code-meta 规划 | 工作区 `docs/harness/guides/PLAN_kimi_code_meta_harness_2x_v1_zh.md` |
| 2.19 消费验收 | [`../../evidence/CHECK_harness_2_19_0_consume_20260728.md`](../../evidence/CHECK_harness_2_19_0_consume_20260728.md) |

---

## 10. 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | v1 draft 落盘 |
| 2026-07-28 | **v1.1**：§8 五项已决；展开 MCP 九工具表；报告/task 分家；新仓 dogfood；粗估依据枚举；LangGraph 复用 + meta 升级 |
