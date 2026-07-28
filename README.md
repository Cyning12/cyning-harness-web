# cyning-harness-web

> **定位**：Harness **过程可观测**单仓 Demo（dogfood / 教学）。  
> **远程**：`git@github.com:Cyning12/cyning-harness-web.git`  
> **Open Folder**：本目录根（独立 git 仓）。  
> **纪律包**：`@cyning/harness` ≥ **2.17.0**（已 `init` · preset `harness-only`）

## 入口（epic 已签收 · 自主统筹）

1. **新窗口**粘贴 **00 自主 loop**：  
   `/Users/cyning/Desktop/Projects/docs/harness/prompts/PROMPT_00_cyning_harness_web_autonomous_loop_v1_zh.md`
2. SPEC 真值（已 `approved`）：[`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md)
3. 方案参考：工作区 `docs/harness/guides/PLAN_cyning_harness_web_obs_demo_v1_zh.md`
4. 30 仅闸后由 00 派发（Open Folder = 本仓根）

## 原则

1. Agent 落盘 task / invoke / review（真值在 `docs/**`）。  
2. Web 只读：文档 + `status` / `timeline`。  
3. 禁止：浏览器 `npx`；UI 代签；默认不做 LLM 建 task（Phase F）。  
4. 00 **不编码**；合入经 PR + CI；钉 `@cyning/harness@≥2.17.0`。  
5. **过程人闸**：00 可代签（须检查依据）· [`docs/harness/auth/AUTH_00_human_gate_proxy_v1.md`](docs/harness/auth/AUTH_00_human_gate_proxy_v1.md) · 台账 [`docs/evidence/CHECK_00_gate_proxy_basis_20260728.md`](docs/evidence/CHECK_00_gate_proxy_basis_20260728.md)。  
6. **人类终验**：仅 epic 全完成后 · [`docs/harness/ACCEPTANCE_human_epic_checklist_v1.md`](docs/harness/ACCEPTANCE_human_epic_checklist_v1.md)。

## Inform 真值（A0）

| 路径 | 说明 |
|------|------|
| [`docs/_tech_graph/01_struct.md`](docs/_tech_graph/01_struct.md) | 一级模块表 · `HG-GRAPH-MODULES` |
| [`docs/_tech_graph/00_main.md`](docs/_tech_graph/00_main.md) | 主路径：Agent 落盘 → Web 只读投影 |
| [`docs/_tech_graph/99_mermaid_protocol.md`](docs/_tech_graph/99_mermaid_protocol.md) | Mermaid 协议 POINTER |
| [`docs/meta/ONTOLOGY_web_obs_demo_v1.md`](docs/meta/ONTOLOGY_web_obs_demo_v1.md) | 消费者本体切片（术语 / 边界） |

## 本地启动

```bash
pnpm install
pnpm dev
```

浏览器打开 Vite 提示的本地地址：

| 路由 | 说明 |
|------|------|
| `/` | 说明页 · 只读原则 |
| `/obs` | live `status` / `timeline` 对照（可切 stub；可选显式 ingest） |
| `/docs` | 扫读 `docs/tasks/**` Markdown 只读预览 |

### 如何使用 `/obs`

1. 打开 `/obs`：默认优先 active `hgm_consumer` task（若列表为空则用内置默认路径）。
2. 在 **task** 下拉框选择 `docs/tasks/active|done/**.md`。
3. **source**：`live`（默认，服务端 spawn CLI）或 `stub`（对照）。
4. **显式 `--ingest`**：默认关闭；勾选后页内警告「会写 events」，仅 timeline 请求带 `?ingest=1`。
5. 点 **重新加载**；空事件 / CLI WARN 页内可读；status 与 timeline 有对照说明。
6. 页内横幅 **「只读投影 · 非签收真值」**；不提供写闸。

Phase D ingest 策略真值：[`docs/evidence/hgm_consumer_20260728.md`](docs/evidence/hgm_consumer_20260728.md)。

合并前质量门：

```bash
pnpm lint
pnpm test
pnpm build
```

### CI · harness verify（Phase E+）

`quality` workflow 在 lint/test/build 之后执行：

```bash
npx --yes @cyning/harness@2.17.0 verify \
  --target . \
  --task docs/tasks/done/task_web_obs_demo_hgm_consumer_v1.md
```

| 策略 | 说明 |
|------|------|
| **task 路径** | 默认用 `docs/tasks/done/` 已 CLOSE 样例（帽链齐、闸稳） |
| **勿用 active** | 进行中 task 可能缺 40 / 漂移，不适合作 CI 金样 |
| **钉版本** | `@cyning/harness@2.17.0`；禁止 `--allow-*-gap` |
| **证据** | [`docs/evidence/SUMMARY_obs_demo_20260728.md`](docs/evidence/SUMMARY_obs_demo_20260728.md) |

薄观测 API（Vite middleware · 仅 Node 侧 · 只读）：

- `GET /api/docs` · `GET /api/docs/content?path=…`
- `GET /api/obs/status?task=…&source=live|stub`
- `GET /api/obs/timeline?task=…&source=live|stub[&ingest=1]`
- live 等价于服务端：
  `npx @cyning/harness@2.17.0 status|timeline --target <仓根> --task <path> --json`
  （**默认不** `--ingest`；仅 timeline 且显式 `ingest=1` 时追加）
- **无**写闸 API；**禁止**浏览器 `npx`

Harness 接入产物（`init` · preset `harness-only`）：

- `.cyning-harness/manifest.json`（版本真值）
- `docs/harness/prompts/**` · invoke 模板 · `.cursor/rules/06-harness-pointer.mdc`
- `.cyning-harness/local.json` 已 gitignore（机位路径）

## 状态

| 项 | 值 |
|---|---|
| SPEC | `approved` · 2026-07-28 · skip_10_spec |
| 下游闸 | **00 代签** |
| 阶段 | A0 CLOSED → A CLOSED → B CLOSED → C CLOSED → D CLOSED → **E ci-evidence**（F 默认不做） |
| 契约 | `obs_status.v1` / `obs_timeline.v1`（B：live CLI；可 stub 切换；D：显式 ingest） |
| Phase C 证据 | [`docs/evidence/chain_dogfood_20260728.md`](docs/evidence/chain_dogfood_20260728.md) |
| Phase D 证据 | [`docs/evidence/hgm_consumer_20260728.md`](docs/evidence/hgm_consumer_20260728.md) |
| Phase E SUMMARY | [`docs/evidence/SUMMARY_obs_demo_20260728.md`](docs/evidence/SUMMARY_obs_demo_20260728.md) |
| 产品反馈 | [`docs/evidence/ISSUE_DRAFT_cyning_harness_obs_demo_feedback_20260728.md`](docs/evidence/ISSUE_DRAFT_cyning_harness_obs_demo_feedback_20260728.md) |
