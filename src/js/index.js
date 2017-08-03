const abilityScores = require('./rules/abilityScores')
const classTable = require('./rules/classTable')
const columnBreak = require('./rules/columnBreak')
const listStyle = require('./rules/listStyle')
const pageBreak = require('./rules/pageBreak')
const statBlock = require('./rules/statBlock')
const textBlock = require('./rules/textBlock')

module.exports = (md, options) => {
  md.use(pageBreak, options)
  md.use(columnBreak, options)
  md.use(textBlock, options)
  md.use(statBlock, options)
  md.use(classTable, options)
  md.use(abilityScores, options)
  md.use(listStyle, options)
}
