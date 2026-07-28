import type { Connect, Plugin } from 'vite'
import type { ServerResponse } from 'node:http'
import path from 'node:path'
import {
  getObsStatus,
  getObsTimeline,
  listTaskDocs,
  readTaskDoc,
  rejectWriteGate,
  resolveObsSource,
} from './obsHandlers'

function sendJson(
  res: ServerResponse,
  status: number,
  body: unknown,
): void {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function readUrl(req: Connect.IncomingMessage): URL {
  return new URL(req.url ?? '/', 'http://localhost')
}

function httpStatusForErr(code: string): number {
  switch (code) {
    case 'NOT_FOUND':
    case 'NO_TASKS_DIR':
    case 'NO_TASK_MD':
    case 'NO_TASK':
      return 404
    case 'WRITE_GATE_FORBIDDEN':
    case 'METHOD_NOT_ALLOWED':
      return 405
    case 'CLI_SPAWN_FAILED':
    case 'CLI_TIMEOUT':
    case 'CLI_NONZERO':
    case 'CLI_JSON_PARSE':
      return 502
    default:
      return 400
  }
}

/**
 * Vite 开发态薄观测 API（仅 Node 侧）。
 * 生产预览同样挂接，便于本地 `vite preview` 演示。
 */
export function obsApiPlugin(repoRoot = process.cwd()): Plugin {
  const root = path.resolve(repoRoot)

  const mount: Connect.NextHandleFunction = async (req, res, next) => {
    const url = readUrl(req)
    if (!url.pathname.startsWith('/api/')) {
      next()
      return
    }

    const method = (req.method ?? 'GET').toUpperCase()

    // 明确拒绝任何写闸尝试
    if (
      url.pathname === '/api/gates/approve' ||
      url.pathname.startsWith('/api/gates/')
    ) {
      sendJson(res, 405, rejectWriteGate())
      return
    }

    if (method !== 'GET') {
      sendJson(res, 405, {
        ok: false,
        error: '只读 API：仅支持 GET',
        code: 'METHOD_NOT_ALLOWED',
      })
      return
    }

    try {
      if (url.pathname === '/api/docs') {
        const result = await listTaskDocs(root)
        sendJson(res, result.ok ? 200 : 404, result)
        return
      }

      if (url.pathname === '/api/docs/content') {
        const rel = url.searchParams.get('path') ?? ''
        const result = await readTaskDoc(root, rel)
        sendJson(res, result.ok ? 200 : result.code === 'NOT_FOUND' ? 404 : 400, result)
        return
      }

      if (url.pathname === '/api/obs/status') {
        const task = url.searchParams.get('task')
        const source = resolveObsSource(url.searchParams.get('source'))
        const result = await getObsStatus(root, task, { source })
        sendJson(res, result.ok ? 200 : httpStatusForErr(result.code), result)
        return
      }

      if (url.pathname === '/api/obs/timeline') {
        const task = url.searchParams.get('task')
        const source = resolveObsSource(url.searchParams.get('source'))
        const result = await getObsTimeline(root, task, { source })
        sendJson(res, result.ok ? 200 : httpStatusForErr(result.code), result)
        return
      }

      sendJson(res, 404, {
        ok: false,
        error: '未知 API 路径',
        code: 'NOT_FOUND',
      })
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      sendJson(res, 500, {
        ok: false,
        error: `服务端错误：${msg}`,
        code: 'INTERNAL',
      })
    }
  }

  return {
    name: 'obs-api-middleware',
    configureServer(server) {
      server.middlewares.use(mount)
    },
    configurePreviewServer(server) {
      server.middlewares.use(mount)
    },
  }
}
