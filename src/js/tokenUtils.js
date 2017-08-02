function create (state, type, tag = '', level = 0, block = true, nesting = 0, content = '') {
  const token = new state.Token(type, tag, level)
  token.block = block
  token.content = content
  token.nesting = nesting
  return token
}

function addClasses (token, ...classes) {
  // Get and split into a list
  const classList = (token.attrGet('class') || '').split(/\s/g)
  // Add user-specified classes and return the space-separated result, without empty entries.
  classList.push(...classes)
  token.attrSet('class', classList.filter(c => c).join(' '))
}

function openPage (state, ...classes) {
  const token = create(state, 'page_open', 'div', 0, true, 1)
  addClasses(token, 'page', ...classes)
  return token
}

function closePage (state) {
  return create(state, 'page_close', 'div', 0, true, -1)
}

function newColumn (state) {
  return create(state, 'column_break', 'div')
}

function findOuter (tokens, startIndex) {
  const output = {}
  const upperLevel = tokens[startIndex].level - 1

  // Find the opening token
  for (let i = startIndex; i >= 0; i--) {
    if (tokens[i].level === upperLevel) {
      output.openIndex = i
      break
    }
  }

  // Find the closing
  for (let i = startIndex; i < tokens.length; i++) {
    if (tokens[i].level === upperLevel) {
      output.closeIndex = i
      break
    }
  }

  output.length = output.closeIndex - output.openIndex + 1

  return output
}

module.exports = {
  create,
  addClasses,
  openPage,
  closePage,
  newColumn,
  findOuter
}
