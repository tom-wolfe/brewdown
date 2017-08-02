const tokenUtils = require('../tokenUtils')

module.exports = function (md, options) {
  const defaultOptions = {
    newColumnMarker: '\\newcolumn'
  }
  options = Object.assign({}, defaultOptions, options)

  const rule = state => {
    let blockTokens = state.tokens

    for (let i = blockTokens.length - 1; i >= 0; i--) {
      const blockToken = blockTokens[i]
      if (blockToken.type !== 'inline' || blockToken.content.trim() !== options.newPageMarker) {
        continue
      }
      // Found an inline token whose content matches our marker. Replace it with page close/open.
      state.tokens = blockTokens = state.md.utils.arrayReplaceAt(blockTokens, i, tokenUtils.newColumn(state))
    }
  }

  md.core.ruler.push('column_break', rule)
  md.renderer.rules['column_break'] = () => '\n<div class="col-break"></div>\n'
}
