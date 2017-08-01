module.exports = function (md, options) {
  const defaultOptions = {
    pageSize: 'a4',
    style: '',
    newPageMarker: '\\newpage'
  }
  options = Object.assign({}, defaultOptions, options)

  function createOpenPage (state) {
    const pageOpen = new state.Token('page_open', 'div', 1)
    pageOpen.block = true
    pageOpen.attrPush(['class', `page ${options.pageSize} ${options.style}`.trim()])
    return pageOpen
  }

  function createClosePage (state) {
    const pageClose = new state.Token('page_close', 'div', -1)
    pageClose.block = true
    return pageClose
  }

  const rule = state => {
    const blockTokens = state.tokens
    blockTokens.splice(0, 0, createOpenPage(state))
    for (let j = 0, l = blockTokens.length; j < l; j++) {
      const blockToken = blockTokens[j]
      if (blockToken.type !== 'inline' || blockToken.content.trim() !== options.newPageMarker) {
        continue
      }
      blockToken.children = [createClosePage(state), createOpenPage(state)]
    }

    blockTokens.splice(blockTokens.length, 0, createClosePage(state))
  }

  md.core.ruler.push('page_break', rule)
}
