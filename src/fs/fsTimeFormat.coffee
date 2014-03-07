angular
.module('formstamp')
.directive('fsTimeFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      ngModel.$formatters.push (time)->
        return '' unless time?
        h = time.hours.toString()
        h = "0#{h}" if h.length < 2
        m = time.minutes.toString()
        m = "0#{m}" if m.length < 2
        "#{h}:#{m}"


      ngModel.$parsers.unshift (value)->
        value ||= ''

        patterns = [
          /^[012]/
          /^([0-1][0-9]|2[0-3]):?/
          /^([0-1][0-9]|2[0-3]):?[0-5]/
          /^([0-1][0-9]|2[0-3]):?([0-5][0-9])/
        ]

        matched = null
        for p in patterns
          res = value.match(p)
          if res
            matched = res[0]
        value = matched

        if value
          value = value.replace(/^(\d\d)([^:]*)$/,"$1:$2") if value.length > 2
          parts = value.split(':')

          hours: if isNaN(hours = parseInt(parts[0])) then null else hours
          minutes: if isNaN(minutes = parseInt(parts[1])) then null else minutes
        else
          null
  ])
