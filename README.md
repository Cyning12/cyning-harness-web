# cyning-harness-web

> **定位**：Harness **过程可观测**单仓 Demo（dogfood / 教学）。  
> **远程**：`git@github.com:Cyning12/cyning-harness-web.git`  
> **Open Folder**：本目录根（独立 git 仓）。  
> **纪律包**：`@cyning/harness` ≥ **2.17.0**

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

## 本地启动（Phase A 脚手架）

```bash
pnpm install
pnpm dev
```

浏览器打开 Vite 提示的本地地址：

| 路由 | 说明 |
|------|------|
| `/` | 说明页 · 只读原则 |
| `/obs` | stub `obs_status.v1` / `obs_timeline.v1`（非 live CLI） |
| `/docs` | 扫读 `docs/tasks/**` Markdown 只读预览 |

合并前质量门：

```bash
pnpm lint
pnpm test
pnpm build
```

薄观测 API（Vite middleware · 仅 Node 侧 · 只读）：

- `GET /api/docs` · `GET /api/docs/content?path=…`
- `GET /api/obs/status` · `GET /api/obs/timeline`
- **无**写闸 API；**禁止**浏览器 `npx`

## 状态

| 项 | 值 |
|---|---|
| SPEC | `approved` · 2026-07-28 · skip_10_spec |
| 下游闸 | **00 代签** |
| 阶段 | A0 CLOSED → **A scaffold** → B → C → D → E（F 默认不做） |
| 契约 | `obs_status.v1` / `obs_timeline.v1`（A：stub；B：live CLI） |
