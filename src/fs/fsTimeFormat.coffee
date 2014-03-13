angular
.module('formstamp')
.directive('fsTimeFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      ngModel.$parsers.unshift (value)->
        value ||= ''
        pattern = /^([0-1][0-9]|2[0-3]):?([0-5][0-9])/
        value = value.match(pattern)?[0]
        if value
          if value.length > 2 and  /^(\d\d)([^:]*)$/.test(value)
            value = value.replace(/^(\d\d)([^:]*)$/,"$1:$2")
            ngModel.$setViewValue(value)
            ngModel.$render()
          value
        else
          null
  ])
