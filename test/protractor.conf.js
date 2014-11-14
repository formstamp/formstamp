exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  },
  specs: ["e2e/*.coffee"],
  baseUrl: 'http://localhost:8080/test/e2e/views/',
  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['no-sandbox']
    }
  }
}
