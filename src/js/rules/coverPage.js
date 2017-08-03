module.exports = function (md) {
  const options = {
    marker: ':'
  }
  md.use(require('markdown-it-container'), 'cover', options)
  md.options.breaks = true
}
