import { marked } from 'marked'
import DOMPurify from 'dompurify'

/**
 * 将 Markdown 转为消毒后的 HTML（防 XSS）。
 * 浏览器与 jsdom 测试环境均可调用。
 */
export function renderMarkdown(source: string): string {
  const dirty = marked.parse(source, { async: false }) as string
  return DOMPurify.sanitize(dirty, {
    USE_PROFILES: { html: true },
  })
}
