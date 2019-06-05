const BLOCK_NAME = 'stats-wide'
module.exports = function (md) {
  const options = {
    marker: ':',
    render: function (tokens, idx) {
      if (tokens[idx].nesting === 1) {
        return '<div class="stats two-col">\n'
      } else {
        return '</div>\n'
      }
    }
  }
  md.use(require('markdown-it-container'), BLOCK_NAME, options)
  md.options.breaks = true
}
