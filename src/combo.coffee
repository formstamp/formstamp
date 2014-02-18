angular
.module("angular-w")
.directive "wCombo", ['$window', ($window) ->
  restrict: "A"
  scope:
    invalid: '='
    items: '='
    limit: '='
    class: '@'
  require: '?ngModel'
  replace: true
  transclude: true
  templateUrl: "/templates/chz.html"
  controller: ($scope, $element, $attrs) ->

    search = (q) ->
      $scope.shownItems = filter(q, $scope.items).slice(0, $scope.limit)
      if $scope.shownItems.length == 0
        $scope.shownItems.push(q)
      $scope.activeItem = $scope.shownItems[0]

    $scope.getSelectedLabel = ()->
      $scope.getItemLabel($scope.selectedItem)

    $scope.getItemLabel = (item)->
      item

    $scope.isActive = (item) ->
      item == $scope.activeItem

    $scope.selection = (item)->
      $scope.selectedItem = item
      $scope.hideDropDown()

    $scope.reset = ->
      $scope.selectedItem = null
      $scope.focus = true


    $scope.$watch 'search', search
    $scope.$watch 'limit', -> search('')

    $scope.hideDropDown = ->
      $scope.active = false

    # run
    search('')

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.$watch 'selectedItem', (newValue, oldValue)->
        if newValue isnt oldValue
          ngModelCtrl.$setViewValue(scope.selectedItem)
          scope.activeItem = scope.selectedItem
          scope.search = scope.selectedItem

      ngModelCtrl.$render = ->
        scope.selectedItem = ngModelCtrl.$viewValue

      addValidations(attrs, ngModelCtrl)

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
        scope.$apply ->
          scope.hideDropDown()
          scope.selection(scope.search)

    scope.onPgup = (event) ->
      scope.move(-11)
      event.preventDefault()

    scope.onPgdown = (event) ->
      scope.move(11)
      event.preventDefault()

    scope.onEsc = ->
      scope.hideDropDown()
      scope.focus=true

    scope.onTab = ->
      scope.selection(scope.search || scope.activeItem)

    scope.onEnter = (event) ->
      scope.selection(scope.activeItem || scope.search)
      scope.focus=true
      event.preventDefault()

    getActiveIndex = ->
      indexOf(scope.shownItems, scope.activeItem) || 0

    scope.move = (d) ->
      items = scope.shownItems
      activeIndex = getActiveIndex() + d
      activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
      scope.activeItem = items[activeIndex]
      scroll()

    scroll = ->
      delayedScrollFn = ->
        ul = element.find('ul')[0]
        li = ul.querySelector('li.active')
        scrollToTarget(ul, li)
      setTimeout(delayedScrollFn, 0)

]
