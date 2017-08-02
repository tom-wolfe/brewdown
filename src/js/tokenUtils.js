function create (state, type, tag = '', level = 0, block = true, content = '') {
  const token = new state.Token(type, tag, level)
  token.block = block
  token.content = content
  return token
}

function addClasses (token, ...classes) {
  // Set classes if they don't exist already.
  if (!token.attrGet('class')) { token.attrPush('class', '') }
  // Get and split into a list
  const classList = token.attrGet('class').split(/\s/g)
  // Add user-specified classes and return the space-separated result, without empty entries.
  classList.push(...classes)
  token.attrSet('class', classList.filter(c => c).join(' '))
}

function openPage (state, ...classes) {
  const token = create(state, 'page_open', 'div')
  addClasses(token, ...classes)
  return token
}

function closePage (state) {
  return create(state, 'page_close', 'div')
}

function newColumn (state) {
  return create(state, 'column_break', 'div')
}

module.exports = {
  create,
  addClasses,
  openPage,
  closePage,
  newColumn
}
