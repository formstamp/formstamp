angular
.module("angular-w")
.directive "wChz", ['$window', ($window) ->
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
  templateUrl: "/templates/chz.html"
  controller: ($scope, $element, $attrs) ->

    move = (d) ->
      items = $scope.shownItems
      activeIndex = getActiveIndex() + d
      activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
      $scope.activeItem = items[activeIndex]
      scroll()

    scroll = ->
      delayedScrollFn = ->
        ul = $element.find('ul')[0]
        li = ul.querySelector('li.active')
        scrollToTarget(ul, li)
      setTimeout(delayedScrollFn, 0)

    search = (q) ->
      $scope.shownItems = filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit)
      $scope.activeItem = $scope.shownItems[0]

    $scope.selection = (item)->
      $scope.selectedItem = item
      $scope.hideDropDown()

    $scope.reset = ->
      $scope.selectedItem = null
      $scope.focus = true

    $scope.onkeys = (event)->
      switch event.keyCode
        when 40 then move(1)
        when 38 then move(-1)
        when 13
          $scope.selection($scope.activeItem)
          $scope.focus=true
          event.preventDefault()
        when  9 then $scope.selection($scope.activeItem)
        when 27
          $scope.hideDropDown()
          $scope.focus=true
        when 34 then move(11)
        when 33 then move(-11)

    $scope.$watch 'search', search
    $scope.$watch 'limit', -> search('')

    $scope.$watch 'active', (value) ->
      scroll() if value

    $scope.hideDropDown = ->
      $scope.active = false

    $scope.isActive = (item) ->
      angular.equals(item, $scope.activeItem)

    getActiveIndex = ->
      indexOf($scope.shownItems, $scope.activeItem) || 0

    # run
    search('')

  compile: (tElement, tAttrs) ->
    tAttrs.keyAttr ||= 'id'
    tAttrs.valueAttr ||= 'label'

    # Link function
    (scope, element, attrs, ngModelCtrl, transcludeFn) ->

      if ngModelCtrl
        scope.$watch 'selectedItem', (newValue, oldValue) ->
          if newValue isnt oldValue
            ngModelCtrl.$setViewValue(scope.selectedItem)
            scope.activeItem = scope.selectedItem

        ngModelCtrl.$render = ->
          scope.selectedItem = ngModelCtrl.$viewValue

      attrs.$observe 'disabled', (value) ->
        scope.disabled = value

      scope.$watch 'selectedItem', ->
        childScope = scope.$new()
        childScope.item = scope.selectedItem
        transcludeFn childScope, (clone) ->
          if clone.text().trim() isnt ""
            link = element[0].querySelector('a.w-chz-active')
            angular.element(link).empty().append(clone)

      # Hide drop down list on click elsewhere
      $window.addEventListener 'click', (e) ->
        parent = $(e.target).parents('div.w-chz')[0]
        if parent != element[0]
          scope.$apply(scope.hideDropDown)
]
