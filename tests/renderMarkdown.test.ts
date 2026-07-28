/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from 'vitest'
import { renderMarkdown } from '../src/lib/renderMarkdown'

describe('renderMarkdown', () => {
  it('渲染标题为 h1', () => {
    const html = renderMarkdown('# 入门示例')
    expect(html).toContain('<h1')
    expect(html).toContain('入门示例')
  })

  it('脚本标签被消毒、不保留可执行 script', () => {
    const html = renderMarkdown(
      'Hello <script>alert("xss")</script><img src=x onerror=alert(1)>',
    )
    expect(html.toLowerCase()).not.toContain('<script')
    expect(html.toLowerCase()).not.toContain('onerror')
    expect(html).toContain('Hello')
  })
})
