hash_key = (item)->
  angular.toJson(item)

difference = (a, b)->
  return a unless b && a
  hash = {}
  hash[hash_key(b_element)] = true for b_element in b
  a.filter ((a_element)-> not hash[hash_key(a_element)])

angular.module('formstamp').filter 'exclude', ->
  (input, selected) ->
    return input unless selected?
    return [] unless input?

    input.filter (item) -> selected.indexOf(item) < 0

angular.module("formstamp")
.directive "fsMultiselect", ['$window', ($window) ->
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
    templateUrl: "/templates/multiselect.html"
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

      $scope.updateDropdownItems = () ->
        searchFilter = $filter('filter')
        excludeFilter = $filter('exclude')
        allItems = $scope.items.concat($scope.dynamicItems())

        $scope.dropdownItems = searchFilter(excludeFilter(allItems, $scope.selectedItems), $scope.search)

      $scope.selectItem = (item)->
        if item? and indexOf($scope.selectedItems, item) == -1
          $scope.selectedItems = $scope.selectedItems.concat([item])
        $scope.search = ''

      $scope.unselectItem = (item)->
        index = indexOf($scope.selectedItems, item)
        if index > -1
          $scope.selectedItems.splice(index, 1)

      $scope.listInterface =
        onSelect: (selectedItem) ->
          $scope.selectItem(selectedItem)

        move: () ->
          console.log "not-implemented listInterface.move() function"

      $scope.dropdownItems = []
      $scope.active = false

      $scope.$watchCollection 'selectedItems', -> $scope.updateDropdownItems()
      $scope.$watchCollection 'items', -> $scope.updateDropdownItems()
      $scope.$watch 'search', -> $scope.updateDropdownItems()
      $scope.updateDropdownItems()

    link: ($scope, element, attrs, ngModelCtrl, transcludeFn) ->
      if ngModelCtrl
        setViewValue = (newValue, oldValue)->
          unless angular.equals(newValue, oldValue)
            ngModelCtrl.$setViewValue($scope.selectedItems)

        $scope.$watch 'selectedItems', setViewValue, true

        ngModelCtrl.$render = ->
          $scope.selectedItems = ngModelCtrl.$modelValue || []
  ]
