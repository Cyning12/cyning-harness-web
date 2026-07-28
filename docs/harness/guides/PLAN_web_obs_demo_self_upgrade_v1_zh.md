# PLAN · Demo 自我升级（cyning-harness-web · dogfood）

| 项 | 内容 |
|----|------|
| **状态** | `active` · 维护者同意 **C + R3**（2026-07-28）· 单 task 覆盖 S1+S2 |
| **日期** | 2026-07-28 |
| **仓** | `cyning-harness-web`（本仓） |
| **上游 epic** | [`docs/spec/SPEC-cyning-harness-web-obs-demo_v1.md`](../../spec/SPEC-cyning-harness-web-obs-demo_v1.md)（A0–E 已 CLOSE） |
| **纪律包** | `@cyning/harness` · 当前钉 **2.17.0** · `upgrade` CLI 已存在 |
| **编排** | 00 统筹（不编码）→ 闸后派 30 → PR + CI |

---

## 1. 一句话

让本 Demo **可安全、可观测、可复现地跟随纪律包升级**：版本钉唯一真值 → 维护者剧本执行 `harness upgrade` → 同步 CI/服务端钉 → Web **只读**展示「当前 / 目标 / 是否落后」。

**不是**：浏览器一键改仓、UI 代签、自动 `git push`、改产品仓 `cyning-harness`。

---

## 2. 为何现在做

| 现状痛点 | 影响 |
|----------|------|
| 版本散落：`server/harnessCli.ts` · `quality.yml` · `README` 多处手写 `2.17.0` | 漏改 → live CLI 与 CI 漂移 |
| 无「如何对本仓做 upgrade」教学路径 | Demo 教观测，却不教接入仓升级 |
| `/obs` 只投影 status/timeline | 看不到「包版本」这一层过程态 |
| npm 日后 >2.17.0 时无标准 bump 流程 | 00/维护者临时口令，易踩 `upgrade` 自绊 |

对齐产品：`npx @cyning/harness upgrade --yes`（可选 `--gate-check`）；manifest 五字段；本仓 preset `harness-only`。

---

## 3. 目标态（最小集 · 建议默认）

```text
[npm registry] ──只读探测──► GET /api/obs/harness-version
                                    │
[.cyning-harness/manifest.json] ────┤
[本仓 pin 真值文件] ─────────────────┤──► 首页或 /obs「版本条」
                                    │     （落后 / 一致 / 探测失败）
[维护者终端]                         │
  upgrade.sh / README 剧本 ──────────┘
  · npx @cyning/harness@<target> upgrade --yes [--gate-check]
  · 改 pin 真值 + 跑 pnpm 三绿 + PR
```

| 允许 | 禁止 |
|------|------|
| 服务端读 manifest + 本仓 pin +（可选）`npm view` | 浏览器 `npx` / 触发 `upgrade` |
| 文档化升级剧本 + 可执行 `scripts/` | Web 写闸、写 `docs/tasks`、自动 commit |
| 单文件/常量 **唯一钉版本** | 继续多处硬编码互不同步 |
| 负向测：pin 解析失败可读 | 默认 `--allow-*-gap`；直推 main |

---

## 4. 分阶段

### S0 · 方案签收（本 PLAN）

- [ ] 维护者确认范围（见 §7 选项）
- [ ] 00：本 PLAN → `active`；拆 ≥1 task；代签过程闸

### S1 · 钉版本单源 + 升级剧本（改码 · 建议首 task）

**slug 建议**：`web-obs-demo-self-upgrade-pin`

| 交付 | 说明 |
|------|------|
| Pin 真值 | 例如 `harness.pin.json` 或 `package.json` 的 `harnessPin` / 根常量模块；**CI 与 `HARNESS_PACKAGE` 都读它** |
| 同步点 | `server/harnessCli.ts`、`.github/workflows/quality.yml`（可用脚本生成或注释强制对齐）、README 钉表 |
| 剧本 | `docs/harness/guides/RUNBOOK_harness_upgrade_v1_zh.md`：前置检查 → `upgrade` → bump pin → verify → PR |
| 脚本（可选） | `scripts/check-harness-pin.mjs`（CI 或 preflight：散落字符串 == pin）；`scripts/bump-harness-pin.mjs`（仅改文件，不跑 upgrade） |
| 测试 | pin 模块可单测；check 脚本在故意漂移时非 0 |
| 图谱 | 若新增「版本/升级」模块行 → 更新 `01_struct`；否则 `graph_delta: none` + 理由 |

### S2 · 只读版本投影（改码 · 可紧随或同 PR 若 diff 小）

**slug 建议**：`web-obs-demo-self-upgrade-status-ui`

| 交付 | 说明 |
|------|------|
| API | `GET /api/obs/harness-version` → `{ pinned, manifest_version, npm_latest?, behind?, error? }` |
| npm | 服务端短超时 `npm view @cyning/harness version`；失败不挡页，标「探测失败」 |
| UI | 首页或 `/obs` 一条「纪律包版本」：白话；落后时链到 RUNBOOK（勿提供一键升级按钮） |
| 测试 | mock spawn/npm；失败路径可读 |

### S3 ·（可选）真实 upgrade dogfood 证据

- 仅当 npm 已有 **> pinned** 或维护者指定目标版时执行一次真实 `upgrade` + bump + PR。
- 证据：`docs/evidence/self_upgrade_<date>.md`（命令、前后 manifest、耗时）。
- **若当前 latest == 2.17.0**：S3 记「无可升版本 · dry-run / 剧本演练」即可，不阻塞 S1/S2 CLOSE。

### 非本列车

| 项 | 归宿 |
|----|------|
| Phase F LLM 起草 task | 另开；须改签 SPEC |
| 改 `cyning-harness` 产品能力 | 产品仓 task |
| Ops Desk 内嵌升级 | 非本仓 |
| 浏览器触发 upgrade | **永不** |

---

## 5. 风险

| 风险 | 缓解 |
|------|------|
| `upgrade` 弄脏工作区 / 自绊 S5 | RUNBOOK：干净 git；对照产品 ONBOARDING；先 dry 文档 |
| CI 与 live 钉不一致 | S1 check 脚本进 quality（或至少文档+单测） |
| `npm view` 在 CI/离线失败 | API 降级；UI 不红炸 |
| 范围膨胀成「自动升级机器人」 | §3 禁止表；task 非范围写死 |

---

## 6. 验收（列车级）

- [ ] Pin **一处真值**；散落引用可证明同源（脚本或 review 清单）
- [ ] RUNBOOK 按步骤可跟做（无绝对机径；命令可复制）
- [ ] Web 只读版本条在 `pnpm dev` 可见；无升级写操作入口
- [ ] `pnpm lint` → `pnpm test` → `pnpm build` 绿；PR squash 合入
- [ ] 过程闸有 CHECK 台账；KPI + experience 在 CLOSE 前回填

---

## 7. 范围选项（请维护者拍板）

| ID | 含义 | 00 默认 |
|----|------|---------|
| **A** | 仅纪律包升级能力（S1 + RUNBOOK；可无 UI） | — |
| **B** | Demo 能力大进化（超出升级；另开产品清单） | **不做**（本 PLAN 不覆盖） |
| **C** | **最小集 = S1 + S2**（钉 + 剧本 + 只读版本条）；S3 视 npm | **推荐 · 未回复则按 C** |
| **D** | 其他（聊天另说明） | 停 |

**实施节奏（未回复则按 R3）**：

| ID | 节奏 |
|----|------|
| R1 | 仅 PLAN，确认后再派 30 |
| R2 | PLAN + task 落盘代签，再派 30 |
| R3 | **自主 loop**：PLAN→task→代签→30→PR→close（终验仍交人） |

---

## 8. 建议 task 拆分（确认后由 00 落盘）

| 顺序 | slug | Phase | 说明 |
|------|------|-------|------|
| 1 | `web-obs-demo-self-upgrade-pin` | S1 | 单源钉 + RUNBOOK + check（+ 可选 bump 脚本） |
| 2 | `web-obs-demo-self-upgrade-status-ui` | S2 | API + 版本条 UI + 测 |
| 3 | （可选）`web-obs-demo-self-upgrade-dogfood` | S3 | 真实 upgrade 证据；无新版本则 skip/文档演练 |

默认同 Phase **串行**一 30；合入经 PR；钉目标仍 ≥2.17.0（bump 时同步抬 SPEC/README 下限叙述）。

---

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 00 首稿 · epic 后增量 · 默认范围 C · 待维护者确认 |
