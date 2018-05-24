const tokenUtils = require('../tokenUtils')

module.exports = function (md, options) {
  const abilityNames = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA']

  const tableClass = 'abilities'
  const openMarker = '{abilities:'
  const closeMarker = '}'
  const pattern = /([a-z]+)\s*=\s*(\d+)/gi

  const rule = state => {
    let tokens = state.tokens

    for (let i = tokens.length - 1; i >= 0; i--) {
      const token = tokens[i]
      if (token.type !== 'inline') { continue }

      const content = token.content.trim()
      if (content.indexOf(openMarker) !== 0 || content.indexOf(closeMarker) !== content.length - 1) { continue }

      const tableTokens = []
      tableTokens.push(tokenUtils.tableOpen(state, token.level, tableClass))
      tableTokens.push(tokenUtils.theadOpen(state, token.level + 1))
      tableTokens.push(tokenUtils.trOpen(state, token.level + 2))
      abilityNames.forEach(ability => {
        tableTokens.push(tokenUtils.thOpen(state, token.level + 3))
        tableTokens.push(tokenUtils.inline(state, token.level + 4, ability))
        tableTokens.push(tokenUtils.thClose(state, token.level + 3))
      })
      tableTokens.push(tokenUtils.trClose(state, token.level + 2))
      tableTokens.push(tokenUtils.theadClose(state, token.level + 1))

      // Extract ability scores from the token.
      const abilities = {}
      let match
      while ((match = pattern.exec(content))) {
        abilities[match[1].toUpperCase()] = match[2]
      }

      tableTokens.push(tokenUtils.tbodyOpen(state, token.level + 1))
      tableTokens.push(tokenUtils.trOpen(state, token.level + 2))
      abilityNames.forEach(ability => {
        tableTokens.push(tokenUtils.tdOpen(state, token.level + 3))

        const abilityScore = abilities[ability]
        const abilityMod = Math.floor((Number(abilityScore) - 10) / 2)
        const sign = (abilityMod >= 0) ? '+' : ''
        tableTokens.push(tokenUtils.inline(state, token.level + 4, `${abilityScore} (${sign}${abilityMod})`))

        tableTokens.push(tokenUtils.tdClose(state, token.level + 3))
      })
      tableTokens.push(tokenUtils.trClose(state, token.level + 2))
      tableTokens.push(tokenUtils.tbodyClose(state, token.level + 1))
      tableTokens.push(tokenUtils.tableClose(state, token.level))

      const outerTokens = tokenUtils.findOuter(tokens, i)
      state.tokens.splice(outerTokens.openIndex, outerTokens.length, ...tableTokens)
      i = outerTokens.openIndex
    }
  }
  md.core.ruler.push('ability_scores', rule)
}
