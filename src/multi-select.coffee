hash_key = (item)->
  angular.toJson(item)

difference = (a, b)->
  return a unless b && a
  hash = {}
  hash[hash_key(b_element)] = true for b_element in b
  a.filter ((a_element)-> not hash[hash_key(a_element)])

angular.module('formstamp').filter 'exclude', ->
  (input, selected) ->
    input.filter (item)->
      selected.indexOf(item) < 0

angular.module("formstamp")
.directive "fsMultiSelect", ['$window', ($window) ->
    restrict: "A"
    scope:
      invalid: '='
      items: '='
      keyAttr: '@'
      valueAttr: '@'
      disabled: '@'
      freetext: '@'
      class: '@'
    require: '?ngModel'
    replace: true
    transclude: true
    templateUrl: "/templates/multi-select.html"
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
        excludeFilter = $filter('exclude')
        allItems = $scope.items.concat($scope.dynamicItems())

        searchFilter(excludeFilter(allItems, $scope.selectedItems), $scope.search)


      $scope.selectItem = (item)->
        if item? and indexOf($scope.selectedItems, item) == -1
          $scope.selectedItems.push(item)
        $scope.search = ""
        $scope.highlightIndex = 0

      $scope.unselectItem = (item)->
        index = indexOf($scope.selectedItems, item)
        if index > -1
          $scope.selectedItems.splice(index, 1)

      $scope.move = (d) ->
        filteredItems = $scope.dropdownItems()

        $scope.highlightIndex += d
        $scope.highlightIndex = filteredItems.length - 1 if $scope.highlightIndex == -1
        $scope.highlightIndex = 0 if $scope.highlightIndex >= filteredItems.length

      $scope.getHighlightedItem = ->

      $scope.onEnter = (event) ->
        highlightedItem = $scope.dropdownItems()[$scope.highlightIndex]
        $scope.selectItem($scope.highlightedItem)
        false

      $scope.onPgup = (event) ->
        $scope.move(-11)
        false

      $scope.onPgdown = (event) ->
        $scope.move(11)
        false

      $scope.$watch 'search', ->
        $scope.highlightIndex = 0

      # TODO move to init
      $scope.selectedItems = []
      $scope.active = false
      $scope.highlightIndex = 0

    link: ($scope, element, attrs, ngModelCtrl, transcludeFn) ->
      if ngModelCtrl
        setViewValue = (newValue, oldValue)->
          unless angular.equals(newValue, oldValue)
            ngModelCtrl.$setViewValue($scope.selectedItems)

        $scope.$watch 'selectedItems', setViewValue, true

        ngModelCtrl.$render = ->
          $scope.selectedItems = ngModelCtrl.$modelValue || []
  ]
