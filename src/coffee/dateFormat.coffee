mod = require('./module')

require('./dateParser.coffee')

mod.directive('fsDateFormat', ['$locale', '$filter', '$dateParser', ($locale, $filter, $dateParser) ->
  restrict: 'A'
  require: 'ngModel'
  link: (scope, element, attrs, ngModel)->
    format = attrs.fsDateFormat || 'shortDate'
    dateFilter = $filter('date')

    ngModel.$formatters.push (value) ->
      dateFilter(value, format)

    ngModel.$parsers.unshift (value) ->
      return null unless value
      return null if value == ''

      result = $dateParser(value, format)

      if result
        result
      else
        null
])
