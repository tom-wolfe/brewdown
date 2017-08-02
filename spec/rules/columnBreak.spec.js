const MarkdownIt = require('markdown-it')
const columnBreak = require('/src/js/rules/columnBreak')

describe('columnBreak', () => {
  describe('render', () => {
    it('should produce the right output with default settings', () => {
      const md = MarkdownIt().use(columnBreak)
      const html = md.render('\\newcolumn')
      expect(html).toEqual('\n<div class="col-break"></div>\n')
    })
    it('should produce the right output with non-default settings', () => {
      const md = MarkdownIt().use(columnBreak, { newColumnMarker: '/column' })
      const html = md.render('/column')
      expect(html).toEqual('\n<div class="col-break"></div>\n')
    })
  })
})
