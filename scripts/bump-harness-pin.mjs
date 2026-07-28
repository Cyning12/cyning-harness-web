#!/usr/bin/env node
/**
 * 仅改 harness.pin.json 的 version；不执行 harness upgrade。
 * 用法：node scripts/bump-harness-pin.mjs 2.18.0
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pinPath = path.join(root, 'harness.pin.json')
const next = (process.argv[2] || '').trim()

if (!/^\d+\.\d+\.\d+([+-].*)?$/.test(next)) {
  console.error('用法：node scripts/bump-harness-pin.mjs <x.y.z>')
  process.exit(1)
}

let pin
try {
  pin = JSON.parse(fs.readFileSync(pinPath, 'utf8'))
} catch (err) {
  console.error(
    `无法读取 pin：${err instanceof Error ? err.message : String(err)}`,
  )
  process.exit(1)
}

if (!pin || typeof pin.package !== 'string') {
  console.error('pin.package 非法')
  process.exit(1)
}

const prev = pin.version
pin.version = next
fs.writeFileSync(pinPath, `${JSON.stringify(pin, null, 2)}\n`, 'utf8')
console.log(`[bump-harness-pin] ${prev} → ${next}（未执行 upgrade；请跟 RUNBOOK）`)
