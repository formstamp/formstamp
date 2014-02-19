hash_key = (item)->
  angular.toJson(item)

difference = (a, b)->
  return a unless b && a
  hash = {}
  hash[hash_key(b_element)] = true for b_element in b
  a.filter ((a_element)-> not hash[hash_key(a_element)])

angular
.module("angular-w")
.directive "wMultiSelect", ['$window', ($window) ->
    restrict: "A"
    scope:
      invalid: '='
      items: '='
      limit: '='
      keyAttr: '@'
      valueAttr: '@'
    require: '?ngModel'
    replace: true
    transclude: true
    templateUrl: "/templates/multi-select.html"
    controller: ($scope, $element, $attrs) ->
      # search = (q) ->
      #   $scope.shownItems = difference(
      #     filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit),
      #     $scope.selectedItems
      #   )
      #   $scope.activeItem = $scope.shownItems[0]
      #   $scope.prevSearch = q

      $scope.getItemLabel = (item)->
        item && item[$scope.valueAttr || 'label']

      updateDropDown = ->
        $scope.shownItems = difference(
          if $scope.search
            filter($scope.search, $scope.items, $scope.valueAttr).slice(0, $scope.limit)
          else
            $scope.items.slice(0, $scope.limit)

          $scope.selectedItems
        )
        $scope.activeItem = $scope.shownItems[0]

      #TODO: why is this method's name a noun instead of a verb?
      $scope.selection = (item)->
        if item? and indexOf($scope.selectedItems, item) == -1
          $scope.selectedItems.push(item)
        $scope.search = ""
        updateDropDown()

      $scope.deselect = (item)->
        index = indexOf($scope.selectedItems, item)
        if index > -1
          $scope.selectedItems.splice(index, 1)
          updateDropDown()

      $scope.reset = ->
        $scope.selectedItems = []
        updateDropDown()

      $scope.$watch 'search', updateDropDown

      $scope.showDropdown = ->
        $scope.active = true

      $scope.getActiveIndex = ->
        indexOf($scope.shownItems, $scope.activeItem) || 0

      # TODO move to init
      $scope.selectedItems = []
      $scope.active = false

    link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
      console.log attrs

      if ngModelCtrl
        setViewValue = (newValue, oldValue)->
          unless angular.equals(newValue, oldValue)
            ngModelCtrl.$setViewValue(scope.selectedItems)

        scope.$watch 'selectedItems', setViewValue, true

        ngModelCtrl.$render = ->
          scope.selectedItems = ngModelCtrl.$modelValue || []

      attrs.$observe 'disabled', (value) ->
        scope.disabled = value

      scroll = ->
        delayedScrollFn = ->
          ul = element.find('ul')[0]
          li = ul.querySelector('li.active')
          scrollToTarget(ul, li)
        setTimeout(delayedScrollFn, 0)

      scope.move = (d) ->
        items = scope.shownItems
        activeIndex = scope.getActiveIndex() + d
        activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
        scope.activeItem = items[activeIndex]
        scroll()

      scope.deactivate = () ->
        # setTimeout((()-> scope.active = false),0)

      scope.onEnter = (event) ->
        scope.selection(scope.activeItem)
        event.preventDefault()

      scope.onPgup = (event) ->
        scope.move(-11)
        event.preventDefault()

      scope.onPgdown = (event) ->
        scope.move(11)
        event.preventDefault()

      scope.onTab = ->
        # scope.selection(scope.activeItem)

      scope.onEsc = ->
        # scope.hideDropDown()
  ]
