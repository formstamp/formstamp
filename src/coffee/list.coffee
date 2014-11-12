mod = require('./module')

require("../styles/list.less")
require('../templates/list.html')
u = require('./utils')

mod.directive "fsList", ['$templateCache', ($templateCache) ->
  restrict: "A"
  scope:
    items: '='
    class: '@'
    listInterface: '='
  replace: true
  template: (el, attrs)->
    itemTpl = el.html() || 'template me: {{item | json}}'

    $templateCache.get('templates/fs/list.html')
      .replace(/::itemTpl/g, itemTpl)

  link: ($scope, $element, $attrs) ->
    ensureHighlightedItemVisible = ->
      delayedScrollFn = ->
          ul = $element.find('ul')[0]
          li = ul.querySelector('li.active')
          u.scrollToTarget(ul, li)
        setTimeout(delayedScrollFn, 0)

    $scope.$watch 'highlightIndex', (idx) ->
      ensureHighlightedItemVisible()

  controller: ($scope, $element, $attrs, $filter) ->
    updateSelectedItem = (hlIdx) ->
      if $scope.$parent.listInterface? && hlIdx >= 0
        $scope.$parent.listInterface.selectedItem = $scope.items[hlIdx]

    $scope.highlightItem = (item) ->
      $scope.highlightIndex = $scope.items.indexOf(item)
      if $scope.$parent.listInterface?
        $scope.$parent.listInterface.onSelect(item)

    $scope.$watch 'items', (newItems)->
      $scope.highlightIndex = -1

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
]
