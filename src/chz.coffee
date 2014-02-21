angular
.module("angular-w")
.directive "wChz", ['$window', ($window) ->
  restrict: "A"
  scope:
    invalid: '='
    items: '='
    limit: '='
    keyAttr: '@'
    disabled: '@'
    freetext: '@'
    valueAttr: '@'
    class: '@'
  require: '?ngModel'
  replace: true
  transclude: true
  templateUrl: "/templates/chz.html"
  controller: ($scope, $element, $attrs, $filter) ->
    if $scope.freetext
      $scope.getItemLabel = (item)-> item
      $scope.getItemValue = (item)-> item
      $scope.dynamicItems = ->
        if $scope.search then [$scope.search] else []
    else
      valueAttr = () -> $scope.valueAttr || "label"
      keyAttr = () -> $scope.valueAttr || "id"

      $scope.getItemLabel = (item)-> item && item[valueAttr()]
      $scope.getItemValue = (item)-> item && item[keyAttr()]
      $scope.dynamicItems = -> []

    $scope.dropdownItems = () ->
      searchFilter = $filter('filter')
      allItems = $scope.items.concat($scope.dynamicItems())
      searchFilter(allItems, $scope.search)

    $scope.selectItem = (item)->
      $scope.selectedItem = item
      $scope.search = ""
      $scope.highlightIndex = 0
      $scope.active = false

    $scope.unselectItem = (item)->
      $scope.selectedItem = null

    $scope.move = (d) ->
      filteredItems = $scope.dropdownItems()

      $scope.highlightIndex += d
      $scope.highlightIndex = filteredItems.length - 1 if $scope.highlightIndex == -1
      $scope.highlightIndex = 0 if $scope.highlightIndex >= filteredItems.length

    $scope.onEnter = (event) ->
      hItem = $scope.dropdownItems()[$scope.highlightIndex]
      $scope.selectItem(hItem)
      false

    $scope.onPgup = (event) ->
      $scope.move(-11)
      false

    $scope.onPgdown = (event) ->
      $scope.move(11)
      false

    $scope.$watch 'search', ->
      $scope.highlightIndex = 0

    $scope.active = false
    $scope.highlightIndex = 0

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.$watch 'selectedItem', (newValue, oldValue) ->
        if newValue isnt oldValue
          ngModelCtrl.$setViewValue(scope.selectedItem)

      ngModelCtrl.$render = ->
        scope.selectedItem = ngModelCtrl.$viewValue
]
