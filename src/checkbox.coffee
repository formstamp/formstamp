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
    template: (el, attrs)->
      itemTpl = el.html() || 'template me: {{item | json}}'
      template = """
<div class='fs-racheck' ng-class="{disabled: disabled, enabled: !disabled}">
  <div ng-repeat='item in items track by item.id'>
    <a class="fs-racheck-item"
       href='javascript:void(0)'
       onclick="this.focus()"
       ng-disabled="disabled"
       ng-click="toggle(item)"
       fs-space='toggle(item)'>
      <span class="fs-check-outer"><span ng-show="isSelected(item)" class="fs-check-inner"></span></span>
      #{itemTpl}
    </a>
  </div>
  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>
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
