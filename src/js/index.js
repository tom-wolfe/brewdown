const abilityScores = require('./rules/abilityScores')
const columnBreak = require('./rules/columnBreak')
const lists = require('./rules/lists')
const pageBreak = require('./rules/pageBreak')
const statBlock = require('./rules/statBlock')
const textBlock = require('./rules/textBlock')

module.exports = (md, options) => {
  md.use(pageBreak, options)
  md.use(columnBreak, options)
  md.use(textBlock, options)
  md.use(statBlock, options)
  md.use(abilityScores, options)
  md.use(lists, options)
}

const fs = require('fs-extra')
const MarkdownIt = require('markdown-it')
const md = MarkdownIt().use(module.exports)
const file = fs.readFileSync('src/examples/ability-table.md').toString()
console.log(md.render(file))
