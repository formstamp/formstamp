angular
.module("angular-w")
.directive "wCheckbox", ['$window', ($window) ->
    restrict: "A"
    scope:
      errors: '='
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
        if !$scope.hasItem(item)
          $scope.selectedItems.push(item)
        else
          $scope.selectedItems.splice(indexOf($scope.selectedItems, item), 1)

      $scope.hasItem = (item) ->
        indexOf($scope.selectedItems, item) > -1

      $scope.invalid = ->
        $scope.errors? and $scope.errors.length > 0

      $scope.selectedItems = []
      $scope.shownItems = $scope.items

    # run

    compile: (tElement, tAttrs) ->
      tAttrs.keyAttr ||= 'id'
      tAttrs.valueAttr ||= 'label'

      # Link function
      (scope, element, attrs, ngModelCtrl, transcludeFn) ->

        if ngModelCtrl
          scope.$watchCollection 'selectedItems', (newValue, oldValue)->
            unless newValue is oldValue
              ngModelCtrl.$setViewValue(scope.selectedItems)

          ngModelCtrl.$render = ->
            unless scope.disabled
              scope.selectedItems = ngModelCtrl.$viewValue || []

        attrs.$observe 'disabled', (value) ->
          scope.disabled = value

        attrs.$observe 'required', (value) ->
          scope.required = value
]
