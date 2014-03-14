angular
.module('formstamp')
.directive('fsTimeFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      prev = null
      ngModel.$parsers.unshift (value)->

        value ||= ''
        patterns = [
          /^[012]/
          /^([0-1][0-9]|2[0-3]):?/
          /^([0-1][0-9]|2[0-3]):?[0-5]/
          /^([0-1][0-9]|2[0-3]):?([0-5][0-9])/
        ]

        ideal = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/

        [_..., matched] = patterns.filter( (p) -> p.test(value) )

        if !ideal.test(value) and prev != value
          value = value.replace(/^(\d\d)([^:]*)$/, "$1:$2") if value.length > 2
          value = value.match(matched)?[0] || ''
          prev = value
          ngModel.$setViewValue(value)
          ngModel.$render()

        value
  ])
