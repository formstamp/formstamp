mod = require('./module')

mod.provider 'fsConfig', () ->
  dateFormat = 'MM/DD/YYYY'
  this.dateFormat = (v) -> dateFormat = v

  this.$get = () ->
    return {dateFormat: dateFormat}

  this
