# SPEC：构建 cyning-harness-web 过程可观测 Demo（单仓 · v1）

> **状态**：`draft`（待维护者签收）  
> **track**：`epic`  
> **关联图谱**：（可选后置）`docs/_tech_graph/`  
> **下游**：SPEC 签收 → 00 起草 task →（可选）10-spec / 10-task → 闸后按 Phase 派 30  
> **方案参考（不替代本 SPEC）**：工作区 `docs/harness/guides/PLAN_cyning_harness_web_obs_demo_v1_zh.md`

### Sign-off（维护者）

| 项 | 值 |
|----|-----|
| **维护者** | （待填） |
| **日期** | （待填） |
| **结论** | `pending` |
| **备注** | 聊天「继续」≠ approved；须本表改为 `approved` 或书面等价签收 |

---

## Harness 元信息

| 字段 | 值 |
|------|-----|
| **spec_slug** | `cyning-harness-web-obs-demo` |
| **test_strategy** | `required` |
| **test_strategy_note** | 关键路径须可失败自动化：至少覆盖薄 API/middleware 调 CLI 的成功与失败投影；前端冒烟可用最小单测或 build 级校验；合并前建议 `pnpm lint` → `pnpm test` → `pnpm build` |
| **entry_invoke_10_spec** | `docs/harness/invokes/by-task/cyning-harness-web-obs-demo/PROMPT_10_spec_rethink_R1_R5.md`（签收后按需落盘） |
| **entry_invoke_00_draft** | 工作区 `docs/harness/prompts/PROMPT_00_cyning_harness_web_bootstrap_v1_zh.md` |
| **entry_invoke_30_bootstrap** | 工作区 `docs/harness/prompts/PROMPT_30_cyning_harness_web_bootstrap_v1_zh.md`（闸后；以已签 task 为准修订范围） |
| **skip_10_spec** | （签收时由维护者决定：走完整 10-spec / 或书面跳过并填日期） |

---

## 1. 背景与目标

**一句话目标**：在独立 Git 仓内跑通「本地 Agent 落盘 Harness 工件 → Web 只读浏览最新文档与 `status` / `timeline` 投影」。

相对 **Ops Desk P3b**（业务产品内嵌 `/obs` + fixture）：本仓是 Harness **dogfood / 教学 / 实验**单仓，数据来自**本仓真实落盘**（+ 可选 CLI JSON），不依赖 ops-desk-api 登录，也不绑架业务产品发版。

**为何单仓**：把「端到端落盘可观测」与 Ops Desk 业务壳解耦；Open Folder 对准本仓根即可 `pnpm dev`；避免 Demo 代码误入父级 Projects 仓或 ops-desk-* 业务仓。

---

## 2. 范围（v1 必须可验收）

### 2.1 产品行为

1. **本地 Agent 落盘真值**：在本仓写入 / 维护 harness 相关工件（至少：`docs/tasks/**`、`docs/harness/invokes/**`；可含 `docs/harness/reviews/**`、`.cyning-harness/events/**`）。Web **不**作为写入方。
2. **Web 只读**：
   - **文档浏览**：列出并可打开最新（或按 `mtime` 感知）的 task / 相关 md；
   - **过程投影**：展示 `harness status` / `harness timeline` 的 JSON 投影（契约见下）。
3. **薄服务端 / middleware**：仅在 Node 侧调用 harness CLI（或等价子进程）；**禁止**浏览器直接 `npx` / 调 CLI。
4. **页内明示**：只读投影 · 非签收真值；不可代签 `HG-*`。

### 2.2 技术栈（默认）

| 项 | 默认 | 说明 |
|----|------|------|
| 包管理 | `pnpm` | 与 Ops Desk web 对齐，降低抄 UI 成本 |
| 构建 | Vite | |
| UI | Vue 3 + TypeScript | 可参考 Ops Desk `ObsView.vue` **形状**；不复制业务登录 |
| UI 库 | Element Plus（建议） | 可选；若改栈须在 task 写清理由且保持**单栈单仓** |
| 服务 | Vite `server.middleware` / plugin，或同仓小 Express + proxy | 二选一或可切换；须满足「仅服务端调 CLI」 |

### 2.3 路由（至少）

| 路径 | 职责 |
|------|------|
| `/` | 说明页：定位、只读原则、如何 `pnpm dev`、如何落盘后刷新 |
| `/obs` | `status` / `timeline` 过程投影（可重载） |
| `/docs` | 文档列表 + md 正文只读预览 |

### 2.4 契约与版本

- **产品依赖**：`@cyning/harness` **≥ 2.16**
- **JSON 契约**：`obs_status.v1` · `obs_timeline.v1`
- **调用形态（服务端）示意**：

      npx @cyning/harness status --target <本仓根> --task <path> --json
      npx @cyning/harness timeline --target <本仓根> --task <path> --json

- `verify_preview` / `status --check` **不替代**正式 `harness verify`；UI 不得伪装为已 verify。

### 2.5 仓与工程

- 独立 git 仓；remote：`git@github.com:Cyning12/cyning-harness-web.git`
- `harness init`（或 upgrade）纳入交付链（建议 Phase B；preset 建议 `harness-only`，ide 按维护者习惯）
- 至少种 **1** 条样例 task（含可读闸表 / 最小 invoke 痕迹），使 `/docs` 与 `/obs` 在 happy path **非空**

---

## 3. 非范围（写死）

1. Web **不写闸**、**不代签**任何 `HG-*`（含把聊天结论当 approved）。
2. **初版不做** LLM 运行时自动建 task / 自动落盘（可列为 **Phase C** 后续；须另签或改签本 SPEC）。
3. **不**实现后端业务 LLM；**不**改 `ops-desk-*` / Ink 业务仓代码。
4. **不**做 Ops Desk 登录、多仓聚合、Neo4j、替代 `harness verify`、发 npm 包。
5. **不**把 Cursor / 各壳飞行中 transcript / wire 当作签收或 CLOSE 真值（遵守过程可观测 GUIDANCE）。
6. 00 / 本 SPEC **不**要求在本阶段脚手架业务实现；实现仅在闸后由 30 按 task 执行。

---

## 4. 验收标准

- [ ] **独立仓**：`git clone`（或已有独立 `.git`）后，`rev-parse --show-toplevel` 等于本仓根（≠ Projects 父仓）
- [ ] **启动**：本仓内 `pnpm install` → `pnpm dev` 可打开 UI（`/` · `/obs` · `/docs` 可路由到达）
- [ ] **文档**：落一条样例 task（或维护者/Agent 写入 `docs/tasks/active/*.md`）后，`/docs` 可见该文件并可打开正文
- [ ] **投影**：`/obs` 能显示 `status` 和/或 `timeline` 投影（契约字段可识别，如 `schema_version`）；支持重载
- [ ] **只读声明**：页内可见「只读投影 · 非签收真值」类提示
- [ ] **失败可读**：CLI 不可用、无 active task、读盘失败等场景有可读错误（非静默白屏）
- [ ] **边界**：无浏览器侧 `npx`；无 Web API 写入闸表为 `approved`
- [ ] **合并前 Verify（建议写入下游 task）**：`pnpm lint` → `pnpm test` → `pnpm build` 可执行且关键路径绿

---

## 5. failure_paths

| 触发条件 | 系统行为 | 可重试 | 用户可见 |
|----------|----------|--------|----------|
| 无 active task / 未指定 task | `/obs`（及 API）返回明确空态或错误码；不假装有投影 | 是（落盘或选 task 后重载） | 「无可用 task」类文案 |
| harness CLI 失败（未安装、版本过低、非 0 退出、超时） | API 返回错误载荷；UI 展示可读原因 + 重试 | 是 | 「CLI 不可用 / 调用失败」+ 摘要 |
| 读盘权限不足 / 路径越界 | 拒绝读仓外路径；返回错误；不泄露敏感绝对路径细节过度 | 视权限修复 | 「无法读取文档」 |
| 目标 md 不存在或非 utf-8 | 404 / 解析错误提示 | 是（改路径后） | 明确失败，非崩溃 |
| 空远程误以为已有脚手架 | README / 本 SPEC 标明入口；clone 空仓后按 task 脚手架 | — | 文档层 |
| 脏父仓误提交（本目录曾无独立 `.git`） | 本仓独立 git；父级 Projects `.gitignore` 应含 `/cyning-harness-web/`；禁止把 Demo 业务码 commit 进父仓 | 预防为主 | 维护者 git 纪律 |
| 浏览器试图直调 CLI | 架构禁止；无前端暴露的 spawn | 否（设计约束） | N/A |
| 用 UI / 聊天代替闸 approved | 产品拒绝写闸；纪律上人改闸表才算 | 否 | 页内只读声明 |

---

## 6. 依赖与引用

| 类 | 引用 |
|----|------|
| **远程 SSH** | `git@github.com:Cyning12/cyning-harness-web.git` |
| **远程 HTTPS** | `https://github.com/Cyning12/cyning-harness-web.git` |
| **本地推荐根** | `/Users/cyning/Desktop/Projects/cyning-harness-web` |
| **harness** | `@cyning/harness` ≥ 2.16 · `obs_status.v1` / `obs_timeline.v1` |
| **PLAN（方案 · 非 SPEC）** | 工作区 `docs/harness/guides/PLAN_cyning_harness_web_obs_demo_v1_zh.md` |
| **GUIDANCE（边界）** | 工作区 `docs/harness/guides/GUIDANCE_harness_process_observability_shell_boundary_v1_zh.md` |
| **SPEC 模板** | 工作区 `docs/harness/SPEC_TEMPLATE_v1_zh.md` |
| **Ops Desk（仅参考）** | `ops-desk-web` `/obs` · `src/views/ObsView.vue`（fixture UI 形状；勿抄登录 / 业务 API） |
| **00 / 30 Prompt** | 工作区 `docs/harness/prompts/PROMPT_00_…` · `PROMPT_30_…` |

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

| 字段 | 值 |
|------|-----|
| `actual_last_round` | （待填） |
| `early_stop` | `no` |
| `early_stop_reason` | — |
| `residual_risks` | （待填） |
| `round_extension_note` | （仅 R6+ 或裁量时填） |

---

## 附录 A · 分阶段推进图（文本）

```text
Phase A  脚手架 + 读盘 API + 路由 / · /obs · /docs
         · pnpm + Vite + Vue3 + TS
         · 薄 middleware/Express：读 md +（可先 stub/再接）CLI JSON
         · 页内只读声明 + 失败可读错误
         · 验收：pnpm dev 可开；/docs 能列样例；/obs 有投影或明确空/错态

Phase B  harness init/upgrade + 样例落盘 + live 投影打磨
         · @cyning/harness ≥2.16 接入 status/timeline --json
         · 种 demo task，使 /obs live 非空；/docs mtime「最新」感知
         · 依赖：Phase A 完成并验收

Phase C  （可选后续 · 默认 out of v1）
         · LLM 起草 task 草案（仍建议人/Agent 落盘；禁止 LLM 改闸 approved）
         · 除非维护者改签本 SPEC，否则不建 task、不派 30
```

串行约束：A → B；C 默认不建。一次只派一个 Phase 的 30。

---

## 附录 B · 建议下游 task（签收后由 00 起草 · 本附录非 task 真值）

| 建议 slug | 对应阶段 | 依赖 |
|-----------|----------|------|
| `task_web_obs_demo_scaffold_v1` | Phase A | SPEC approved |
| `task_web_obs_demo_live_obs_v1` | Phase B | Phase A 验收 |
| （不预建）Phase C | 可选 | 另签 / 改签 SPEC |

---

## 修订记录

| 日期 | 摘要 |
|------|------|
| 2026-07-28 | 00 起草完整需求 SPEC（draft · 待签收）；吸收 PLAN/GUIDANCE；R0–R5 空槽 |
