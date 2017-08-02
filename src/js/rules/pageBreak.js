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

    // Always start with an open page.
    blockTokens.splice(0, 0, tokenUtils.openPage(state, options.pageSize, options.style))

    for (let i = blockTokens.length - 1; i >= 0; i--) {
      const blockToken = blockTokens[i]
      if (blockToken.type !== 'inline' || blockToken.content.trim() !== options.newPageMarker) {
        continue
      }
      // Found an inline token whose content matches our marker. Replace it with page close/open.
      state.tokens = blockTokens = state.md.utils.arrayReplaceAt(blockTokens, i, [
        tokenUtils.closePage(state),
        tokenUtils.openPage(state, options.pageSize, options.style)
      ])
    }

    // Always end with a closed page
    blockTokens.splice(blockTokens.length, 0, tokenUtils.closePage(state))
  }

  md.core.ruler.push('page_break', rule)
}
