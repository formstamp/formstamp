angular
.module('formstamp')
.directive('fsTimeFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      ngModel.$formatters.push (value)->
        toTimeStr = (date)->
          return '' unless date?
          h = date.getHours().toString()
          h = "0#{h}" if h.length < 2
          m = date.getMinutes().toString()
          m = "0#{m}" if m.length < 2
          "#{h}:#{m}"
        toTimeStr(value)


      ngModel.$parsers.unshift (value)->
        return '' unless value?
        patterns = [
          /^[012]/
          /^([0-1][0-9]|2[0-3]):?/
          /^([0-1][0-9]|2[0-3]):?[0-5]/
          /^([0-1][0-9]|2[0-3]):?([0-5][0-9])/
        ]
        value = ''
        for p in patterns
          res = value.match(p)
          if res
            value = res[0]
        value = value.replace(/^(\d\d)([^:]*)$/,"$1:$2") if value.length > 2

        parts = value.split(':')
        result = new Date()
        result.setHours(parseInt(parts[0]))
        result.setMinutes(parseInt(parts[1]))
        result
  ])
