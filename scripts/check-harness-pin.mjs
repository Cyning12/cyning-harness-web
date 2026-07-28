#!/usr/bin/env node
/**
 * 断言 pin 合法，且 CLI / quality 无第二处权威版本硬编码。
 * 故意漂移时 exit ≠ 0。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pinPath = path.join(root, 'harness.pin.json')

const errors = []

function fail(msg) {
  errors.push(msg)
}

function readText(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf8')
}

let pin
try {
  pin = JSON.parse(fs.readFileSync(pinPath, 'utf8'))
} catch (err) {
  console.error(
    `[check-harness-pin] 无法读取 pin：${err instanceof Error ? err.message : String(err)}`,
  )
  process.exit(1)
}

if (!pin || typeof pin !== 'object' || Array.isArray(pin)) {
  fail('pin 须为对象')
} else {
  if (typeof pin.package !== 'string' || !pin.package.trim()) {
    fail('pin.package 缺失或非法')
  }
  if (typeof pin.version !== 'string' || !/^\d+\.\d+\.\d+/.test(pin.version)) {
    fail('pin.version 须为 x.y.z')
  }
}

const pinnedVersion = typeof pin?.version === 'string' ? pin.version : ''
const authorityRe = /@cyning\/harness@(\d+\.\d+\.\d+)/g

/** 业务权威路径：不得硬编码 @pkg@ver（须读 pin） */
const authorityFiles = [
  'server/harnessCli.ts',
  '.github/workflows/quality.yml',
]

for (const rel of authorityFiles) {
  let text
  try {
    text = readText(rel)
  } catch {
    fail(`缺少文件：${rel}`)
    continue
  }

  if (rel === 'server/harnessCli.ts') {
    if (!text.includes('resolveHarnessPackage') && !text.includes('getHarnessPackage')) {
      fail(`${rel}：未从 pin 组装包规格（缺 getHarnessPackage / resolveHarnessPackage）`)
    }
    if (/HARNESS_PACKAGE\s*=\s*['"]@cyning\/harness@/.test(text)) {
      fail(`${rel}：仍存在硬编码 HARNESS_PACKAGE 权威字符串`)
    }
    const matches = [...text.matchAll(authorityRe)]
    for (const m of matches) {
      // 注释里的历史说明可忽略；赋值/字面量真值禁止
      fail(`${rel}：发现散落权威版本 @cyning/harness@${m[1]}（须读 pin）`)
    }
  }

  if (rel === '.github/workflows/quality.yml') {
    if (!text.includes('scripts/harness-verify-ci.mjs')) {
      fail(`${rel}：Harness verify 须调用 node scripts/harness-verify-ci.mjs`)
    }
    const matches = [...text.matchAll(authorityRe)]
    for (const m of matches) {
      fail(`${rel}：勿硬编码 @cyning/harness@${m[1]}（已改由 pin 脚本）`)
    }
  }
}

/** scripts 自身可引用 pin 变量，但不得另写死与 pin 不一致的版本字面量作为权威 */
const scriptFiles = [
  'scripts/harness-verify-ci.mjs',
  'scripts/check-harness-pin.mjs',
  'scripts/bump-harness-pin.mjs',
]
for (const rel of scriptFiles) {
  const abs = path.join(root, rel)
  if (!fs.existsSync(abs)) continue
  const text = fs.readFileSync(abs, 'utf8')
  for (const m of text.matchAll(authorityRe)) {
    if (m[1] !== pinnedVersion) {
      fail(`${rel}：散落版本 ${m[1]} 与 pin ${pinnedVersion} 不一致`)
    }
  }
}

/** server/harnessPin.ts 不得内嵌默认权威版本号 */
{
  const rel = 'server/harnessPin.ts'
  const text = readText(rel)
  if (
    pinnedVersion &&
    (text.includes(`'${pinnedVersion}'`) || text.includes(`"${pinnedVersion}"`))
  ) {
    // 模块本身不应写死当前钉（注释除外）
    const withoutComments = text
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/.*$/gm, '')
    if (
      withoutComments.includes(`'${pinnedVersion}'`) ||
      withoutComments.includes(`"${pinnedVersion}"`)
    ) {
      fail(`${rel}：勿把当前钉版本写死在解析模块内`)
    }
  }
}

if (errors.length > 0) {
  console.error('[check-harness-pin] FAIL')
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}

console.log(
  `[check-harness-pin] PASS · pin ${pin.package}@${pin.version} · CLI/quality 无漂移`,
)
process.exit(0)
