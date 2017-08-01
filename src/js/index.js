const MarkdownIt = require('markdown-it')
const brewdown = require('./brewdown')
const fs = require('fs-extra')

fs.readFile('./src/example/example.md', 'utf8').then(file => {
  let md = new MarkdownIt().use(brewdown)
  const result = md.render(file)
  fs.writeFile('./src/example/example.html', result)
  console.log(result)
})
