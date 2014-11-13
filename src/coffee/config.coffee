mod = require('./module')

mod.provider 'fsConfig', () ->
  this.$get = () ->
    return {}

  this
