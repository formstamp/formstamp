angular
.module('angular-w')
.directive('dateFormat', ['dateFilter', (dateFilter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      ngModel.$formatters.push (value)->
        date = if angular.isString(value)
          milis = Date.parse(value)
          new Date(milis) unless isNaN(milis)
        else
          value
        dateFilter(date, attrs.dateFormat)

      ngModel.$parsers.push (value)->
        new Date(value)
  ])