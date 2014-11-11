mod = require('./module')
mod.directive('fsDateFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      format = attrs.fsDateFormat || 'MM/DD/YYYY'

      ngModel.$formatters.push (value)->
        moment(value).format(format)

      ngModel.$parsers.unshift (value)->
        return null unless value
        return null if value == ''
        if moment(value, format).isValid()
          new Date(moment(value, format).valueOf())
        else
          null
  ])
