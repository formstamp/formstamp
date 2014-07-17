angular
.module('formstamp')
.directive('fsDateFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      format = attrs.fsDateFormat || 'MM/DD/YYYY'

      ngModel.$formatters.push (value)->
        moment(value).format(format)

      ngModel.$parsers.unshift (value)->
        date = new Date(moment(value, format).valueOf())
        if isNaN(date.getTime()) then null else date
  ])
