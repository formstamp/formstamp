angular
.module("formstamp")
.directive "wRadio", ['$window', ($window) ->
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
    templateUrl: "/templates/radio.html"
    controller: ($scope, $element, $attrs) ->

      $scope.toggle = (item)->
        if item != $scope.selectedItem
          $scope.selection(item)
        else
          $scope.selectedItem = null

      $scope.selection = (item)->
        $scope.selectedItem = item

      $scope.isSelected = (item) ->
        angular.equals(item, $scope.selectedItem)

      $scope.invalid = ->
        $scope.errors? and $scope.errors.length > 0

      $scope.shownItems = $scope.items

    compile: (tElement, tAttrs) ->
      tAttrs.keyAttr ||= 'id'
      tAttrs.valueAttr ||= 'label'

      # Link function
      (scope, element, attrs, ngModelCtrl, transcludeFn) ->
        if ngModelCtrl
          scope.$watch 'selectedItem', (newValue, oldValue)->
            unless newValue is oldValue
              ngModelCtrl.$setViewValue(scope.selectedItem)

          ngModelCtrl.$render = ->
            scope.selectedItem = ngModelCtrl.$modelValue

        attrs.$observe 'disabled', (value) ->
          scope.disabled = value

        attrs.$observe 'required', (value) ->
          scope.required = value

        getSelectedIndex = ->
          indexOf(scope.shownItems, scope.selectedItem)

        scope.selectedIndex = 0
        scope.move = (event, d) ->
          scope.selectedIndex = scope.selectedIndex + d
          if scope.selectedIndex < 0
            scope.selectedIndex = 0
          else if scope.selectedIndex > scope.shownItems.length - 1
            scope.selectedIndex = scope.shownItems.length - 1
          else
            event.preventDefault()
          scope.selectedItem = scope.shownItems[scope.selectedIndex]

        scope.selectOnSpace = (event, item) ->
          scope.selection(item)
          event.preventDefault()
]
