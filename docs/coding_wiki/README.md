# coding_wiki · LLM 读序与目录约定

本仓（`cyning-harness-web`）过程可观测 Demo 的 Wiki 读序。约定对齐 `@cyning/harness@2.18.2` 产品模板（`recommended`，非 close 硬闸）。

> **纪律级别**：`recommended`。缺两层 / 未加深 **≠** `task close` BLOCK——字段闸见产品 USER_GUIDE §6.0 / §6.0b。

---

## 默认两层（起步）

```text
docs/coding_wiki/
  README.md           # 读序 + 本约定 + 加深指引
  _index.md           # 主题索引
  stable.md           # 稳定度三件套留根
  context.md
  volatile.md
  topics/             # 第 2 层：一主题一薄页，指针 docs/** 真值
    *.md
```

| 路径 | 层 | 说明 |
|------|-----|------|
| [`README.md`](README.md) | 读序 | 本文件 · 目录约定 |
| [`_index.md`](_index.md) | 索引 | 主题→页指针 |
| [`stable.md`](stable.md) | stable | 短摘要 · IDE 规则指针 |
| [`context.md`](context.md) | context | 项目级指针 |
| [`volatile.md`](volatile.md) | volatile | 本 task 必读 |
| [`topics/`](topics/) | 主题 | **一主题一薄页** · 勿在根堆长文 |

invoke §3 应 **pointer** 到本目录，勿重复贴长文。

---

## 原则

1. **根禁止堆主题长文**；主题进 `topics/`。
2. **勿按日期 / PR / task_slug 建目录**。
3. **`wiki export` 不依赖目录深度**；图靠双括号 wikilink / 相对 `.md` 链。
4. 整理目录可写 `wiki_delta=path`；形状本身不闸。

## 目录 vs 关系图

| | 文件夹树 | `wiki export` 图 |
|--|----------|------------------|
| 服务对象 | **人**扫目录 | Agent / Web `/wiki-graph` **边** |
| 靠什么 | 两层起步 + 加深阈值 | wikilink + md 相对链 |

## 加深阈值（第 3 层）

| 信号 | 动作 |
|------|------|
| 某目录 `.md` **≥ 15** 或难扫 | `topics/<子域>/` |
| 单页 **>~80 行** 或多主题 | 先拆页 |
| 连续 3 task 同前缀 | 可提前建子域 |

## 加深操作清单

1. `git mv` → `topics/<子域>/`
2. 修 wikilink / md 链
3. 更新 `_index` / 本 README
4. `npx @cyning/harness wiki export --json --root docs/coding_wiki`
5. task **`wiki_delta`** = 改动 path

## 关账与晋升（v2.18+）

1. **`wiki_delta`**：path / `none`+理由 / `n/a`
2. **`experience_capture=required` 且 path**：经验节含 `Wiki:` / `wiki_promoted:` / `coding_wiki`
3. volatile：关账后归档或清空
4. 导出：

```bash
npx @cyning/harness wiki export --json --root docs/coding_wiki
```

## 修订记录

| 日期 | 说明 |
|------|------|
| 2026-07-28 | 初建（2.18.0）· 关账晋升 + export |
| 2026-07-28 | 采纳 2.18.2 两层约定 · 主题迁 `topics/` |
