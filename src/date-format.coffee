angular
.module('angular-w')
.directive('dateFormat', ['dateFilter', (dateFilter)->
  restrict: 'A'
  require: 'ngModel'
  link: (scope, element, attrs, ngModel)->
    ngModel.$formatters.push (value)->
      console.log(value)
      dateFilter(value, attrs.dateFormat)

    ngModel.$parsers.push (value)->
      new Date(value)
])