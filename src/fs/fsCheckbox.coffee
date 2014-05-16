angular
.module("formstamp")
.directive "fsCheckbox", ['$window', ($window) ->
    restrict: "A"
    scope:
      disabled: '=ngDisabled'
      required: '='
      errors: '='
      items: '='
      inline: '='
    require: '?ngModel'
    replace: true
    template: (el, attrs)->
      itemTpl = el.html() || 'template me: {{item | json}}'
      template = """
<div class='fs-racheck fs-checkbox' ng-class="{disabled: disabled, enabled: !disabled}">
  <div ng-repeat='item in items'>
    <div class="fs-racheck-item"
       href='javascript:void(0)'
       ng-disabled="disabled"
       ng-click="toggle(item)"
       fs-space='toggle(item)'>
      <div class="row">
<div class="col-xs-1">
      <span class="fs-check-outer"><span ng-show="isSelected(item)" class="fs-check-inner"></span></span>
</div>
      <div class="col-xs-11">
      #{itemTpl}
        </div>
      </div>
    </div>
  </div>
</div>
      """
    controller: ($scope, $element, $attrs) ->
      $scope.toggle = (item)->
        return if $scope.disabled
        unless $scope.isSelected(item)
          $scope.selectedItems.push(item)
        else
          $scope.selectedItems.splice(indexOf($scope.selectedItems, item), 1)
        false

      $scope.isSelected = (item) -> indexOf($scope.selectedItems, item) > -1

      $scope.invalid = -> $scope.errors? and $scope.errors.length > 0

      $scope.selectedItems = []

    link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
        if ngModelCtrl
          setViewValue = (newValue, oldValue)->
            unless angular.equals(newValue, oldValue)
              ngModelCtrl.$setViewValue(scope.selectedItems)

          scope.$watch 'selectedItems', setViewValue, true

          ngModelCtrl.$render = ->
            unless scope.disabled
              scope.selectedItems = ngModelCtrl.$viewValue || []
]
