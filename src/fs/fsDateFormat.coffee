angular
.module('formstamp')
.directive('fsDateFormat', ['$filter', 'fsConfig', ($filter, fsConfig)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      ngModel.$formatters.push (value)->
        $filter('date')(value, fsConfig.dateFormat)

      ngModel.$parsers.unshift (value)->
        date = new Date(value)
        if isNaN(date.getTime()) then null else date
  ])
