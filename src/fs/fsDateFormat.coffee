angular
.module('formstamp')
.directive('fsDateFormat', ['$filter', 'fsDateFormatValue', ($filter, fsDateFormatValue)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      ngModel.$formatters.push (value)->
        $filter('date')(value, fsDateFormatValue)

      ngModel.$parsers.unshift (value)->
        date = new Date(value)
        if isNaN(date.getTime()) then null else date
  ])
