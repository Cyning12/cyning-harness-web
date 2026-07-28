# SPEC：构建 cyning-harness-web 过程可观测 Demo（单仓 · v1）

> **状态**：`approved`（维护者已签收 · **仅本 epic SPEC**）  
> **track**：`epic`  
> **关联图谱**：（可选后置）`docs/_tech_graph/`  
> **下游**：epic 已签 → **00 自主拆 task / 代签下游闸 / 派 30**（见 §0）→ 30 **仅编码**  
> **方案参考（不替代本 SPEC）**：工作区 `docs/harness/guides/PLAN_cyning_harness_web_obs_demo_v1_zh.md`  
> **叙事对照**：`ai_coding_governance/narrative/discipline_package_series/NOTE_篇3立项判断_对照cyning-harness_20260725_zh.md`  
> **最低纪律包**：`@cyning/harness` ≥ **2.17.0**（缺口校验 PASS）  
> **自主统筹入口**：工作区 `docs/harness/prompts/PROMPT_00_cyning_harness_web_autonomous_loop_v1_zh.md`

### Sign-off（维护者 · 仅 epic）

| 项 | 值 |
|----|-----|
| **维护者** | Cyning12 |
| **日期** | 2026-07-28 |
| **结论** | `approved` |
| **skip_10_spec** | `yes` · 2026-07-28 · 以本 SPEC 为签收真值；不强制完整 10-spec |
| **备注** | 后续 task / Phase / `HG-*` 签收权交给 **00**；维护者可抽查否决；聊天「继续」≠ 下游闸 approved（须改闸表） |


### §0 · 编排与签收权（强制）


| 角色                    | 允许                                                           | 禁止                                          |
| --------------------- | ------------------------------------------------------------ | ------------------------------------------- |
| **维护者**               | 签收本 epic SPEC；抽查 / 否决 00 裁量；产品仓 `cyning-harness` 重大改签        | 不必亲签每个下游 task 闸                             |
| **00 统筹**             | 拆 task、落盘 invoke、代签下游 `HG-`*（按仓规）、一次一 Phase 派 30、验收收口、写证据包指针 | **禁止编码**（无 Vue/Vite/Express/业务实现；无本会话改产品实现） |
| **10-spec / 10-task** | 思考轮 / task 细化（若 00 派发）                                       | 不替代 00 派工权；不写业务码                            |
| **30**                | 仅 Open Folder=本仓根后实现当前 Phase                                 | 不得自签闸、不得越 Phase                             |


**纪律**：00 是编排者，不是执行者。未 epic `approved` 前，00 不得派 30。

### §0.1 · 执行闭环纪律（本仓强制 · 对齐 `@cyning/harness` ≥**2.17.0**）

> 下列为本 epic **自主 loop** 的可执行约束。括号内为产品包**实测能力**（00 对照 USER_GUIDE / TASK_TEMPLATE / close·status 行为）。

#### A. Inform 图谱（graph）


| 问题                  | 产品包现状（验证结论）                                                                                                                                                            | 本仓约定                                                                                                                                           |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 是否「每次改动必须更新 graph」？ | **否 · 非逐文件硬闸**。硬约束是改码 30 前 `HG-GRAPH-MODULES=approved`（D4 / `gate-check --graph`）；ONBOARDING **S0–S3** 允许增量，**不必一次画完**。`graph yaml compile/check`、`graph ingest` 为可选能力 | **每次 task**：00/30 必须回答「本次 diff 是否触及模块边界/主流程？」→ 是则更新 `docs/_tech_graph/`（或 `.graph.yaml`+compile）；否则在 task 实现备忘写 `**graph_delta: none` + 一行理由** |
| `verify` 是否默认挡无图？   | `verify --task` **默认不**强制 `--graph`；需显式加 `--graph` 才与图谱闸聚合                                                                                                             | 凡 **改码** task：`verify --task … --graph` 列入 30 前必跑；纯文档 task 可 `graph_delta: none` 且不加 `--graph`                                                 |
| 回馈产品？               | —                                                                                                                                                                      | 若「每次改动是否更新图」缺少机械提醒 → Phase E 证据记入 issue（建议：close/verify 对 `graph_delta` 字段 WARN）                                                               |


#### B. invoke 严格落盘（2.12+ 重点）


| 产品包现状                                                                                                                                           | 本仓约定                                                                                                                                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `task close` 按 `required_invoke_hats` / `invoke_retention_profile` **硬闸**（缺省 `10,30,40`）；`verify --task` 对缺口 **WARN**；`--allow-invoke-gap` 豁免留痕 | **禁止默认豁免**。改码 task：`invoke_retention_profile: default` 或更严 `full`；文档/编排 task 可用 `minimal` 但须写理由。每开一帽：**先落盘** `docs/harness/invokes/by-task/<slug>/invoke_YYYYMMDD_<hat>_….md` 再开工。命名遵守产品约定（hat 在日期后前缀） |


#### C. 本体 / 语义设定（开工前）


| 产品包现状                                                                                     | 本仓约定                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 产品仓有 `DESIGN_ONTOLOGY` + `ontology-check`（**包自身**）；Starter **无**「业务仓开工前必须跑本体设定」的强制 CLI 步骤 | **需要加入本仓流程**：Phase A 之前或之中设 **Inform bootstrap**（见附录 B）：最小 `docs/_tech_graph/01_struct` 模块表 + 本仓术语表（`docs/meta/ONTOLOGY_web_obs_demo_v1.md` 或等价）+ `HG-GRAPH-MODULES` 人签（00 可代签）。**建议回馈产品**：ONBOARDING 增加可选「consumer ontology slice」/ 模板，避免绿野仓跳过语义对齐 |


#### D. Phase ≠ 单 task


| 约定                                                                                             |
| ---------------------------------------------------------------------------------------------- |
| Phase 是里程碑，**不追求一 task 打完**。00 按 diff 风险拆串行（或 worktree 并行）子 task；附录 B 仅为示意 slug，签收后以 00 实际拆分为准 |


#### E. Git / PR / CI / 合并（禁止直推 main）


| 步骤  | 约定                                                                                                                   |
| --- | -------------------------------------------------------------------------------------------------------------------- |
| 分支  | 每 task：`task/<slug>`（与模板 `git_branch` 对齐）                                                                            |
| 提交  | **禁止** 00/30 直接 `push` 到 `main`；经 **PR** 合入                                                                          |
| CI  | 必要阶段加 GitHub Actions（至少：Phase A 起质量门；Phase E 起挂 `harness verify`）；本地改码 task：`pnpm lint` → `pnpm test` → `pnpm build` |
| 门禁  | 00 用 `gh pr checks` / `gh pr view` 确认绿后 **自行 squash/merge**（维护者已下放）；合并成功 → 删已合并远程+本地分支 → 才开下一 task                   |
| 证据  | PR URL + check 结论写入 task CLOSE / `docs/evidence/`                                                                    |


#### F. 并行与 worktree


| 约定                                                                                                    |
| ----------------------------------------------------------------------------------------------------- |
| 默认同 Phase **串行**一 30。若 00 判定可并行：必须 **独立 worktree** + task 填 `worktree_root` + `git_branch`；禁止同工作树双 30 |


#### G. KPI 与经验总结


| 产品包现状                                                                                                                                          | 本仓约定                                                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 模板含 `### KPI（00）`、`kpi_rubric`、`kpi_aggregator: CLOSE`、`experience_capture`；`status` JSON 仅 `**kpi_section: present|absent**`（**无打分校验、无分数硬闸**） | **每个 task CLOSE 前强制**：00 填写 KPI 小节（按 `KPI_RUBRIC_v1_2` 若仓内已嵌入；否则用简表：质量/过程纪律/可观测性/回馈价值 各 1–5 + 总评）+ `experience_capture` 经验 3–7 条。`experience_capture: required`（默认） |
| 回馈产品？                                                                                                                                          | Phase E 记录缺口：**KPI 分数未被 CLI 校验**；若要自主 loop 硬挡 CLOSE，需产品增 `task close` KPI 检查或 lint                                                                                  |


#### H. 自主 loop 最小状态机（00）

```text
epic approved
  → [Inform bootstrap · 图+术语 · HG-GRAPH-MODULES]
  → 拆下一 task（可多 task/Phase）· 落盘 invoke(00/10…)
  → 闸 approved（00 代签）· verify [--graph]
  → 派 30（单 task）· PR · gh checks 绿 · merge · 删分支
  → 40/自检 · review · KPI+经验 · task close（invoke 集合过硬闸）
  → 证据增量 · 下一 task
  （并行仅 worktree）
```

---

## Harness 元信息


| 字段                            | 值                                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **spec_slug**                 | `cyning-harness-web-obs-demo`                                                                                                        |
| **test_strategy**             | `required`                                                                                                                           |
| **test_strategy_note**        | 关键路径须可失败自动化：薄 API/middleware 调 CLI 的成功与失败投影；负向边界（禁浏览器 npx、禁 Web 写闸）；合并前 `pnpm lint` → `pnpm test` → `pnpm build`；Phase D/E 另采可公开证据数字 |
| **entry_invoke_10_spec**      | `docs/harness/invokes/by-task/cyning-harness-web-obs-demo/PROMPT_10_spec_rethink_R1_R5.md`（可选；默认由 00 裁量是否派）                          |
| **entry_invoke_00_draft**     | 工作区 `docs/harness/prompts/PROMPT_00_cyning_harness_web_bootstrap_v1_zh.md`                                                           |
| **entry_invoke_30_bootstrap** | 工作区 `docs/harness/prompts/PROMPT_30_cyning_harness_web_bootstrap_v1_zh.md`（闸后；以已签 task 为准修订范围）                                       |
| **skip_10_spec**              | `yes` · 2026-07-28 · 维护者签收时确认以本 SPEC 为真值                                                                 |


---

## 1. 背景与目标

**一句话目标**：在独立 Git 仓内跑通「本地 Agent 落盘 Harness 工件 → Web 只读浏览最新文档与 `status` / `timeline` 投影」。

相对 **Ops Desk P3b**（业务产品内嵌 `/obs` + fixture）：本仓是 Harness **dogfood / 教学 / 实验**单仓，数据来自**本仓真实落盘**（+ 可选 CLI JSON），不依赖 ops-desk-api 登录，也不绑架业务产品发版。

**为何单仓**：把「端到端落盘可观测」与 Ops Desk 业务壳解耦；Open Folder 对准本仓根即可 `pnpm dev`；避免 Demo 代码误入父级 Projects 仓或 ops-desk-* 业务仓。

**双目标（epic 内）**：

1. **产品 Demo**：Agent 落盘 → Web 只读投影（Phase A–B）。
2. **纪律包实战校验 + 篇 3 证据**：在 LLM 起草（原 Phase C → 现 **Phase F**）之前，用本仓跑帽链 / HGM 消费者闭环 / CI+负向边界，产出可回馈 `@cyning/harness` 的缺陷清单与可公开数字（Phase **C–E**）。对照篇 3 暂缓条件②「HGM 消费者侧 dogfood」。

---

## 2. 范围（v1 必须可验收）

### 2.1 产品行为

1. **本地 Agent 落盘真值**：在本仓写入 / 维护 harness 相关工件（至少：`docs/tasks/`**、`docs/harness/invokes/**`；可含 `docs/harness/reviews/**`、`.cyning-harness/events/**`）。Web **不**作为写入方。
2. **Web 只读**：
  - **文档浏览**：列出并可打开最新（或按 `mtime` 感知）的 task / 相关 md；
  - **过程投影**：展示 `harness status` / `harness timeline` 的 JSON 投影（契约见下）。
3. **薄服务端 / middleware**：仅在 Node 侧调用 harness CLI（或等价子进程）；**禁止**浏览器直接 `npx` / 调 CLI。
4. **页内明示**：只读投影 · 非签收真值；不可代签 `HG-`*。

### 2.2 技术栈（默认）


| 项    | 默认                                                     | 说明                                        |
| ---- | ------------------------------------------------------ | ----------------------------------------- |
| 包管理  | `pnpm`                                                 | 与 Ops Desk web 对齐，降低抄 UI 成本               |
| 构建   | Vite                                                   |                                           |
| UI   | Vue 3 + TypeScript                                     | 可参考 Ops Desk `ObsView.vue` **形状**；不复制业务登录 |
| UI 库 | Element Plus（建议）                                       | 可选；若改栈须在 task 写清理由且保持**单栈单仓**             |
| 服务   | Vite `server.middleware` / plugin，或同仓小 Express + proxy | 二选一或可切换；须满足「仅服务端调 CLI」                    |


### 2.3 路由（至少）


| 路径      | 职责                                |
| ------- | --------------------------------- |
| `/`     | 说明页：定位、只读原则、如何 `pnpm dev`、如何落盘后刷新 |
| `/obs`  | `status` / `timeline` 过程投影（可重载）   |
| `/docs` | 文档列表 + md 正文只读预览                  |


### 2.4 契约与版本

- **产品依赖**：`@cyning/harness` **≥ 2.17.0**（含 U0 pre-30 invoke 硬闸 + U1 graph_delta / KPI close / experience / consumer ontology；npm 以发版后为准）
- **JSON 契约**：`obs_status.v1` · `obs_timeline.v1`
- **调用形态（服务端）示意**：
  ```
  npx @cyning/harness status --target <本仓根> --task <path> --json
  npx @cyning/harness timeline --target <本仓根> --task <path> --json
  ```
- `verify_preview` / `status --check` **不替代**正式 `harness verify`；UI 不得伪装为已 verify。

### 2.5 仓与工程

- 独立 git 仓；remote：`git@github.com:Cyning12/cyning-harness-web.git`
- `harness init`（或 upgrade）纳入交付链（建议 Phase B；preset 建议 `harness-only`，ide 按维护者习惯）
- 至少种 **1** 条样例 task（含可读闸表 / 最小 invoke 痕迹），使 `/docs` 与 `/obs` 在 happy path **非空**

### 2.6 纪律包实战与回馈（Phase C–E · 在 LLM 之前 · v1 目标态）

> 下列阶段 **优先于** 原「LLM 起草」；目的是用绿野单仓校验纪律包可靠性，并为篇 3 提供「消费者侧 dogfood / 可公开增量」而非复读 ingest 教程。


| Phase                   | 要做什么                                                                                                     | 回馈 `@cyning/harness`                                                                | 篇 3 价值                           |
| ----------------------- | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | -------------------------------- |
| **C · 帽链 dogfood**      | 本仓真实跑一小轮：task →（可选 10）→ 闸 → `gate-check`/`verify` → 30（微改）→ review/CLOSE；全程用 Web `/obs`+CLI 对照           | 记录 CLI 歧义、错误文案、`may_start_30` 误判、invoke 缺口 WARN 等 → **issue/证据 md**（产品改码另开产品仓 task） | 「过程可观测是否挡住错开工」故事 + 时间线截图/JSON 摘录 |
| **D · HGM 消费者闭环**       | 显式 `timeline`（含按需 `--ingest`）、events 可见；Web 展示 timeline 与 status 对照；禁止默认静默 ingest                        | 契约缺口、空事件 WARN、性能/路径坑 → 产品仓                                                          | 直接命中篇 3 条件② **HGM 消费者侧 dogfood** |
| **E · CI + 负向边界 + 证据包** | CI 挂 `harness verify`（及必要 gate-check）；自动化负向：无 CLI / 无 task / 禁写闸；落盘 `docs/evidence/` 可公开摘要（次数、阻塞次数、耗时区间） | 金样/CI 模板在绿野仓的摩擦点 → 产品文档或 sample workflow                                            | 补「量化增量」门槛（小样本但可公开、可复现命令）         |


**回馈纪律**：本仓 **00/30 不直接改** `cyning-harness` 产品源码；只产出 `docs/evidence/` + 指向产品仓的 issue 草稿。产品修复由产品仓自己的帽链执行。

---

## 3. 非范围（写死）

1. Web **不写闸**、**不代签**任何 `HG-`*（含把聊天结论当 approved）。**例外说明**：仓内 **Markdown 闸表** 的 `pending→approved` 由 **人（维护者或获权 00）** 改文件完成；Web UI 永不提供写闸 API。
2. **LLM 运行时自动建 task** 列为 **Phase F**（原「Phase C」），**默认 out of v1 必做集**；须 00 在 epic 已签前提下显式开 task，或维护者改签本 SPEC 升格。
3. **不**实现后端业务 LLM；**不**改 `ops-desk-`* / Ink 业务仓代码。
4. **不**做 Ops Desk 登录、多仓聚合、Neo4j、替代 `harness verify`、发 npm 包。
5. **不**把 Cursor / 各壳飞行中 transcript / wire 当作签收或 CLOSE 真值（遵守过程可观测 GUIDANCE）。
6. **00 禁止编码**；实现仅由 30 按 **当前 Phase 的单一 task** 执行。
7. Phase C–E 的「回馈」**不等于**在本会话直接提交产品仓 PR 实现；最多落盘证据与 issue 文稿。

---

## 4. 验收标准

### 4.1 Phase A–B（Demo 基线 · 必做）

- [ ] **独立仓**：`git clone`（或已有独立 `.git`）后，`rev-parse --show-toplevel` 等于本仓根
- [ ] **启动**：本仓内 `pnpm install` → `pnpm dev` 可打开 UI（`/` · `/obs` · `/docs` 可路由到达）
- [ ] **文档**：落一条样例 task 后，`/docs` 可见并可打开正文
- [ ] **投影**：`/obs` 能显示 `status` 和/或 `timeline` 投影；支持重载
- [ ] **只读声明**：页内可见「只读投影 · 非签收真值」类提示
- [ ] **失败可读**：CLI 不可用、无 active task、读盘失败等有可读错误
- [ ] **边界**：无浏览器侧 `npx`；无 Web API 写入闸表为 `approved`
- [ ] **合并前 Verify**：`pnpm lint` → `pnpm test` → `pnpm build` 关键路径绿

### 4.2 Phase C–E（纪律包校验 · epic v1 目标态 · 00 串行派发）

- [ ] **C**：至少一轮完整帽链 dogfood 有落盘 invoke/review（或 CLOSE 摘要）；`/obs` 能反映闸前后 `may_start_30` 变化；缺陷记入 `docs/evidence/`
- [ ] **D**：timeline 消费者路径可演示（含显式 ingest 策略说明）；Web 与 CLI JSON 对照一致或差异有文档
- [ ] **E**：CI 或脚本可跑 `harness verify`；至少 2 个负向自动化用例；证据包含可复现命令与（可公开）计数/耗时区间
- [ ] **回馈**：至少 1 份指向 `cyning-harness` 的 issue 草稿或「无阻塞缺陷」书面结论

### 4.3 Phase F（LLM · 默认不做）

- [ ] （仅当 00 开 task 后）LLM 只产草案；落盘仍人/Agent；禁止改闸 approved

---

## 5. failure_paths


| 触发条件                               | 系统行为                                     | 可重试              | 用户可见                 |
| ---------------------------------- | ---------------------------------------- | ---------------- | -------------------- |
| 无 active task / 未指定 task           | `/obs`（及 API）返回明确空态或错误码；不假装有投影           | 是（落盘或选 task 后重载） | 「无可用 task」类文案        |
| harness CLI 失败（未安装、版本过低、非 0 退出、超时） | API 返回错误载荷；UI 展示可读原因 + 重试                | 是                | 「CLI 不可用 / 调用失败」+ 摘要 |
| 读盘权限不足 / 路径越界                      | 拒绝读仓外路径；返回错误；不泄露敏感绝对路径细节过度               | 视权限修复            | 「无法读取文档」             |
| 目标 md 不存在或非 utf-8                  | 404 / 解析错误提示                             | 是（改路径后）          | 明确失败，非崩溃             |
| 空远程误以为已有脚手架                        | README / 本 SPEC 标明入口；clone 空仓后按 task 脚手架 | —                | 文档层                  |
| 脏父仓误提交                             | 本仓独立 git；父仓 ignore 由维护者已处理则无需本仓再跟        | 预防为主             | 维护者 git 纪律           |
| 浏览器试图直调 CLI                        | 架构禁止；无前端暴露的 spawn                        | 否（设计约束）          | N/A                  |
| 用 UI / 聊天代替闸 approved              | 产品拒绝写闸；纪律上人改闸表才算                         | 否                | 页内只读声明               |


---

## 6. 依赖与引用


| 类                     | 引用                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **远程 SSH**            | `git@github.com:Cyning12/cyning-harness-web.git`                                                                    |
| **远程 HTTPS**          | `https://github.com/Cyning12/cyning-harness-web.git`                                                                |
| **本地推荐根**             | `/Users/cyning/Desktop/Projects/cyning-harness-web`                                                                 |
| **harness**           | `@cyning/harness` ≥ **2.17.0**（npm 已发布 · 校验 PASS）· `obs_status.v1` / `obs_timeline.v1` + close-loop 硬闸（U0+U1+G2 P0） |
| **PLAN（方案 · 非 SPEC）** | 工作区 `docs/harness/guides/PLAN_cyning_harness_web_obs_demo_v1_zh.md`                                                 |
| **GUIDANCE（边界）**      | 工作区 `docs/harness/guides/GUIDANCE_harness_process_observability_shell_boundary_v1_zh.md`                            |
| **SPEC 模板**           | 工作区 `docs/harness/SPEC_TEMPLATE_v1_zh.md`                                                                           |
| **Ops Desk（仅参考）**     | `ops-desk-web` `/obs` · `src/views/ObsView.vue`（fixture UI 形状；勿抄登录 / 业务 API）                                        |
| **00 / 30 Prompt**    | 工作区 `docs/harness/prompts/PROMPT_00_…` · `PROMPT_30_…`                                                              |
| **篇 3 立项判断**          | `ai_coding_governance/narrative/discipline_package_series/NOTE_篇3立项判断_对照cyning-harness_20260725_zh.md`              |
| **产品 CLI 真值**         | `cyning-harness` · `status` / `timeline` / `verify` / `gate-check`（USER_GUIDE）                                      |


---

## 7. 思考轮（10-spec 回填 · 默认 R0–R5）

> **00 只预置空槽**；**10-spec** 专责回填。未签收 / 未派 10-spec 前保持「（待填）」。

### R0 · 读入与约束

（待填）

### R1 · 范围 / 非范围 / 场景

（待填）

### R2 · 方案对比

（待填）

### R3 · 边界 / 失败语义 / 安全

（待填）

### R4 · 验收 / 可测性 / test_strategy

（待填）

### R5 · SPEC 签收就绪 · 是否可交 00 出 task

（待填）

### 思考轮控制


| 字段                     | 值             |
| ---------------------- | ------------- |
| `actual_last_round`    | （待填）          |
| `early_stop`           | `no`          |
| `early_stop_reason`    | —             |
| `residual_risks`       | （待填）          |
| `round_extension_note` | （仅 R6+ 或裁量时填） |


---

## 附录 A · 分阶段推进图（文本）

```text
Phase A0 Inform bootstrap（可独立 task）
         · 01_struct 模块表 + 术语/轻量本体 + HG-GRAPH-MODULES
         · 先于改码脚手架

Phase A  脚手架 + 读盘 API + 路由 / · /obs · /docs
         · pnpm + Vite + Vue3 + TS
         · 薄 middleware/Express：读 md +（可先 stub/再接）CLI JSON
         · 页内只读声明 + 失败可读错误
         · 可多 task；每 task 答 graph_delta；PR 合入

Phase B  harness init/upgrade + 样例落盘 + live 投影打磨
         · @cyning/harness ≥2.17.0 接入 status/timeline --json + close-loop 硬闸
         · 种 demo task，使 /obs live 非空；/docs mtime「最新」感知
         · 依赖：A 验收

── 以下为「原 LLM-C 之前」增补 · 纪律包实战 / 篇 3 ──

Phase C  帽链 dogfood（本仓真实一轮）
         · task→闸→gate-check/verify→30 微改→review/CLOSE
         · /obs 对照闸前后；落盘 docs/evidence/chain_dogfood_*
         · 产品缺陷 → issue 草稿（不改产品仓码）
         · 依赖：B 验收

Phase D  HGM 消费者闭环
         · timeline 显式策略（含 --ingest 何时用）
         · Web 展示 timeline ↔ status；空事件/WARN 可读
         · 命中篇 3「消费者侧 dogfood」；证据可公开摘录
         · 依赖：C（或与 C 串行紧随；00 不得并行派两个 30）

Phase E  CI + 负向边界 + 证据包收口
         · CI/脚本：harness verify（+ 必要 gate-check）
         · 负向自动化：无 CLI / 无 task / 禁写闸
         · docs/evidence/SUMMARY：可复现命令 + 小样本计数/耗时
         · 依赖：D（至少 status/timeline 路径稳定）

Phase F  （可选 · 原 Phase C · 默认 out of v1 必做集）
         · LLM 起草 task 草案；禁止 LLM 改闸 approved
         · 仅 00 显式开 task 或维护者改签升格后执行
```

串行约束：A → B → C → D → E；（F 默认不建）。**每 Phase 可多 task**；默认一次只派一个 30；并行须 worktree。合入仅经 PR+CI。00 不编码。

---

## 附录 B · 建议下游 task（epic 签收后由 00 起草 · 示意 · 可再拆）


| 建议 slug（示意）                             | 阶段       | 说明                                                  |
| --------------------------------------- | -------- | --------------------------------------------------- |
| `task_web_obs_demo_inform_bootstrap_v1` | A0 / A 前 | 模块表 + 术语/轻量本体 + `HG-GRAPH-MODULES`；可与脚手架拆开          |
| `task_web_obs_demo_scaffold_*`          | A        | 可拆：Vite 壳 / 路由页 / 读盘 API / 只读声明                     |
| `task_web_obs_demo_live_obs_*`          | B        | 可拆：harness init · status API · timeline API · UI 打磨 |
| `task_web_obs_demo_chain_dogfood_*`     | C        | 可拆：样例帽链剧本 · 微改 30 · 证据采集                            |
| `task_web_obs_demo_hgm_consumer_*`      | D        | 可拆：ingest 策略 · Web timeline · 对照文档                  |
| `task_web_obs_demo_ci_evidence_*`       | E        | 可拆：Actions · 负向测 · 证据 SUMMARY · 产品 issue 草稿         |
| （默认不建）`…_llm_draft_*`                   | F        | 显式升格后                                               |


每 task 必含：`required_invoke_hats` 或 profile、`git_branch`、`graph_delta` 策略、`experience_capture`、KPI 空槽、failure_paths、PR 合并门禁。下游闸：**00 代签**。

---

## 附录 C · 00 阶段增补思考（非 10-spec · 供 epic 签收阅读）

> 下列为 **00 编排层**多轮阶段思考，用于扩展附录 A；**不**填 §7 R0–R5（仍留给可选 10-spec）。

### C-R1 · 原 A/B/C 缺口

- 原 Phase C=LLM 过早：未先证明「落盘真值 + CLI + Web」在绿野仓可靠，LLM 只会放大噪声。
- 篇 3 暂缓点是 **量化** 与 **HGM 消费者 dogfood**，不是再讲一遍 ingest；本仓 Web 正好是消费者壳。

### C-R2 · 候选阶段（曾考虑 / 取舍）


| 候选                      | 结论                                     |
| ----------------------- | -------------------------------------- |
| 多仓聚合看板                  | **不做**（§3）；偏离单仓 dogfood                |
| Neo4j / patterns G2 全做  | **不做**（产品未立项）；本仓只消费已发布 CLI             |
| 仅截图 Ops Desk fixture    | **不足**；无法回馈纪律包实战                       |
| 帽链完整 dogfood（现 C）       | **做**；直接测 gate-check/verify/status 一致性 |
| timeline ingest 闭环（现 D） | **做**；对齐篇 3 条件②                        |
| CI+负向+证据包（现 E）          | **做**；给小样本可公开数字，缓解条件①                  |
| LLM 起草（现 F）             | **后置可选**                               |


### C-R3 · 对纪律包的回馈形态

1. `docs/evidence/*.md`：复现命令、期望 vs 实际、阻塞次数。
2. 产品仓 issue 草稿（标题/复现/版本钉死 ≥2.17.0）。
3. **不**在本仓 30 任务里改 `cyning-harness` 源码。

### C-R4 · 风险

- 证据包写太大 → 00 约束「可公开摘要 ≤ 约定页」在 task 里写死。  
- 00 代签闸被滥用 → §0 明示维护者可抽查否决；Web 仍不可写闸。  
- Phase C 的「30 微改」范围必须极小（如 README 一行），避免 Demo 变业务。

### C-R5 · 签收含义

维护者批准本 epic = 批准 **A–E 为目标态、F 默认不做、00 代签下游并严禁编码、§0.1 闭环纪律**。不要求维护者再签每个 Phase task。

---

## 附录 D · 产品包能力对照 + 待维护者澄清（自主 loop）

### D.1 本次验证摘要（`@cyning/harness`）


| 主题                    | 包内是否「强要求」         | 说明                                                       |
| --------------------- | ----------------- | -------------------------------------------------------- |
| 每次改码更新 graph          | **弱/条件**          | 强的是 `HG-GRAPH-MODULES` + 可选 `--graph`；非逐 commit 自动检 diff |
| invoke 多帽落盘           | **强（close）**      | 2.12+ close 硬闸；verify 仅 WARN                             |
| 开工前业务本体设定             | **无强制 CLI**       | 产品本体 ≠ 业务仓语义仪式；建议本仓自建 + 回馈 ONBOARDING                    |
| KPI 打分                | **模板有 · CLI 几乎无** | 仅 `kpi_section` 存在性；无分数/量表硬校验                            |
| experience_capture    | **元信息字段**         | 未见 close 硬挡缺经验段（以模板纪律为主）                                 |
| worktree / git_branch | **模板字段**          | 包不替你建 worktree；编排纪律                                      |
| PR/CI/gh merge        | **包外**            | 属 GitHub 工作流；本 epic 自定                                   |


### D.2 建议回馈 `cyning-harness` 的缺口（**已升格为升级列车**）

> **完整分析 + Prompt（工作区）**：  
>
> - `[../../docs/harness/guides/ANALYSIS_cyning_harness_close_loop_hard_gates_gap_20260728_v1_zh.md](../../docs/harness/guides/ANALYSIS_cyning_harness_close_loop_hard_gates_gap_20260728_v1_zh.md)`  
> - `[../../docs/harness/guides/PLAN_cyning_harness_close_loop_hard_gates_upgrade_v1_zh.md](../../docs/harness/guides/PLAN_cyning_harness_close_loop_hard_gates_upgrade_v1_zh.md)`  
> - `[../../docs/harness/prompts/PROMPT_00_cyning_harness_close_loop_hard_gates_upgrade_v1_zh.md](../../docs/harness/prompts/PROMPT_00_cyning_harness_close_loop_hard_gates_upgrade_v1_zh.md)`


| Gap | 主题                        | 默认    |
| --- | ------------------------- | ----- |
| G1  | `graph_delta` close 校验    | U1 必做 |
| G3  | KPI 打分 close 最小硬闸         | U1 必做 |
| G4  | `experience_capture` 经验节  | U1 必做 |
| G2  | consumer ontology 模板      | U2    |
| U0  | pre-30 invoke verify 硬闸发版 | 前置    |


**闸序**：升级前置 **已满足（`@cyning/harness@2.17.0`）** → 维护者签本 epic 后，00 可拆本仓 task 并派 30。校验：工作区 `docs/harness/guides/VERIFY_cyning_harness_2_17_0_close_loop_gates_20260728_zh.md`。

### D.3 请维护者拍板（签收前 · 便于 00 自主 loop）


| #   | 问题                                               | 00 默认（若你不改）                                                |
| --- | ------------------------------------------------ | ---------------------------------------------------------- |
| Q1  | 改码 task 是否**一律** `verify --graph`？               | **是**                                                      |
| Q2  | invoke profile 默认 `default` 还是 dogfood 用 `full`？ | 改码 `default`；帽链 dogfood（Phase C）用 `full`                   |
| Q3  | `--allow-invoke-gap` 是否永不使用？                     | **永不**（除非维护者书面例外）                                          |
| Q4  | PR 合并策略：squash vs merge commit？                  | **squash**                                                 |
| Q5  | CI 最低集：从 Phase A 还是仅 Phase E 挂 harness verify？   | A 起：lint/test/build；**E 起**加 harness verify（A–D 本地 verify） |
| Q6  | Inform bootstrap 是否独立 task（A0）？                  | **是** · 先于脚手架改码                                            |
| Q7  | KPI 量表：沿用工作区 `KPI_RUBRIC_v1_2` 还是本仓简表？           | 若工作区可引用则引用；否则本仓四维 1–5                                      |
| Q8  | 00 代签 `HG-GRAPH-MODULES` 是否允许？                   | **允许**（与下游闸一致）；你可抽查                                        |
| Q9  | 远程 `main` 保护：是否已开 branch protection？             | 签收后 00 用 `gh` 检查；未开则提醒你开                                   |
| Q10 | 证据与 PR 是否必须可公开（篇 3）？                             | 默认 **可公开摘要**；密钥/绝对机径脱敏                                     |


未回复 Q1–Q10 时，00 按「00 默认」列执行。

---

## 修订记录


| 日期         | 摘要                                                                               |
| ---------- | -------------------------------------------------------------------------------- |
| 2026-07-28 | 00 起草完整需求 SPEC（draft）                                                            |
| 2026-07-28 | 增补 §0 签收权下放；Phase C–E；附录 C；对齐篇 3                                                 |
| 2026-07-28 | §0.1 闭环纪律；附录 B 多 task；附录 D +Q1–Q10                                               |
| 2026-07-28 | 附录 D.2 升格：闭环硬闸升级列车 POINTER（先于本仓改码 30）                                            |
| 2026-07-28 | 缺口校验 PASS：`@cyning/harness@2.17.0` npm 已发布；最低依赖 ≥2.17.0；升级阻塞解除（仍须 epic Sign-off） |
| 2026-07-28 | **维护者签收 approved** · skip_10_spec=yes · 下游闸权交 00 · 入口改自主 loop Prompt |


