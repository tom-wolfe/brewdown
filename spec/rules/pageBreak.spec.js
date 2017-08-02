const MarkdownIt = require('markdown-it')
const pageBreak = require('../../src/js/rules/pageBreak')

describe('pageBreak', () => {
  describe('render', () => {
    it('empty string should produce blank page', () => {
      const md = MarkdownIt().use(pageBreak)
      const html = md.render('')
      expect(html).toMatch('<div class="page a4"></div>')
    })
    it('marker should split into two pages', () => {
      const md = MarkdownIt().use(pageBreak)
      const html = md.render('\\newpage')
      expect(html).toMatch('<div class="page a4"></div>\\s*<div class="page a4"></div>')
    })
    it('page size should appear in output', () => {
      const md = MarkdownIt().use(pageBreak, { pageSize: 'letter' })
      const html = md.render('')
      expect(html).toMatch('<div class="page letter"></div>')
    })
    it('page columns should appear in output', () => {
      const md = MarkdownIt().use(pageBreak, { style: 'two-col' })
      const html = md.render('')
      expect(html).toMatch('<div class="page a4 two-col"></div>')
    })
  })
})
