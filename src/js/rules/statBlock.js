module.exports = function (md) {
  const options = {
    marker: ':'
  }
  md.use(require('markdown-it-container'), 'stats', options)

  // md.block.ruler.disable("heading");
  // md.block.ruler.push("heading", () => {});

  md.options.breaks = true
}
