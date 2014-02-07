angular
.module("angular-w")
.directive "wCheckbox", ['$window', ($window) ->
    restrict: "A"
    scope:
      items: '='
      limit: '='
      inline: '='
      keyAttr: '@'
      valueAttr: '@'
    require: '?ngModel'
    replace: true
    transclude: true
    templateUrl: "/templates/checkbox.html"
    controller: ($scope, $element, $attrs) ->

      $scope.toggle = (item)->
        if $scope.selectedItems.indexOf(item) == -1
          $scope.selectedItems.push(item)
        else
          $scope.selectedItems.splice($scope.selectedItems.indexOf(item), 1)

      $scope.selectedItems = []
      $scope.shownItems = $scope.items

    # run

    compile: (tElement, tAttrs) ->
      tAttrs.keyAttr ||= 'id'
      tAttrs.valueAttr ||= 'label'

      # Link function
      (scope, element, attrs, ngModelCtrl, transcludeFn) ->

        if ngModelCtrl
          scope.$watch 'selectedItem', ->
            ngModelCtrl.$setViewValue(scope.selectedItem)
            scope.activeItem = scope.selectedItem

          ngModelCtrl.$render = ->
            unless scope.disabled
              scope.selectedItem = ngModelCtrl.$modelValue

        attrs.$observe 'disabled', (value) ->
          scope.disabled = value

        attrs.$observe 'required', (value) ->
          scope.required = value
]
