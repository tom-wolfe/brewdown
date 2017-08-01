module.exports = function (md, options) {
  const defaultOptions = {
    newColumnMarker: '\\newcolumn',
    columnBreakName: 'column_break'
  }
  options = Object.assign({}, defaultOptions, options)

  function createNewColumn (state) {
    return new state.Token(options.columnBreakName, '', 0)
  }

  const rule = state => {
    const blockTokens = state.tokens
    for (let j = 0, l = blockTokens.length; j < l; j++) {
      const blockToken = blockTokens[j]
      if (blockToken.type !== 'inline' || blockToken.content.trim() !== options.newColumnMarker) {
        continue
      }
      blockToken.children = [createNewColumn(state)]
    }
  }

  md.core.ruler.push(options.columnBreakName, rule)
  md.renderer.rules[options.columnBreakName] = () => '\n<div class="col-break"></div>\n'
}
