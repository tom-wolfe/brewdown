module.exports = function (md, options) {
  const openMarker = '{abilities:'
  const closeMarker = '}'
  const pattern = /([a-z]+)\s*=\s*(\d+)/gi
  const rule = state => {
    const blockTokens = state.tokens

    console.log(JSON.stringify(state.tokens))

    for (let j = 0, l = blockTokens.length; j < l; j++) {
      const blockToken = blockTokens[j]

      if (blockToken.type !== 'inline' || blockToken.content.indexOf(openMarker) < 0) {
        continue
      }

      let tokens = blockToken.children
      for (let i = tokens.length - 1; i >= 0; i--) {
        const token = tokens[i]
        const content = token.content
        const openIndex = content.indexOf(openMarker)
        const closeIndex = content.indexOf(closeMarker)
        if (token.type === 'text' && openIndex > -1 && closeIndex > -1) {
          const newTokens = []

          const preToken = new state.Token('text', '', token.level)
          preToken.content = content.substring(0, openIndex)
          newTokens.push(preToken)

          const pairs = {}
          let match
          while ((match = pattern.exec(content))) {
            pairs[match[1].toLowerCase()] = match[2]
          }

          // TODO: Inject ability scores.

          const postToken = new state.Token('text', '', token.level)
          postToken.content = content.substring(closeIndex + 1)
          newTokens.push(postToken)

          blockToken.children = tokens = state.md.utils.arrayReplaceAt(tokens, i, newTokens)
        }
      }
    }
  }
  md.core.ruler.push('ability_scores', rule)
}
