angular
.module("angular-w")
.directive "wCombo", ['$window', ($window) ->
  restrict: "A"
  scope:
    items: '='
    limit: '='
  require: '?ngModel'
  replace: true
  transclude: true
  templateUrl: "/templates/combo.html"
  controller: ($scope, $element, $attrs) ->

    move = (d) ->
      items = $scope.shownItems
      activeIndex = getActiveIndex() + d
      activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
      $scope.activeItem = items[activeIndex]
      scrollIfNeeded(activeIndex)

    scrollIfNeeded = (activeIndex) ->
      ul = $element.find('ul')[0]
      li = ul.querySelector('li.active')

      return unless ul and li

      viewport =
        top: ul.scrollTop
        bottom: ul.scrollTop + innerHeightOf(ul)

      li = ul.querySelector('li.active')
      liHeight = innerHeightOf(li)
      item =
        top: activeIndex * liHeight
        bottom: (activeIndex + 1) * liHeight

      # Scroll down
      if item.bottom > viewport.bottom
        ul.scrollTop += item.bottom - viewport.bottom
      # Scroll up
      else if item.top < viewport.top
        ul.scrollTop -= viewport.top - item.top

    search = (q) ->
      $scope.shownItems = filter(q, $scope.items).slice(0, $scope.limit)
      if $scope.shownItems.length == 0
        $scope.shownItems.push(q)
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
          $scope.selection($scope.activeItem || $scope.search)
          $scope.focus=true
          event.preventDefault()
        when  9 then $scope.selection($scope.search)
        when 27
          $scope.hideDropDown()
          $scope.focus=true
        when 34 then move(11)
        when 33 then move(-11)

    $scope.$watch 'search', search
    $scope.$watch 'limit', -> search('')

    $scope.$watch 'active', (value) ->
      window.setTimeout((()-> scrollIfNeeded(getActiveIndex())) , 0) if value

    $scope.hideDropDown = ->
      $scope.active = false

    getActiveIndex = ->
      indexOf($scope.shownItems, $scope.activeItem) || 0

    # run
    search('')

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->

    if ngModelCtrl
      scope.$watch 'selectedItem', (newValue, oldValue)->
        unless newValue is oldValue
          ngModelCtrl.$setViewValue(scope.selectedItem)
          scope.activeItem = scope.selectedItem
          scope.search = scope.selectedItem

      ngModelCtrl.$render = ->
        scope.selectedItem = ngModelCtrl.$viewValue

    attrs.$observe 'disabled', (value) ->
      scope.disabled = value

    attrs.$observe 'required', (value) ->
      scope.required = value

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
        scope.$apply ->
          scope.hideDropDown()
          scope.selection(scope.search)
]
