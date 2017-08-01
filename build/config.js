const path = require('path')

module.exports = {
  webpack: {
    entry: path.posix.resolve('src/js/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.posix.resolve('dist/js')
    }
  },
  sass: {
    entry: {
      filename: 'styles.scss',
      path: path.posix.resolve('src/styles')
    },
    output: {
      filename: 'styles.css',
      path: path.posix.resolve('dist/styles')
    }
  },
  examples: {
    entry: path.posix.resolve('src/examples').replace(/\\/g, '/'),
    output: path.posix.resolve('dist/examples').replace(/\\/g, '/'),
    htmlWrapper: path.posix.resolve('./build/wrapper.html').replace(/\\/g, '/')
  }
}
