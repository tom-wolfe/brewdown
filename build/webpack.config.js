const path = require('path')

module.exports = {
  entry: path.resolve('./src/js/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist/js')
  }
}
