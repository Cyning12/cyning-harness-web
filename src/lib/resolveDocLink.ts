/**
 * 将 Markdown 链接解析为与本地文件跳转兼容的仓内路径。
 * 相对链接相对「当前文档所在目录」解析（与 IDE / GitHub 预览一致）。
 */

export type ResolvedDocLink =
  | { kind: 'external'; href: string }
  | { kind: 'hash'; href: string }
  | { kind: 'doc'; path: string; hash: string }
  | { kind: 'unsupported'; reason: string; raw: string }

/** POSIX 风格规范化（处理 `.` / `..`，不解析盘符） */
export function normalizePosixPath(input: string): string {
  const parts = input.replace(/\\/g, '/').split('/')
  const out: string[] = []
  for (const part of parts) {
    if (!part || part === '.') continue
    if (part === '..') {
      if (out.length > 0) out.pop()
      continue
    }
    out.push(part)
  }
  return out.join('/')
}

/**
 * @param currentDocPath 当前文档相对仓根路径，如 `docs/tasks/done/foo.md`
 * @param href 锚点上的原始 href
 */
export function resolveDocLink(
  currentDocPath: string,
  href: string,
): ResolvedDocLink {
  const raw = href.trim()
  if (!raw) {
    return { kind: 'unsupported', reason: '空链接', raw: href }
  }

  if (raw.startsWith('#')) {
    return { kind: 'hash', href: raw }
  }

  // http(s): / mailto: / 其他协议 → 外链
  if (/^[a-z][a-z0-9+.-]*:/i.test(raw)) {
    return { kind: 'external', href: raw }
  }

  const hashIndex = raw.indexOf('#')
  const pathPart = hashIndex >= 0 ? raw.slice(0, hashIndex) : raw
  const hash = hashIndex >= 0 ? raw.slice(hashIndex) : ''

  let decoded: string
  try {
    decoded = decodeURIComponent(pathPart)
  } catch {
    return { kind: 'unsupported', reason: '链接无法解码', raw }
  }

  const cleaned = decoded.replace(/\\/g, '/').replace(/^\/+/, '')
  if (!cleaned) {
    return hash ? { kind: 'hash', href: hash } : { kind: 'unsupported', reason: '空路径', raw }
  }

  const baseDir = normalizePosixPath(
    currentDocPath.replace(/\\/g, '/').replace(/\/[^/]+$/, ''),
  )
  const joined = cleaned.startsWith('docs/')
    ? cleaned // 仓根相对（常见于写死 docs/...）
    : `${baseDir}/${cleaned}`
  const path = normalizePosixPath(joined)

  if (!path.endsWith('.md')) {
    return {
      kind: 'unsupported',
      reason: '仅支持跳转到 .md 文档',
      raw,
    }
  }
  if (!path.startsWith('docs/') || path.includes('\0')) {
    return {
      kind: 'unsupported',
      reason: '仅允许 docs/** 下的 Markdown',
      raw,
    }
  }

  return { kind: 'doc', path, hash }
}
