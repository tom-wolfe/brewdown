module.exports = function (md) {
  const rule = state => {
    const blockTokens = state.tokens

    for (let i = 0; i < state.tokens.length; i++) {
      const token = blockTokens[i]
      if (token.type !== 'bullet_list_open') {
        continue
      }
      if (token.markup === '-') {
        token.attrPush(['class', 'no-bullet'])
      }
    }
  }

  md.core.ruler.push('list_style', rule)
}
