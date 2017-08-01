// karma.conf.js
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    files: [
      'src/*.js',
      'spec/*.js'
    ],
    reporters: ['progress', 'kjhtml'],
    colors: true
  })
}
