# An example configuration file.
exports.config =
  baseUrl: 'http://localhost:17405/test/e2e/views/'

  # Capabilities to be passed to the webdriver instance.
  capabilities:
    browserName: 'phatomjs'

  # Spec patterns are relative to the current working directly when
  # protractor is called.
  specs: ['*Spec.js']

  # Options to be passed to Jasmine-node.
  jasmineNodeOpts:
    showColors: true
    defaultTimeoutInterval: 30000
