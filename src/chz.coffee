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
  require: '?ngModel'
  replace: true
  transclude: true
  templateUrl: "/templates/chz.html"
  controller: ($scope, $element, $attrs) ->

    move = (d) ->
      items = $scope.shownItems
      activeIndex = (items.indexOf($scope.activeItem) || 0) + d
      activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
      $scope.activeItem = items[activeIndex]

    search = (q) ->
      if $scope.prevSearch != q
        $scope.shownItems = filter(q, $scope.items)[0..10]
        $scope.activeItem = $scope.shownItems[0]
      $scope.prevSearch = q

    $scope.selection = (item)->
      $scope.selectedItem = item
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
      if parent.length == 0
        scope.$apply(scope.hideDropDown)
]
