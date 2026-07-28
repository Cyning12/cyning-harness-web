# FEEDBACK · `@cyning/harness@2.20.0` ← cyning-harness-web dogfood

| 项 | 值 |
|----|-----|
| **状态** | `active` |
| **日期** | 2026-07-28 |
| **消费者仓** | `cyning-harness-web` |
| **钉版本** | `2.20.0`（`harness.pin.json` + manifest） |
| **对照 RUNBOOK** | 产品 `docs/RUNBOOK_upgrade_wiki_delta_v1_zh.md`（含 2.19.2 澄清 · 2.20 `--strict`） |
| **severity** | **无 block** |

> 本波重点：升到 2.20 + 验证 RUNBOOK/CI 样例可执行性（本仓此前已迁完 wiki_delta / topics）。

---

## 1) 执行摘要

| 步骤 | 结果 |
|------|------|
| `npx @cyning/harness@2.20.0 upgrade --yes` | OK · manifest `2.19.0→2.20.0` |
| `npx @cyning/harness@2.20.0 check` | 已是最新 |
| `node scripts/bump-harness-pin.mjs 2.20.0` | 须**额外**做（产品 RUNBOOK §1 **未写** pin） |
| `check-harness-pin` | PASS |
| `task lint-wiki-delta`（默认） | PASS · scanned 10 · missing 0 · exit 0 |
| `task lint-wiki-delta --strict` | PASS · issues 0 · exit 0 |
| `wiki export --json --root docs/coding_wiki` | schema `harness.wiki_graph.v1` · nodes 10 · edges 43 · warnings 0 |
| CI 样例 | 可改编挂载（见 §3）；已挂 `.github/workflows/lint-wiki-delta.yml`（读 pin） |

---

## 2) 问题表（≥3 条可执行回馈）

| id | 现象 | 复现 | 期望 | severity | 建议产品落点 |
|----|------|------|------|----------|--------------|
| F-220-01 | 产品 RUNBOOK §1 只写 `upgrade` + `check`；**不提**消费者自管 `harness.pin.json`。本仓 CLI/CI 读 pin，仅 upgrade 会导致 **manifest=2.20 而 pin 仍 2.19** | 本波：upgrade 后 pin 仍旧，须 `bump-harness-pin` | RUNBOOK §1 增「若仓有 pin/单源版本文件 → 同步 bump」POINTER；或註「无 pin 可跳过」 | warn | `RUNBOOK_upgrade_wiki_delta_v1_zh.md` §1 |
| F-220-02 | CI 样例写死 `npx … @cyning/harness@2.20`；pin 单源仓必须手改，易与 pin 漂移 | 对照 `ci/samples/lint-wiki-delta.yml.example` vs 本仓 pin 哲学 | 样例注释增加「读 pin」片段；或第二份 `lint-wiki-delta.pin.yml.example` | warn | `ci/samples/lint-wiki-delta.yml.example` + `ci/samples/README.md` |
| F-220-03 | RUNBOOK §5 `cp path/to/@cyning/harness/ci/samples/…` **路径含糊**（npx 缓存路径难猜；未说明从 GitHub raw / pack 取） | 按字面执行会停住 | 给可复制命令：例如 `curl -L` raw、或 `npm pack @cyning/harness@2.20.0` 后从 tarball 抽、或文档写明仓库路径 `cyning-harness/ci/samples/…` | warn | RUNBOOK §5 · ci/samples/README |
| F-220-04 | 产品 wiki RUNBOOK 用**未钉版本** `npx @cyning/harness upgrade`；本仓自有 RUNBOOK 用 `@<目标版>`。两套叙事并存，升级日易混 | 对比产品 `RUNBOOK_upgrade_wiki_delta` §1 vs 本仓 `RUNBOOK_harness_upgrade` | wiki 迁移 RUNBOOK 建议写 `npx @cyning/harness@<目标版> upgrade --yes`，与 check 目标一致 | info | RUNBOOK §1 |
| F-220-05 | `--strict` 文档与行为清晰；本仓迁完后默认与 strict 均绿，**无** none 缺 note / 坏 path | `--strict --json` → issues=[] | （正反馈）保持「先字段后 strict」§0；可选在 JSON 样例里展示 issues 形状 | info | 已满足；可加 fixture 输出示例于 USER_GUIDE |

**severity=block 项：无。**

---

## 3) CI 样例评估

| 项 | 结论 |
|----|------|
| 能否直接 `cp`？ | **几乎可以**（`package-manager-cache: false` 对本仓 pnpm+npx-only **关键正确**） |
| 必须改什么？ | ① 版本改为读 `harness.pin.json`（本仓已改）；② 可选加 `check-harness-pin` step；③ checkout/setup-node 大版本与仓内其他 workflow 可并存（样例 v5 / quality 仍 v4） |
| 迁移中策略 | §0 清楚：`continue-on-error` → 迁完硬失败；本仓已迁完故硬失败 |
| `--strict` 进 CI？ | **本波不默认开**（与样例注释一致）；本地已验绿 |

---

## 4) RUNBOOK 体验（章节级）

| 节 | 评价 |
|----|------|
| §0 硬失败时机 | **清晰有用** · 避免半迁开 strict |
| §1 升级 | 缺 pin 同步（F-220-01）；命令未钉版本（F-220-04） |
| §2 扫缺口 | 默认 vs `--strict` 对照好；exit 0/2 明确 |
| §3 决策树 | POINTER §6.0b 足够；本仓无需补字段 |
| §4 topics | 本仓已两层；叙述防踩坑仍有效 |
| §5 CI | cp 路径含糊（F-220-03）；策略表好 |
| §6 关账后 | 短 · 可接受 |

---

## 5) 经验

1. 已做过 2.18/2.19 wiki 迁的仓，升 2.20 主要是 **验 RUNBOOK + `--strict` + CI 样例**，不是再迁一遍字段。  
2. 有 pin 的消费者：**upgrade ≠ 自动 bump pin**（F-220-01）。  
3. Wiki: [`docs/coding_wiki/`](../coding_wiki/) · [`topics/pin_and_upgrade.md`](../coding_wiki/topics/pin_and_upgrade.md)

---

## 6) 建议下一动作（产品）

见 [`BACKFILL_DRAFT_cyning_harness_2_20_from_web_obs.md`](./BACKFILL_DRAFT_cyning_harness_2_20_from_web_obs.md)。
