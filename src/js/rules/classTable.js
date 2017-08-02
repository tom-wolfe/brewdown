module.exports = function (md) {
  const options = {
    marker: ':'
  }
  md.use(require('markdown-it-container'), 'classtable', options)
  md.options.breaks = true
}
