#!/usr/bin/env node
/**
 * CI / 本地：读 harness.pin.json 后跑 harness verify（禁止 workflow 另钉版本）。
 * 默认 task：docs/tasks/done 下 CLOSED 样例。
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pinPath = path.join(root, 'harness.pin.json')
const DEFAULT_TASK =
  'docs/tasks/done/task_web_obs_demo_hgm_consumer_v1.md'

function fail(msg) {
  console.error(`[harness-verify-ci] ${msg}`)
  process.exit(1)
}

let pin
try {
  pin = JSON.parse(fs.readFileSync(pinPath, 'utf8'))
} catch (err) {
  fail(`无法读取 harness.pin.json：${err instanceof Error ? err.message : String(err)}`)
}

if (
  !pin ||
  typeof pin.package !== 'string' ||
  typeof pin.version !== 'string' ||
  !/^\d+\.\d+\.\d+/.test(pin.version)
) {
  fail('harness.pin.json 非法：须含 package + version(x.y.z)')
}

const pkgSpec = `${pin.package}@${pin.version}`
const taskPath = process.argv[2] || DEFAULT_TASK
const extraArgs = process.argv.slice(3)

const args = [
  '--yes',
  pkgSpec,
  'verify',
  '--target',
  '.',
  '--task',
  taskPath,
  ...extraArgs,
]

console.log(`[harness-verify-ci] npx ${args.join(' ')}`)

const child = spawn('npx', args, {
  cwd: root,
  stdio: 'inherit',
  env: process.env,
  shell: false,
})

child.on('error', (err) => {
  fail(`spawn 失败：${err.message}`)
})

child.on('close', (code) => {
  process.exit(code ?? 1)
})
