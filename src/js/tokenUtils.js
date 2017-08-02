function create (state, type, tag = '', level = 0, block = true, nesting = 0, content = '', ...classes) {
  const token = new state.Token(type, tag, level)
  token.block = block
  token.content = content
  token.nesting = nesting
  addClasses(token, ...classes)
  return token
}

function addClasses (token, ...classes) {
  if (!classes || classes.length === 0) { return }
  // Get and split into a list
  const classList = (token.attrGet('class') || '').split(/\s/g)
  // Add user-specified classes and return the space-separated result, without empty entries.
  classList.push(...classes)
  token.attrSet('class', classList.filter(c => c).join(' '))
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

const open = (state, type, tag, level, ...classes) => create(state, type, tag, level, true, 1, '', ...classes)
const close = (state, type, tag, level) => create(state, type, tag, level, true, -1)

module.exports = {
  findOuter,
  addClasses,
  create,
  open,
  close,
  newColumn: (state) => create(state, 'column_break', 'div'),
  inline: (state, level, content) => {
    const token = create(state, 'inline', '', level, true, 0, content)
    token.children = [create(state, 'text', '', 0, false, 0, content)]
    return token
  },
  pageOpen: (state, ...classes) => open(state, 'page_open', 'div', 0, 'page', ...classes),
  pageClose: (state) => close(state, 'page_close', 'div', 0),
  tableOpen: (state, level, ...classes) => open(state, 'table_open', 'table', level, ...classes),
  tableClose: (state, level) => close(state, 'table_close', 'table', level),
  theadOpen: (state, level, ...classes) => open(state, 'thead_open', 'thead', level, ...classes),
  theadClose: (state, level) => close(state, 'thead_close', 'thead', level),
  tbodyOpen: (state, level, ...classes) => open(state, 'tbody_open', 'tbody', level, ...classes),
  tbodyClose: (state, level) => close(state, 'tbody_close', 'tbody', level),
  trOpen: (state, level, ...classes) => open(state, 'tr_open', 'tr', level, ...classes),
  trClose: (state, level) => close(state, 'tr_close', 'tr', level),
  thOpen: (state, level, ...classes) => open(state, 'th_open', 'th', level, ...classes),
  thClose: (state, level) => close(state, 'th_close', 'th', level),
  tdOpen: (state, level, ...classes) => open(state, 'td_open', 'td', level, ...classes),
  tdClose: (state, level) => close(state, 'td_close', 'td', level)
}
