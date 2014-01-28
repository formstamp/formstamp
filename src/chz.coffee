comp = (a, b)->
  a.toLowerCase().indexOf(b.toLowerCase()) > -1

filter = (x, xs)->
  if x then xs.filter ((i)-> comp(i.name, x)) else xs

focuz = (el)->
  window.setTimeout((()-> el.focus()) , 0)

angular
.module("angular-w", [])
.directive "wFocus", ->
  link: (scope, element, attrs) ->
    scope.$watch attrs.wFocus, (fcs)->
      focuz(element[0]) if fcs

angular
.module("angular-w")
.directive "wChz", ['$window', ($window) ->
  restrict: "A"
  scope:
    items: '='
    limit: '='
  require: '?ngModel'
  replace: true
  transclude: true
  templateUrl: "/templates/chz.html"
  controller: ($scope, $element, $attrs) ->
    move = (d) ->
      items = $scope.shownItems
      activeIndex = (items.indexOf($scope.activeItem) || 0) + d
      #activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
      console.log activeIndex
      $scope.offset += d
      if activeIndex < 0
        search($scope.prevSearch, 'up')
      else if activeIndex == items.length
        search($scope.prevSearch, 'down')
      else
        $scope.activeItem = items[activeIndex]

    search = (q, dir) ->
      # if $scope.prevSearch != q
      limit = if $scope.limit > 0 then $scope.limit else $scope.items.length
      $scope.shownItems = filter(q, $scope.items)[$scope.offset..($scope.offset + limit - 1)]
      if dir == 'up'
        $scope.activeItem = $scope.shownItems[0]
      else if dir == 'down'
        $scope.activeItem = $scope.shownItems[limit - 1]
      $scope.prevSearch = q

    $scope.selection = (item)->
      $scope.selectedItem = $scope.activeItem = item
      $scope.hideDropDown()

    $scope.onkeys = (key)->
       switch key
         when 40 then move(1)
         when 38 then move(-1)
         when 13 then $scope.selection($scope.activeItem)
         when 27 then $scope.hideDropDown()

    $scope.$watch 'search', search

    $scope.hideDropDown = ->
      $scope.active = false

    $scope.offset = 0
    # run
    search('')

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.$watch 'selectedItem', ->
        ngModelCtrl.$setViewValue(scope.selectedItem)

      ngModelCtrl.$render = ->
        scope.selectedItem = ngModelCtrl.$modelValue

    attrs.$observe 'disabled', (value) ->
      scope.disabled = value

    attrs.$observe 'required', (value) ->
      scope.required = value

    scope.$watch  'selectedItem', ->
      childScope = scope.$new()
      childScope.item = scope.selectedItem
      transcludeFn childScope, (clone) ->
        if clone.text().trim() isnt ""
          link = angular.element(element.find('a')[0])
          link.empty().append(clone)

    # Hide drop down list on click elsewhere
    $window.addEventListener 'click', (e) ->
      parent = $(e.target).parents('div.w-chz')
      element = $(element[0])
      if not parent.is(element)
        scope.$apply(scope.hideDropDown)
]
