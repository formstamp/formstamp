PATTERNS = [
  /^[012]/
  /^([0-1][0-9]|2[0-3]):?/
  /^([0-1][0-9]|2[0-3]):?[0-5]/
  /^([0-1][0-9]|2[0-3]):?([0-5][0-9])/
]

IDEAL_REX = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/

match = (value)->
  [_..., matched] = PATTERNS.filter((p) -> p.test(value))
  matched

mod = require('./module')
mod.directive('fsTimeFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      prev = null
      ngModel.$parsers.unshift (value = '')->
        matched = match(value)
        return value if prev == value
        return value if IDEAL_REX.test(value)

        value = value.replace(/^(\d\d)([^:]*)$/, "$1:$2") if value.length > 2
        value = value.match(matched)?[0] || ''
        prev = value
        ngModel.$setViewValue(value)
        ngModel.$render()
        value
  ])
