# Evidence · Phase C 帽链 dogfood（2026-07-28）

| 项 | 值 |
|----|-----|
| **task** | [`docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md`](../tasks/active/task_web_obs_demo_chain_dogfood_v1.md) |
| **slug** | `web-obs-demo-chain-dogfood` |
| **纪律包** | `@cyning/harness@2.17.0` |
| **branch** | `task/web-obs-demo-chain-dogfood` |
| **hat** | 30（微改 = 本 evidence + 可选 README POINTER；未改 Vue/API） |
| **采集时区** | CST · 2026-07-28 |

> Web `/obs` 为**只读投影 · 非签收真值**。闸表真值在 task `人工闸` 表。

---

## 1. 可复现命令

在仓根执行：

```bash
# 闸扫（人读表）
npx @cyning/harness@2.17.0 gate-check \
  --target . \
  --task docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md

# 正式 verify（本 task graph_delta=none · 不加 --graph）
npx @cyning/harness@2.17.0 verify \
  --target . \
  --task docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md

# 过程投影（CLI）
npx @cyning/harness@2.17.0 status \
  --target . \
  --task docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md \
  --json

npx @cyning/harness@2.17.0 timeline \
  --target . \
  --task docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md \
  --json

# Web /obs 对照（另开终端）
pnpm install
pnpm dev
# 浏览器打开 http://localhost:5173/obs
# 或 curl（若本机设了 http_proxy，对 localhost 加 --noproxy '*'）
curl --noproxy '*' -sS \
  "http://localhost:5173/api/obs/status?task=docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md&source=live"
curl --noproxy '*' -sS \
  "http://localhost:5173/api/obs/status?task=docs/tasks/active/task_web_obs_demo_chain_dogfood_v1.md&source=stub"
```

---

## 2. 闸表真值（开工前 GATE_VERIFY）

读自 task（**非** invoke 字面）：

| human_gate_id | status | blocks_hats |
|---------------|--------|-------------|
| HG-TASK-DRAFT | approved | 22-R1, 30 |
| HG-AUDIT-R1 | approved | 30 |
| HG-GRAPH-MODULES | approved | 30 |

代签依据：[`CHECK_00_gate_proxy_basis_20260728.md`](./CHECK_00_gate_proxy_basis_20260728.md) · audit R1 pass。

本轮 dogfood 由 00 **先代签三闸再派 30**，故 CLI/`/obs` 全程 `may_start_30: true`（无 pending→approved 的现场翻转）。可观测增量见下节 `last_invoke` / invoke-gap WARN。

---

## 3. 闸后过程摘录（落盘 30 invoke 前 → 后）

### 3.1 `gate-check` / `verify`（脱敏）

**落盘 30 invoke 前**

```text
=== Harness gate-check ===
manifest.version: 2.17.0
manifest.preset: harness-only
| HG-TASK-DRAFT | approved | …
| HG-AUDIT-R1 | approved | ✅ 可 30 |
| HG-GRAPH-MODULES | approved | ✅ |
闸检查: 未发现阻塞
WARN: invoke hats gap · 缺 30,40（要求 10,30,40 · 已有 00,10）
VERIFY: PASS · task_web_obs_demo_chain_dogfood_v1.md
```

**落盘 30 invoke 后**

```text
闸检查: 未发现阻塞
WARN: invoke hats gap · 缺 40（要求 10,30,40 · 已有 00,10,30）
VERIFY: PASS · task_web_obs_demo_chain_dogfood_v1.md
```

说明：缺 40 **不挡** `may_start_30`；CLOSE 前须由 00 另派 40 补齐（本棒范围不含 40）。

### 3.2 `status --json` 关键字段对照

| 字段 | 落盘 30 前 | 落盘 30 后 |
|------|------------|------------|
| `may_start_30` | `true` | `true` |
| `blockers` | `[]` | `[]` |
| `gates[*].status` | 三行 `approved` | 同左 |
| `last_invoke.hat_id` | `"10"` | `"30"` |
| `last_invoke.path` | `…/invoke_20260728_10_…` | `…/invoke_20260728_30_…` |
| `reviews.R1` | `true` | `true` |
| `reviews.CLOSE` | `false` | `false` |
| `hgm.event_count` | `0` | `0` |
| `next_hint`（摘要） | 闸已齐 · 跑 verify 后开 30 | 30 已执行 · 正式 verify 后做 40 |

**落盘 30 后摘录（脱敏 · 无绝对机位路径）**：

```json
{
  "schema_version": "obs_status.v1",
  "task_slug": "web-obs-demo-chain-dogfood",
  "status": "in_progress",
  "may_start_30": true,
  "blockers": [],
  "last_invoke": { "hat_id": "30" },
  "reviews": { "R1": true, "CLOSE": false },
  "hgm": { "event_count": 0, "last_at": null },
  "verify_preview": { "ok": true }
}
```

### 3.3 `timeline --json`（默认不 ingest）

```json
{
  "schema_version": "obs_timeline.v1",
  "task_slug": "web-obs-demo-chain-dogfood",
  "event_count": 0,
  "returned": 0,
  "ingested": false,
  "events": []
}
```

CLI 提示：无 HGM 数据；可显式 `--ingest` 或先 `graph ingest`（**本 Phase 默认不做** · 归 Phase D）。

---

## 4. `/obs` 对照说明

| 检查项 | 结果 |
|--------|------|
| `GET /obs` | HTTP 200（Vite 开发态） |
| live `GET /api/obs/status?task=…&source=live` | `ok: true`；`data` 与 CLI `status --json` **字段一致**（含 `may_start_30`、`last_invoke.hat_id=30`、三闸 approved） |
| stub `?source=stub` | `ok: true`；固定样例载荷；`may_start_30: true`；**非** CLI 真值 |
| live timeline | `event_count: 0`（与 CLI 一致；未 ingest） |

### live vs stub 字段差异（摘要）

| 维度 | live（透传 CLI） | stub |
|------|------------------|------|
| 版本键名 | `schema_version: "obs_status.v1"` | `schema: "obs_status.v1"` |
| `source` 标记 | 无（CLI 原样） | `"stub"` |
| `last_invoke` / `blockers` / `hgm` / `next_hint` | 有 | 无 |
| `gates` | 含 `blocks_hats` | 仅 `id` + `status` |
| 用途 | 过程对照 | UI/契约对照开关 |

页内纪律：横幅「只读投影 · 非签收真值」；无写闸 API（`/api/gates/*` → 405）。

---

## 5. 产品缺陷 · 结论

### 结论：**无阻塞缺陷**

本轮帽链（闸 → verify → 30 微改 evidence → `/obs` 对照）可走通；`may_start_30` 与闸表一致；Web live 投影与 CLI 一致。未发现挡开工的产品包错误。

### 非阻塞观察（issue 草稿 · 不改产品仓本棒）

| ID（草稿） | 严重度 | 现象 | 建议归属 |
|------------|--------|------|----------|
| DRAFT-OBS-SCHEMA-KEY | low | stub 用 `schema`，CLI live 用 `schema_version`，前端需双读 | 本仓 stub 对齐 **或** 产品仓契约统一（Phase E 可记） |
| DRAFT-TIMELINE-EMPTY | info | 默认无 ingest → timeline 空；符合「禁默认 ingest」 | Phase D 显式 ingest 闭环 |
| DRAFT-INVOKE-GAP-40 | info | verify WARN 缺 40 不挡 30；CLOSE 前须补 | 编排纪律（00 派 40），非缺陷 |

---

## 6. 本棒交付清单

| 交付 | 路径 / 说明 |
|------|-------------|
| 30 invoke | `docs/harness/invokes/by-task/web-obs-demo-chain-dogfood/invoke_20260728_30_web-obs-demo-chain-dogfood.md` |
| evidence | 本文件 |
| README POINTER | 一行链至本 evidence（若已合入） |
| 40 / CLOSE | **不在本棒** · 00 另派 |

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 30 首采 · Phase C dogfood |
