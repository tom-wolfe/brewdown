const tokenUtils = require('../tokenUtils')

module.exports = function (md, options) {
  const defaultOptions = {
    pageSize: 'a4',
    style: '',
    newPageMarker: '\\newpage'
  }
  options = Object.assign({}, defaultOptions, options)

  const rule = state => {
    let blockTokens = state.tokens

    blockTokens.splice(0, 0, tokenUtils.openPage(state, options.pageSize, options.style))

    for (let i = blockTokens.length - 1; i >= 0; i--) {
      const blockToken = blockTokens[i]
      if (blockToken.type !== 'inline' || blockToken.content.trim() !== options.newPageMarker) {
        continue
      }
      // Found an inline token whose content matches our marker. Replace it with page close/open.
      const outerTokens = tokenUtils.findOuter(blockTokens, i)
      blockTokens.splice(
        outerTokens.openIndex,
        outerTokens.length,
        tokenUtils.closePage(state),
        tokenUtils.openPage(state, options.pageSize, options.style)
      )
      i = outerTokens.openIndex
    }

    // Always end with a closed page
    blockTokens.splice(blockTokens.length, 0, tokenUtils.closePage(state))
  }

  md.core.ruler.push('page_break', rule)
}
