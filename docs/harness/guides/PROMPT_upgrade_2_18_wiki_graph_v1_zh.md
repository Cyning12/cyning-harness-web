# PROMPT · cyning-harness-web · 升级 2.18.0 + 文档迁移 + Wiki Graph 页

| 字段 | 值 |
| --- | --- |
| **角色** | **00 统筹 → 闸后派 30**（或维护者授权同会话 00+30） |
| **状态** | `active` · 2026-07-28 |
| **Open Folder（强制）** | `/Users/cyning/Desktop/Projects/cyning-harness-web` |
| **上游产品** | `@cyning/harness@2.18.0`（已 npm 发版 · wiki_delta / wiki export） |
| **当前钉** | `harness.pin.json` → **2.17.0**（须升到 **2.18.0**） |
| **RUNBOOK** | [`RUNBOOK_harness_upgrade_v1_zh.md`](./RUNBOOK_harness_upgrade_v1_zh.md) |
| **产品 SPEC** | `cyning-harness/docs/spec/SPEC-experience-wiki-feedback_loop_v1.md` |
| **验收清单（产品侧）** | `cyning-harness/docs/CHECKLIST_acceptance_2.18.0_wiki_feedback_v1_zh.md` |
| **回填出口** | 本仓 `docs/evidence/` issue/经验包 → 产品仓 `cyning-harness`（issue / SPEC / docs · **不**在 Wave A–C 偷偷改产品码） |

> **顺序强制**：Wave A（升级+迁移）→ Wave B（校验全绿）→ Wave C（`/wiki-graph`）→ **Wave D（使用问题与经验回填纪律包）**。  
> **禁止**：未校验绿就做图页；浏览器触发 upgrade；默认 `--allow-*-gap`。  
> **回填纪律**：A–C 默认 **不**改 `cyning-harness` 源码；Wave D 产出结构化回填包；经维护者确认后另开产品仓 PR / 下一版 SPEC。

---

## 复制区（新窗口 · Open Folder = cyning-harness-web · 整段粘贴）

`````text
你负责 cyning-harness-web：跟随纪律包 2.18.0，迁移存量文档/task，校验通过后实现类似 Obsidian Graph View 的 wiki 关系图页；并在全程采集「升级/使用问题与经验」，整理为可回填 @cyning/harness 纪律包的证据包。

【Open Folder】
/Users/cyning/Desktop/Projects/cyning-harness-web
（独立 git 仓；禁止只在 Projects/ 根改本仓文件却不对准本根）
产品仓（回填目标 · Wave D 只写草稿/指针，改码须另 Open Folder）：
/Users/cyning/Desktop/Projects/cyning-harness

【上游已就绪】
- npm：@cyning/harness@2.18.0 已发版
- 能力：wiki_delta 关账硬闸（缺字段 BLOCK）；experience→wiki 晋升指针；wiki export --json（schema=harness.wiki_graph.v1）
- 产品 SPEC：../cyning-harness/docs/spec/SPEC-experience-wiki-feedback_loop_v1.md
- 产品验收草稿：../cyning-harness/docs/CHECKLIST_acceptance_2.18.0_wiki_feedback_v1_zh.md
- 本仓剧本：docs/harness/guides/RUNBOOK_harness_upgrade_v1_zh.md

【原则】
1. Web 只读投影：不代签闸、不在浏览器 npx upgrade。
2. 钉版本唯一真值：harness.pin.json；CI / server spawn 读同一 pin。
3. 勿默认 --allow-*-gap。
4. 合入走 PR + CI（禁直推 main），除非维护者书面授权。
5. graph_delta：改路由/模块边界须更新 docs/_tech_graph/；否则 graph_delta=none + note。
6. Dogfood 回填：本仓是纪律包消费者；发现问题必须落盘，禁止只留在聊天里。

【全程传感器 · 边做边记】
从 Wave A 起，遇到下列任一情况立即追加到 docs/evidence/FEEDBACK_harness_2_18_0_from_web_obs_YYYYMMDD.md（没有就建）：
- upgrade / pin / verify / close / wiki export 报错、误报、文档与行为不符
- 迁移 wiki_delta 成本过高、命名歧义、n/a vs none 难选
- USER_GUIDE / RUNBOOK / Prompt 缺口
- wiki export JSON 缺字段、边解析漏、性能问题
- Web 消费 export 时契约不清（建议改 schema / CLI 旗）
每条至少含：现象 · 复现命令 · 期望 · 严重度（block/warn/info）· 建议落点（产品：CLI/docs/SPEC/闸）

════════════════════════════════════
Wave A · 升级 + 迁移旧文档（先做）
════════════════════════════════════

A1. 干净工作区，从 main 开分支：
  git fetch origin main
  git checkout -b task/web-harness-2-18-wiki-graph origin/main

A2. 按 RUNBOOK 升级到 2.18.0：
  npx --yes @cyning/harness@2.18.0 upgrade --yes
  node scripts/bump-harness-pin.mjs 2.18.0
  node scripts/check-harness-pin.mjs   # 须 PASS
  更新 .cyning-harness/manifest.json 与散落「2.17.0」字面（README / PLAN / evidence / quality.yml / 文案）→ 一律对齐 2.18.0 或改为「读 pin」表述。

A3. 迁移存量 Markdown（破坏性适配 wiki_delta）：
  - 扫描 docs/tasks/done/**/*.md 与仍可能被 close/verify 的样例：每个 task 元信息补
      wiki_delta: n/a | none | path
      wiki_delta_note: （none/n/a 必填）
    本仓 preset=harness-only、通常无 docs/coding_wiki → 默认 wiki_delta=n/a + note「harness-only · 无 WikiTrack」。
  - 若某 task experience_capture=required 且将来 wiki_delta=path：经验节须含 Wiki:/wiki_promoted:/coding_wiki 指针。
  - 更新 docs/harness/guides/PLAN_web_obs_demo_self_upgrade_v1_zh.md、RUNBOOK、README、SPEC 中「钉 2.17.0」叙述。
  - CI 默认 verify 样例 task：补 wiki_delta 后须仍能 CLOSE 语义下被 verify（缺字段不再只是历史文档）。
  - 迁移摩擦写入 FEEDBACK 文件（条数≥1 或显式写「无摩擦」）。

A4. （推荐）为本仓启用最小 wiki 金样，供 Wave C 消费：
  - 新建 docs/coding_wiki/（可从产品包 templates 拷贝 + 2～3 个互链 md，含 [[wikilink]]）
  - 或 test/fixtures；服务端 export 时 --root 指向该目录
  - profile 仍可为 harness-only；目录存在即可被 wiki export 扫描

A5. 落盘本波 task（建议拆 2～3 个）：
  - task_web_obs_demo_upgrade_2_18_migrate_v1（Wave A+B）
  - task_web_obs_demo_wiki_graph_view_v1（Wave C · depends_on 上一单）
  - task_web_obs_demo_harness_feedback_2_18_v1（Wave D · depends_on C 或与 C 同 PR 后半）
  元信息必含：wiki_delta · graph_delta · experience_capture=required · required_invoke_hats · git_branch · failure_paths

════════════════════════════════════
Wave B · 校验门（全绿才进 C）
════════════════════════════════════

必须全部通过（记录退出码到 invoke/自检）：

  node scripts/check-harness-pin.mjs
  pnpm lint && pnpm test && pnpm build
  node scripts/harness-verify-ci.mjs
  # 或对迁移后的 done 样例：
  npx --yes @cyning/harness@2.18.0 verify --target . --task docs/tasks/done/task_web_obs_demo_hgm_consumer_v1.md
  npx --yes @cyning/harness@2.18.0 wiki export --json --root docs/coding_wiki
     # 若 A4 建了 wiki：须 schema=harness.wiki_graph.v1 且 nodes≥1
     # 若暂无 wiki 根：允许 exit≠0，但 Wave C 开工前必须有可读 fixture

任一门红 → STOP，禁止开 Wave C 改 UI；红因属产品行为则记入 FEEDBACK（severity=block）。

════════════════════════════════════
Wave C · Obsidian 风格 Wiki Graph 页（校验后）
════════════════════════════════════

目标路由：/wiki-graph（名称可微调，须挂导航）

C1. 数据：
  - 仅服务端 spawn：npx @cyning/harness@<pin> wiki export --json [--root …]
  - 新增 GET /api/obs/wiki-graph（或等价）返回 JSON；失败时页内可读错误
  - 禁止浏览器直接 npx；禁止把 Obsidian 桌面 App 嵌进页面

C2. UI（对标 Obsidian Graph View 观感，非像素级复刻）：
  - 力导向：节点=wiki 页，边=wikilink|md_link
  - 白底/浅底、圆点节点、细灰边、标签在节点旁；可拖拽/缩放
  - 横幅：「只读投影 · 非签收真值」
  - 可选：点节点打开 /docs 只读预览该 md
  - 库选型建议：react-force-graph-2d / d3-force / cytoscape（择一，锁进 package.json）

C3. 文档与图谱：
  - 更新 README 路由表；docs/_tech_graph/01_struct + 00_main（若模块边界变）
  - graph_delta 指向更新过的图文件；ONTOLOGY 术语可增 WikiGraphProjection

C4. 测试：
  - API/解析单测或 e2e 最小：fixture JSON → 页能渲染节点数
  - pnpm lint/test/build 再绿

C5. 消费侧体验记入 FEEDBACK（契约、空图、WARN 呈现、性能）。

════════════════════════════════════
Wave D · 回填纪律包（强制 · 关账前）
════════════════════════════════════

目标：把本仓 dogfood 的问题与经验变成产品仓可执行输入（不是聊天总结）。

D1. 定稿本仓证据包（路径固定）：
  docs/evidence/FEEDBACK_harness_2_18_0_from_web_obs_<YYYYMMDD>.md
  至少三节：
  1) 问题表（id · 现象 · 复现 · 期望 · severity · 建议产品落点）
  2) 经验 / 改进建议（≥3 条；可映射 USER_GUIDE / RUNBOOK / close 闸文案 / export schema）
  3) 建议下一动作（issue / SPEC 增量 / patch 版号建议，如 2.18.1 或 2.19.0）

D2. 同步勾选/批注产品验收清单（只读复制或 POINTER）：
  - 对照 ../cyning-harness/docs/CHECKLIST_acceptance_2.18.0_wiki_feedback_v1_zh.md
  - 在本仓 evidence 中写「checklist 勾选结果 + 失败项→FEEDBACK id」
  - 禁止未授权直接改产品仓 checklist 为最终签收（人签仍在产品侧）

D3. 产出「产品仓回填草稿」（仍落在本仓，便于 PR 引用）：
  docs/evidence/BACKFILL_DRAFT_cyning_harness_2_18_from_web_obs.md
  内容：按文件列出建议 diff 要点（USER_GUIDE 哪节、CHANGELOG Notes、新 ISSUE 标题、是否开 SPEC）
  明示：本文件 ≠ 已合入产品；合入须 Open Folder=cyning-harness 另开 task/PR。

D4. 若维护者当场授权「同会话回填产品」：
  - 另开窗口 Open Folder=/Users/cyning/Desktop/Projects/cyning-harness
  - 仅落地 docs/issue 草稿或 docs 修订 + 必要测试；遵循产品仓 AGENTS / 闸
  - 回报产品 PR/路径；本仓 FEEDBACK 链到该 PR

D5. Wave D 出门条件（关账必查）：
  - FEEDBACK 文件存在且问题表非空，或显式「零问题 · 已 dogfood 命令列表」
  - BACKFILL_DRAFT 存在
  - 本波 task 的 ### 经验总结 含指针：Wiki: 或路径指向上述 evidence
  - 回报里给出「建议产品下一版动作」一行结论

════════════════════════════════════
非范围
════════════════════════════════════
- Wave A–C 擅自改 cyning-harness 产品源码 / 擅自 npm publish
- Obsidian 插件或桌面依赖
- 有类型本体边（ontology/HGM）完整着色（可后续；本波只用 wiki export 边）
- UI 代签 / 写闸
- 把 FEEDBACK 只写在聊天不落盘

【每轮回报】
1) 当前 Wave / task_slug / STOP?
2) pin 版本与 check-harness-pin 结果
3) 迁移文件清单（路径）
4) Wave B 命令退出码
5) Wave C 仅在 B 绿后：路由 + API + 截图/自述
6) FEEDBACK 新增条数 / BACKFILL_DRAFT 是否已写；建议回填产品的 Top-3

【启动】
先执行 Wave A1–A2，创建空 FEEDBACK 文件骨架，再扫 docs/tasks/done 列 wiki_delta 缺口表，然后继续。
`````

---

## 维护者备注（勿贴进复制区）

| 波 | 建议 task_slug | 出门条件 |
|----|----------------|----------|
| A+B | `web-obs-demo-upgrade-2-18-migrate` | pin=2.18.0 · 三绿 · verify CI · 存量 task 有 wiki_delta |
| C | `web-obs-demo-wiki-graph-view` | `/wiki-graph` 可读 live export · README 已链 |
| D | `web-obs-demo-harness-feedback-2-18` | FEEDBACK + BACKFILL_DRAFT 落盘 · 可开产品 PR |

产品仓侧 U1 / consumer / experience-wiki task **已 CLOSE**（2026-07-28）。

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 首稿 · 2.18.0 发版后派 web 升级+图页 |
| 2026-07-28 | 增 Wave D：使用问题/经验强制回填纪律包证据包 |
