angular
.module('formstamp')
.directive('fsDateFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      ngModel.$formatters.push (value)->
        $filter('date')(value, 'shortDate')

      ngModel.$parsers.unshift (value)->
        date = new Date(value)
        if isNaN(date.getTime()) then null else date
  ])
