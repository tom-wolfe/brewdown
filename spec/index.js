const Jasmine = require('jasmine')
const j = new Jasmine()

j.loadConfig({
  spec_dir: 'spec',
  spec_files: [
    '**/*.spec.js'
  ]
})

j.configureDefaultReporter({
  showColors: true
})

j.execute()
