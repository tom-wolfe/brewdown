const fs = require('fs-extra')
const klaw = require('klaw')
const Markdown = require('markdown-it')
const path = require('path')
const sass = require('node-sass')
const webpack = require('webpack')

const config = require('./config')

const brewdown = new Markdown().use(require('../src/js/index'))

webpack(config.webpack).run(() => {
  // Config complete.
})

// Copy styles and assets.
sass.render({ file: path.posix.join(config.sass.entry.path, config.sass.entry.filename) }, (err, result) => {
  if (err) {
    console.log('ERROR: ', err)
    return
  }
  const options = { filter: src => !src.endsWith('.scss') }
  fs.copySync(config.sass.entry.path, config.sass.output.path, options)
  fs.writeFileSync(path.posix.join(config.sass.output.path, config.sass.output.filename), result.css)

  // Copy examples
  const wrapper = fs.readFileSync(config.examples.htmlWrapper).toString()

  klaw(config.examples.entry).on('data', item => {
    item.path = item.path.replace(/\\/g, '/')

    const relPath = path.posix.relative(config.examples.entry, item.path)
    const dstPath = path.posix.join(config.examples.output, relPath)

    if (item.stats.isDirectory()) {
      fs.mkdirSync(dstPath)
    } else {
      let name = item.path.substring(item.path.lastIndexOf('/') + 1)
      const ext = name.substring(name.lastIndexOf('.') + 1)
      name = name.substring(0, name.length - ext.length - 1)
      switch (ext.toLowerCase()) {
        case 'md':
          const file = fs.readFileSync(item.path, 'utf8')
          const result = wrapper.replace('{markdown}', brewdown.render(file))
          const dstDir = dstPath.substring(0, dstPath.lastIndexOf('/') + 1)
          fs.writeFileSync(path.posix.join(dstDir, name + '.html'), result)
          break
        default: fs.copySync(item.path, dstPath); break
      }
    }
  })
})
