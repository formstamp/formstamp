angular
.module("formstamp")
.directive "fsDatetime", ['$compile', ($compile) ->
  restrict: "A"
  scope:
    disabled: '=ngDisabled'
    class: '@'
  require: '?ngModel'
  replace: true
  template: """
    <div class="fs-datetime fs-widget-root" ng-class='{ "fs-with-value": value }'>
      <div fs-date ng-model="date" ng-disabled="disabled" fs-null-form></div>
      <div fs-time ng-model="time" ng-disabled="disabled" fs-null-form with-date></div>
      <button type="button"
              class="btn btn-default fs-datetime-clear-btn"
              ng-show='value'
              ng-disabled="disabled"
              ng-click='clearDate()'>&times;</button>
    </div>
  """

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
            scope.value ||= new Date()
            scope.value.setHours(newValue.hours)
            scope.value.setMinutes(newValue.minutes)
            scope.value.setSeconds(0)
            scope.value.setMilliseconds(0)

      scope.$watch 'date', (newValue, oldValue) ->
        unless angular.equals(newValue, oldValue)
          if newValue
            scope.value ||= new Date()
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
            hours: ngModelCtrl.$viewValue.getHours()
            minutes: ngModelCtrl.$viewValue.getMinutes()
          else
            null
]
