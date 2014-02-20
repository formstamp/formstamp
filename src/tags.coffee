angular
.module("angular-w")
.directive "wTags", ['$window', ($window) ->
    restrict: "A"
    scope:
      invalid: '='
      items: '='
      limit: '='
      disabled: '@'
    require: '?ngModel'
    replace: true
    transclude: true
    templateUrl: "/templates/multi-select.html"
    controller: ($scope, $element, $attrs) ->
      search = (q) ->
        $scope.shownItems = filter(q, $scope.items).slice(0, $scope.limit)
        if $scope.shownItems.length == 0
          $scope.shownItems.push(q)
        $scope.activeItem = $scope.shownItems[0]
        $scope.prevSearch = q

      $scope.getItemLabel = (item)->
        item

      $scope.getItemValue = (item)->
        item

      $scope.selectItem = (item)->
        if item? and item.length > 0 and indexOf($scope.selectedItems, item) == -1
          $scope.selectedItems.push(item)
          $scope.search = ''

      $scope.unselectItem = (item)->
        index = indexOf($scope.selectedItems, item)
        if index > -1
          $scope.selectedItems.splice(index, 1)

      $scope.onEnter = (event) ->
        $scope.selectItem($scope.activeItem || $scope.search)
        true

      $scope.onPgup = (event) ->
        $scope.move(-11)
        true

      $scope.onPgdown = (event) ->
        $scope.move(11)
        true

      $scope.move = (d) ->
        items = $scope.shownItems
        activeIndex = (indexOf($scope.shownItems, $scope.activeItem) || 0) + d
        activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
        $scope.activeItem = items[activeIndex]

      $scope.$watch 'search', search
      $scope.selectedItems = []

    link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
      if ngModelCtrl
        setViewValue = (newValue, oldValue)->
          unless angular.equals(newValue, oldValue)
            ngModelCtrl.$setViewValue(scope.selectedItems)

        scope.$watch 'selectedItems', setViewValue, true

        ngModelCtrl.$render = ->
          scope.selectedItems = ngModelCtrl.$modelValue || []

        addValidations(attrs, ngModelCtrl)


      scroll = ->
        delayedScrollFn = ->
          ul = element.find('ul')[0]
          li = ul.querySelector('li.active')
          scrollToTarget(ul, li)
        setTimeout(delayedScrollFn, 0)
  ]
