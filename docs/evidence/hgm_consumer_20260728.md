# Evidence · Phase D HGM 消费者闭环（2026-07-28）

| 项 | 值 |
|----|-----|
| **task** | [`docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md`](../tasks/active/task_web_obs_demo_hgm_consumer_v1.md) |
| **slug** | `web-obs-demo-hgm-consumer` |
| **纪律包** | `@cyning/harness@2.17.0` |
| **branch** | `task/web-obs-demo-hgm-consumer` |
| **hat** | 30（ingest 策略 + `/obs` timeline/status 对照 + 测断言） |
| **采集时区** | CST · 2026-07-28 |

> Web `/obs` 为**只读投影 · 非签收真值**。闸表真值在 task `人工闸` 表。  
> **禁止默认静默 ingest**：默认 CLI argv **不含** `--ingest`。

---

## 1. Ingest 策略（公开可摘录）

### 1.1 默认：off

| 路径 | 行为 |
|------|------|
| CLI | `npx @cyning/harness@2.17.0 timeline --task … --target … --json`（无 `--ingest`） |
| Web API | `GET /api/obs/timeline?task=…&source=live`（不传 `ingest`） |
| `/obs` UI | 「显式 timeline `--ingest`」复选框默认 **未勾选** |
| status | **永不**带 `--ingest`（status 无该旗标） |

空事件时 CLI 可能在 stderr 打印：

    WARN: 无 HGM 数据（该 task 无匹配事件）。可先: npx @cyning/harness graph ingest …；或本命令加 --ingest（显式写盘）

Web 将 WARN 行投影到页内「CLI WARN」区；timeline `event_count=0` / `events=[]` 显示空事件说明，**不崩溃**。

### 1.2 显式：on（条件 · 风险）

**何时可开**

- 演示「消费者侧写盘 → 再读 timeline」闭环；
- 维护者确认当前仓允许追加 HGM events；
- 非 CI 默认路径、非静默后台刷新。

**入口（须显式）**

| 入口 | 写法 |
|------|------|
| CLI | 追加 `--ingest` |
| API | `?ingest=1`（或 `true` / `yes` / `on`） |
| UI | 勾选「显式 timeline `--ingest`」→ 页内警告「会写 events」后重载 |

**风险**

- `--ingest` **会写 events**（磁盘 HGM 事件），非纯只读投影；
- 重复 ingest 可能产生额外事件噪声；
- Demo/教学环境可接受；生产业务仓须自行评估；
- **本仓禁止**把 ingest 做成默认查询或定时静默调用。

### 1.3 测断言（机械）

- `buildHarnessCliArgs(timeline)` 默认 argv **不含** `--ingest`
- `getObsTimeline(…, { ingest: true })` 才含 `--ingest`
- `resolveIngestFlag(null|''|'0'|'false') === false`

---

## 2. `/obs` · status 与 timeline 对照

1. `pnpm dev` → 打开 `http://localhost:5173/obs`
2. 选 active task（默认优先 `task_web_obs_demo_hgm_consumer_v1.md`）
3. source=`live`，**不**勾选 ingest → 重载
4. 页内可见：
   - status JSON（含 `hgm.event_count` 等）
   - timeline JSON（常 `event_count: 0` / `events: []`）
   - 对照说明行（比较两边 event_count）
   - 空事件说明 + CLI WARN（若有）

等价 curl（若本机有 http_proxy，对 localhost 加 `--noproxy '*'`）：

```bash
curl --noproxy '*' -sS \
  "http://localhost:5173/api/obs/status?task=docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md&source=live"
curl --noproxy '*' -sS \
  "http://localhost:5173/api/obs/timeline?task=docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md&source=live"
# 显式 ingest（会写 events · 仅演示时用）
curl --noproxy '*' -sS \
  "http://localhost:5173/api/obs/timeline?task=docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md&source=live&ingest=1"
```

---

## 3. 可复现命令（CLI）

```bash
npx @cyning/harness@2.17.0 verify \
  --target . \
  --task docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md \
  --graph

npx @cyning/harness@2.17.0 status \
  --target . \
  --task docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md \
  --json

# 默认只读 timeline（无 --ingest）
npx @cyning/harness@2.17.0 timeline \
  --target . \
  --task docs/tasks/active/task_web_obs_demo_hgm_consumer_v1.md \
  --json

# 显式写盘（风险见 §1.2）
# npx @cyning/harness@2.17.0 timeline … --json --ingest
```

合并前：

```bash
pnpm lint && pnpm test && pnpm build
```

---

## 4. 回馈产品仓

本棒 **未改** `cyning-harness` 产品源码。  
观察：空 timeline 时 WARN 文案清晰，指引 `graph ingest` 或 `--ingest`；Web 侧已把 WARN / 空态做成可读投影。  
**无阻塞产品缺陷**（仅消费侧 dogfood）；若后续要「status 与 timeline 事件源统一字段名」可另开产品仓 issue。

---

## 5. 闸与 verify（开工摘录）

| human_gate_id | status |
|---------------|--------|
| HG-TASK-DRAFT | approved |
| HG-AUDIT-R1 | approved |
| HG-GRAPH-MODULES | approved |

`VERIFY: PASS`（含 `--graph`）；缺 40 不挡 30（CLOSE 前另派）。
