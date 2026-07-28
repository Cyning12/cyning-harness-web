# PLAN · 产品↔技术沟通 Agent + Harness 推广面（v1 落盘稿）

| 项 | 内容 |
|----|------|
| **状态** | `draft` · 研讨落盘 · **≠** 已立项签收 SPEC |
| **日期** | 2026-07-28 |
| **落盘仓** | `cyning-harness-web`（dogfood / 叙事旁路；实现可另开产品仓） |
| **关联** | `@cyning/harness` · Ops Desk · 本仓过程可观测 Demo |
| **动机** | ① 简历包装的「沟通辅助 Agent」可落地骨架；② 回答「为何常问 MCP」——**推广与异质 Agent 接入**，非默认架构中心 |

> **读法**：§1–§2 定边界；§3 沟通 Agent 骨架；§4–§6 **推广与接入**（技术团队 / 非编码 Agent / MCP）；§7 分阶段；§8 待决问题。  
> **冲突时**：正式 epic SPEC / 产品 STRATEGY_MASTER 签收后覆盖本文。

---

## 1. 三句话定位

1. **沟通 Agent（轨 A）**：面向产品→技术，**不改码**；澄清需求 + 读图谱 + 出可行性与交接物。  
2. **cyning-harness（轨 B）**：面向技术侧 AI Coding，**约束改码与关账**；是交接后半段的「操作系统」。  
3. **MCP / Demo / Ops Desk（轨 C）**：只读能力插头或观测壳；**服务推广与复用**，不替代 A 的对话入口，也不替代 B 的闸。

推广卖的是 **「澄清 → 结构化交接 → 规范落地 → 过程可看」**，不是「安装一个 MCP」。

---

## 2. 为何总问 MCP（问题重述）

MCP 问得多，通常不是因为「编排必须 MCP」，而是卡在：

| 真实问题 | MCP 能帮什么 | MCP 帮不了什么 |
|----------|--------------|----------------|
| 新团队已有 AI Coding，如何**插进**现流程并显出价值？ | 提供**标准只读工具面**（读图谱 / lint-wiki-delta / status），IDE 里即插即用 | 不能自动让对方改用你的帽链 |
| 对方已有 **非 Cursor 的业务 Agent**（导购等），能否**更省事**用上？ | 同一 Tool 实现可被任意 MCP 客户端调用 | 不能把 Harness 全套闸硬套到导购对话上 |
| 如何**对外讲**可集成？ | 「Lens：只读 MCP」是生态友好话术 | 获客主入口仍应是对话产品 / CLI 接入，不是 MCP |

**结论**：MCP = **推广与异质运行时的适配层（P1）**；对内获客与价值证明仍靠 **对话 Agent + Harness 交接 + 可观测**。

---

## 3. 沟通 Agent · 立项骨架（轨 A）

### 3.1 目标用户与非用户

| | 说明 |
|--|------|
| **用户** | 产品 / 业务；需要与技术对齐可行性 |
| **非用户** | 直接改码的工程师主路径（他们用 Harness + IDE） |
| **下游用户** | 技术同学或技术侧 Coding Agent（接收 task / Prompt） |

### 3.2 能力（对齐简历包装）

1. **多轮澄清**：边界、约束、验收口径 → 可评审问题定义。  
2. **基于项目实际**：按需读 `_tech_graph` / 模块说明 / SPEC / ontology 切片。  
3. **对接产出**：可行性报告（范围 · 可行性 · 粗估 · 待确认项）；可导出 **pending** task 或 30 Prompt 草稿。  
4. **边界**：止于分析与交接；**禁止**改业务代码、禁止写 `HG-*=approved`、禁止 `task close`。  
5. **过程留痕**：会话 checkpoint + 关键结论落盘（报告 md / evidence）。

### 3.3 建议编排

| 层 | 选型 | 职责 |
|----|------|------|
| 对话状态机 | **LangGraph** + checkpointer | 澄清环 · 人机确认节点 · 可回放 |
| 只读检索 | 进程内 Tool（与 MCP 共用实现更佳） | 读图谱 / 文档 |
| 交接 | 写 md 到约定目录 | 报告 · `docs/tasks/active` 草稿（闸 pending） |
| 改码前门 | **cyning-harness** | 人签闸 → verify → 30 → PR |

### 3.4 与 Harness 的交接契约（最小）

导出 task 草稿建议含：

- `task_slug` · 范围 / 非范围 · 验收 · `failure_paths`（可粗）  
- `graph_delta` / `wiki_delta`（或明确 `none`/`n/a` + note）  
- `test_strategy`  
- 人工闸表：全部 **`pending`**（由技术侧签）  
- 经验节占位（若 `experience_capture` 后续 required）

**机械边界**：沟通 Agent 的写权限白名单 = 报告目录 + task 草稿 + Prompt 草稿；其余路径只读。

### 3.5 非范围（本骨架）

- 自动过闸 / 自动开 30 改码  
- 替代 Ops Desk 看板  
- 通用「任意行业 Agent 平台」一口吃掉  

---

## 4. 场景一：新团队 · 已有 AI Coding，如何用上 Harness 并显价值

前提：对方已在用 Cursor/Copilot 等，**流程松散或自有规范**，不一定愿意换编辑器。

### 4.1 不要一上来卖的

- 「请全员改用我们的帽链全文」  
- 「先装 MCP 再谈」  
- 「必须用我们的 Web Demo 才能编码」

### 4.2 建议切入顺序（价值可见）

| 步 | 动作 | 对方立刻感到的价值 |
|----|------|-------------------|
| **1. 薄接入** | `npx @cyning/harness init`（harness-only） | 有 task 模板 / verify / close 语义，不打断现有 IDE |
| **2. 一个痛点闸** | 只推 1～2 个硬收益：如 `wiki_delta`/`graph_delta`、close 缺字段 BLOCK、`lint-wiki-delta` | 「关账不再漏文档」可度量 |
| **3. 金样对照** | 旁开 `cyning-harness-web` 看 `/obs` `/wiki-graph` | 理解落盘真值 vs 飞行中 |
| **4. CI 金样** | 对**已 CLOSE**样例跑 verify（仿本仓） | PR 上有机械门，不靠口头 |
| **5. 可选 MCP Lens** | IDE 挂只读工具：status / lint-wiki-delta / 读图谱 | **不换编排**也能查 Harness 状态 |
| **6. 沟通 Agent**（若有产品岗） | 产品出 pending task → 技术用现有 AI Coding + Harness 接棒 | 跨角色价值，不只工程师自嗨 |

### 4.3 「已有 AI Coding」时的价值话术

| 对方现状 | Harness 补的缺口 |
|----------|------------------|
| 会生成 PR，但验收口口径漂 | task 验收字段 + close 闸 |
| 聊天里「做完了」无法审计 | 落盘 invoke / review / evidence |
| 升级工具链版本乱 | pin + upgrade RUNBOOK |
| 文档/图谱与码不同步 | graph_delta / wiki_delta / lint |
| 产品需求进技术仍靠会拍 | 沟通 Agent → pending task（轨 A） |

**一句话**：不替换他们的 Coding Agent，只加 **关账纪律与可观测**；MCP 让 Coding Agent **看见**纪律状态。

---

## 5. 场景二：非技术团队 / 非 Coding Agent（如导购助手）

### 5.1 诚实边界

`cyning-harness` **核心语义是 AI Coding 工程纪律**（task · 闸 · verify · close · graph/wiki）。  
**不适合**把「00/30 帽链 + 人闸改码」原样套到导购对话 Agent。

对导购类 Agent，可复用的是 **子集（Inform + 留痕 + 只读工具）**，不是全套 Coding OS。

### 5.2 可复用分层（从易到难）

| 层 | 内容 | 导购 Agent 是否值得 |
|----|------|---------------------|
| **L0 方法论** | 落盘真值 vs 飞行中；关键结论要可回看 | ✅ 低成本，改运营规范即可 |
| **L1 产物模板** | 「会话结论卡 / 待确认项 / 升级人工」md 模板 | ✅ 类比 task，但不叫 coding task |
| **L2 只读知识** | 商品/政策/话术的「图谱或结构化说明」+ 检索 Tool | ✅ 对齐「基于真实信息」 |
| **L3 MCP Lens** | `get_policy` / `get_sku_graph` / `session_summary` 只读 | ✅ **便捷接入已有 Agent 运行时** |
| **L4 全量 Harness** | 帽链 · HG 闸 · task close | ❌ 默认不推；除非该团队也在「改导购策略的工程仓」里用 AI 改配置/代码 |

### 5.3 「更便捷使用」的推荐形态

对**已存在的**业务 Agent（非 Cursor）：

1. **不要**要求他们改造成 Harness 编排器。  
2. **要**提供：**只读 MCP（或 HTTP Tool）** + 可选「结论落盘到某目录/表」。  
3. 若该业务背后有 **工程仓**（改推荐策略、改 Prompt 配置也走 Git），再对**工程仓**上 Harness，与导购运行时分离。

```text
导购 Agent 运行时 ──MCP/Tool──► 只读知识 / 会话摘要写入（可选）
        │
        │  （人工或另一流水线）
        ▼
策略/配置 Git 仓 ──cyning-harness──► 改配置/改码的纪律（技术侧）
```

### 5.4 话术（对外）

- 对技术团队：**Harness = AI Coding OS**。  
- 对业务 Agent 团队：**Harness Lens / 落盘模板 = 可插的只读与留痕**；全套 OS 仅当你们也用 AI 改仓库时再用。

---

## 6. 推广面选型（含 MCP）

| 面 | 主用户 | 推广作用 | 优先级 |
|----|--------|----------|--------|
| 对话式沟通 Agent | 产品 | 获客与跨角色价值 | **P0** |
| `npx` init + USER_GUIDE | 工程师 | 进入仓库的最短路径 | **P0** |
| cyning-harness-web Demo | 双方 | 看见过程；金样 dogfood | P0 对照 / P1 对外 demo |
| Ops Desk | 维护者 | 多任务观测 | 工作区主线（与本文并行） |
| **只读 MCP Lens** | 任意 MCP Agent | **异质运行时接入、生态话术** | **P1** |
| 可嵌入 Obs SDK | 有前端的业务仓 | 内嵌 `/obs` | P2 |
| 远程多仓仪表盘 | 平台组 | 重；慎做写路径 | P2+ |

### 6.1 MCP 产品化原则（若做）

- **默认只读**；写路径单独 server 或显式高危工具。  
- Tool 实现与沟通 Agent / Web Demo **共用库**（避免三套 spawn CLI）。  
- 文档写清：`Requires artifacts on disk for coding profile`；业务 Agent profile 可只暴露知识检索类工具。  
- **不**宣传「MCP = 完整 Harness」。

---

## 7. 分阶段（建议）

| 阶段 | 交付 | 证明什么 |
|------|------|----------|
| **M0** | 本文落盘 · 交接字段清单 · 可行性报告模板 | 规范先于模型 |
| **M1** | LangGraph 澄清环 + 读 `_tech_graph` + 出报告（单仓 dogfood） | 简历能力 1/2/4/5 |
| **M2** | 导出 pending task / Prompt；工程师 Harness 接棒一条真 PR | 能力 3 闭环 |
| **M3** | 只读 MCP（图谱 + lint-wiki-delta + status 摘要） | 新团队 / 异质 Agent 接入故事 |
| **M4** | 业务 Agent「L0–L3」模板包（非 coding profile） | 导购等场景可讲清边界 |

---

## 8. 待决问题（下次收敛）

1. 沟通 Agent **独立 Git 仓**还是挂在 Ink / 新目录？  
2. 报告与 task 草稿的**物理路径**约定（避免污染 `docs/tasks` 语义）。  
3. MCP 首发工具清单是否 **仅 coding profile**，业务 profile 是否第二包。  
4. 粗估人效是否要校准数据源（否则报告标明「启发式」）。  
5. 与 Ops Desk P1 LangGraph 是 **复用服务**还是 **两套图**。

---

## 9. 相关指针

| 资源 | 路径 |
|------|------|
| 本仓 Demo README | [`../../../README.md`](../../../README.md) |
| 只读边界 ontology | [`../../meta/ONTOLOGY_web_obs_demo_v1.md`](../../meta/ONTOLOGY_web_obs_demo_v1.md) |
| Harness 接入 | 产品仓 `docs/ONBOARDING.md` |
| Ops Desk 执行规划 | 工作区 `docs/harness/guides/PLAN_ops_desk_execution_v1_zh.md` |
| Wiki / pin dogfood | [`../../evidence/CHECK_harness_2_19_0_consume_20260728.md`](../../evidence/CHECK_harness_2_19_0_consume_20260728.md) |

---

## 10. 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | v1 draft：沟通 Agent 骨架 + 推广面（技术团队 / 非编码 Agent / MCP）落盘 |
