angular
.module('formstamp')
.directive('fsTimeFormat', ['$filter', ($filter)->
    restrict: 'A'
    require: 'ngModel'
    link: (scope, element, attrs, ngModel)->
      ngModel.$parsers.unshift (value)->
        value ||= ''

        if value.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
          value
        else
          res = value.match(/^(\d{0,2}):?(\d{0,2})$/)
          if res
            hours = res[1]
            hours = '00' if !hours || hours.length == 0
            iHours = parseInt(hours)
            hours = 2 if iHours > 23
            hours = hours.toString()
            hours = "0#{hours}" if hours.length == 1

            minutes = res[2]
            minutes = "00" if !minutes || minutes.length == 0
            iMinutes = parseInt(minutes)
            iMinutes = 0 if iMinutes > 59
            minutes = iMinutes.toString()
            minutes = "0#{minutes}" if  minutes.length == 1

            value = "#{hours}:#{minutes}"
            ngModel.$setViewValue(value)
            ngModel.$render()
            value
          else
            null
  ])
