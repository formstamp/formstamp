fsDefaultConfig =
    dateFormat: 'MM/DD/YYYY'

angular
  .module('formstamp')
  .service 'fsConfig', ()->
    fsDefaultConfig
