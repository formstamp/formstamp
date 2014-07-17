angular
.module('formstamp')
.directive('fsDateFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      ngModel.$formatters.push (value)->
        format = attrs.fsDateFormat || 'MM/dd/yyyy'
        $filter('date')(value, format)

      ngModel.$parsers.unshift (value)->
        date = new Date(value)
        if isNaN(date.getTime()) then null else date
  ])
