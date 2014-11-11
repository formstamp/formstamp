mod = require('./module')

require("../styles/datetime.less")

mod.directive "fsDatetime", ['$compile', ($compile) ->
  restrict: "A"
  scope:
    disabled: '=ngDisabled'
    class: '@'
  require: '?ngModel'
  replace: true
  template: require('html!../templates/datetime.html')
  controller: ($scope) ->
    $scope.clearDate = () ->
      $scope.time = null
      $scope.date = null
      $scope.value = null
  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.value = null
      scope.$watch 'time', (newValue, oldValue) ->
        unless angular.equals(newValue, oldValue)
          if newValue
            parts =  newValue.split(':')
            minutes = parseInt(parts[1]) || 0
            hours = parseInt(parts[0]) || 0
            scope.value ||= new Date()
            scope.value = angular.copy(scope.value)
            scope.value.setHours(hours)
            scope.value.setMinutes(minutes)
            scope.value.setSeconds(0)
            scope.value.setMilliseconds(0)

      scope.$watch 'date', (newValue, oldValue) ->
        unless angular.equals(newValue, oldValue)
          if newValue
            scope.value ||= new Date()
            scope.value = angular.copy(scope.value)
            scope.value.setDate(newValue.getDate())
            scope.value.setMonth(newValue.getMonth())
            scope.value.setFullYear(newValue.getFullYear())

      scope.$watch 'value', (newValue, oldValue) ->
        unless angular.equals(newValue, oldValue)
          ngModelCtrl.$setViewValue(scope.value)

      ngModelCtrl.$render = ->
        scope.date = scope.value = ngModelCtrl.$viewValue
        scope.time =
          if ngModelCtrl.$viewValue
            toTimeStr
              hours: ngModelCtrl.$viewValue.getHours()
              minutes: ngModelCtrl.$viewValue.getMinutes()
          else
            null
]
