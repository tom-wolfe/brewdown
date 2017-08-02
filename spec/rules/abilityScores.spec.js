const MarkdownIt = require('markdown-it')
const abilityScores = require('../../src/js/rules/abilityScores')

describe('abilityScores', () => {
  describe('render', () => {
    it('should produce the right output with default settings', () => {
      const md = MarkdownIt().use(abilityScores)
      const html = md.render('{abilities: str=10 dex=10 con=10 wis=10 int=10 cha=10}')
      expect(html).toEqual('\n<div class="col-break"></div>\n')
    })
  })
})
