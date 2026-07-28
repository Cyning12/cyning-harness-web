# RUNBOOK · 对本仓升级 `@cyning/harness`（维护者）

> **仓**：`cyning-harness-web`（过程可观测 Demo）  
> **真值钉**：仓根 [`harness.pin.json`](../../../harness.pin.json)  
> **禁止**：浏览器 / Web API 触发 `upgrade`；默认 `--allow-*-gap`；直推 `main`

---

## 何时用

npm 上 `@cyning/harness` **新于** 本仓 pin，或维护者指定目标版本时，按本剧本在终端完成升级并开 PR。

页面上的「纪律包版本」条若显示落后，只提示跟做本 RUNBOOK——**没有**一键升级按钮。

---

## 前置

1. Open Folder = **本仓根**（独立 git 仓）。
2. 工作区干净：

```bash
git status
```

无未提交改动（或已妥善 stash）。建议从最新 `main` 拉功能分支：

```bash
git fetch origin main
git checkout -b task/harness-upgrade-<目标版> origin/main
```

3. 确认当前钉：

```bash
cat harness.pin.json
```

---

## 步骤

### 1. 执行产品 upgrade（写本仓 Harness 接入物）

将 `<目标版>` 换成 npm 目标（须 ≥ 当前 pin）：

```bash
npx --yes @cyning/harness@<目标版> upgrade --yes
```

可选闸检查：

```bash
npx --yes @cyning/harness@<目标版> upgrade --yes --gate-check
```

对照产品 USER_GUIDE / ONBOARDING；**不要**改 `cyning-harness` 产品仓本身。

### 2. 同步本仓 pin（仅改文件，不代替 upgrade）

```bash
node scripts/bump-harness-pin.mjs <目标版>
```

或手改 `harness.pin.json` 的 `version` 字段。

### 3. 漂移检查

```bash
node scripts/check-harness-pin.mjs
```

须 `PASS`。失败则修散落硬编码或 pin，直至一致。

### 4. 三绿

```bash
pnpm lint
pnpm test
pnpm build
```

### 5. harness verify（读 pin）

默认 CLOSED 样例（与 CI 一致）：

```bash
node scripts/harness-verify-ci.mjs
```

或指定 task / 附加参数（例如 `--graph`）：

```bash
node scripts/harness-verify-ci.mjs docs/tasks/active/<task>.md --graph
```

### 6. 开 PR（勿直推 main）

```bash
git add harness.pin.json .cyning-harness/ docs/ scripts/ server/   # 按实际 diff 精选
git commit -m "chore(harness): bump pin to <目标版>"
git push -u origin HEAD
gh pr create --base main
```

合入由 00 / 维护者经 quality 绿后处理；**禁止**执行 Agent `gh pr merge`（除非编排明确授权）。

---

## 失败与回退

| 情况 | 处理 |
|------|------|
| `upgrade` 弄脏工作区 | 对照产品文档；必要时 `git checkout -- .` / 新分支重来（勿 force push main） |
| `check-harness-pin` FAIL | 删掉 workflow / CLI 硬编码版本，统一读 pin |
| `npm view` / 页面探测失败 | 与升级无关；页面应降级显示，不挡本剧本 |
| 闸 pending | 勿用 `--allow-*-gap`；先签闸或换 CLOSED 样例做 CI |

---

## 相关

- PLAN：[`PLAN_web_obs_demo_self_upgrade_v1_zh.md`](./PLAN_web_obs_demo_self_upgrade_v1_zh.md)
- CI：`.github/workflows/quality.yml` → `node scripts/harness-verify-ci.mjs`
- 只读 API：`GET /api/obs/harness-version`
