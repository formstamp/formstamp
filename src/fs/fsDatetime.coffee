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
    <div class="fs-datetime fs-widget-root">
      <div fs-date ng-model="value" ng-disabled="disabled" fs-null-form></div>
      <div fs-time ng-model="value" ng-disabled="disabled" fs-null-form with-date></div>
      <button type="button"
              class="btn btn-default fs-datetime-clear-btn"
              ng-show='value'
              ng-disabled="disabled"
              ng-click='clearDate()'>&times;</button>
    </div>
  """

  controller: ($scope) ->
    $scope.clearDate = () ->
      $scope.value = null

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.$watch 'value', (newValue, oldValue) ->
        if newValue isnt oldValue
          ngModelCtrl.$setViewValue(newValue)

      ngModelCtrl.$render = ->
        scope.value = ngModelCtrl.$viewValue
]
