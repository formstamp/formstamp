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
        ideal = /^([0-1][0-9]|2[0-3]):?([0-5][0-9])$/

        [_..., matched] = patterns.filter( (p) -> p.test(value) )
        value = value.replace(/^(\d\d)([^:]*)$/,"$1:$2") if value.length > 2

        if !ideal.test(prev) and prev != value
          value = value.match(matched)?[0] || ''
          prev = value
          ngModel.$setViewValue(value)
          ngModel.$render()
        value
  ])
