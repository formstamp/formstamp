mod = require('./module')

fsDefaultConfig =
    dateFormat: 'MM/DD/YYYY'

mod.service 'fsConfig', ()->
  fsDefaultConfig
