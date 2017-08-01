const columnBreak = require('./rules/columnBreak')
const lists = require('./rules/lists')
const pageBreak = require('./rules/pageBreak')
const statBlock = require('./rules/statBlock')
const textBlock = require('./rules/textBlock')

module.exports = (md) => {
  md.use(pageBreak)
  md.use(columnBreak)
  md.use(textBlock)
  md.use(statBlock)
  md.use(lists)
}
