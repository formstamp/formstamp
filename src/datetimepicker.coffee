angular
.module("formstamp")
.directive "fsDatetimepicker", ['$compile', ($compile) ->
  restrict: "A"
  scope:
    disabled: '=ngDisabled'
    class: '@'
  require: '?ngModel'
  replace: true
  template: """
    <div class="fs-datetimepicker fs-widget-root">
      <div fs-datepicker ng-model="value" ng-disabled="disabled"></div>
      <div fs-time ng-model="value" ng-disabled="disabled"></div>
    </div>
  """

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.$watch 'value', (newValue, oldValue) ->
        if newValue isnt oldValue
          ngModelCtrl.$setViewValue(newValue)

      ngModelCtrl.$render = ->
        scope.value = ngModelCtrl.$viewValue
]
