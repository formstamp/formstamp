angular
.module("formstamp")
.directive "fsList", () ->
  restrict: "A"
  scope:
    items: '='
    class: '@'
    listInterface: '='
  transclude: true
  replace: true
  templateUrl: "/templates/list.html"
  link: ($scope, $element, $attrs) ->
    ensureHighlightedItemVisible = ->
      delayedScrollFn = ->
          ul = $element.find('ul')[0]
          li = ul.querySelector('li.active')
          scrollToTarget(ul, li)
        setTimeout(delayedScrollFn, 0)

    $scope.$watch 'highlightIndex', (idx) ->
      ensureHighlightedItemVisible()

  controller: ($scope, $element, $attrs, $filter) ->
    updateSelectedItem = (hlIdx) ->
      if $scope.$parent.listInterface?
        $scope.$parent.listInterface.selectedItem = $scope.items[hlIdx]

    $scope.highlightItem = (item) ->
      $scope.highlightIndex = $scope.items.indexOf(item)
      $scope.$parent.listInterface.onSelect(item)

    $scope.$watch 'items', (newItems)->
      $scope.highlightIndex = 0
      updateSelectedItem(0)

    $scope.$watch 'highlightIndex', (idx) ->
      updateSelectedItem(idx)

    $scope.move = (d) ->
      items = $scope.items

      $scope.highlightIndex += d
      $scope.highlightIndex = items.length - 1 if $scope.highlightIndex == -1
      $scope.highlightIndex = 0 if $scope.highlightIndex >= items.length

    $scope.highlightIndex = 0

    if $scope.$parent.listInterface?
      $scope.$parent.listInterface.move = (delta) ->
        $scope.move(delta)
