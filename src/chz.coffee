comp = (a, b)->
  a.toLowerCase().indexOf(b.toLowerCase()) > -1

filter = (x, xs, valueAttr)->
  if x then xs.filter ((i)-> comp(i[valueAttr], x)) else xs

focuz = (el)->
  window.setTimeout((()-> el.focus()) , 0)

angular
.module("angular-w")
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
    keyAttr: '@'
    valueAttr: '@'
  require: '?ngModel'
  replace: true
  transclude: true
  templateUrl: "/templates/chz.html"
  controller: ($scope, $element, $attrs) ->

    search = (q) ->
      if $scope.prevSearch != q
        $scope.shownItems = filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit)
        $scope.activeItem = $scope.shownItems[0]
      $scope.prevSearch = q

    $scope.selection = (item)->
      $scope.selectedItem = item

    $scope.reset = ->
      $scope.selectedItem = null
      $scope.focus = true

    $scope.$watch 'search', search

    # run
    search('')

  compile: (tElement, tAttrs) ->
    tAttrs.keyAttr ||= 'id'
    tAttrs.valueAttr ||= 'label'

    # Link function
    (scope, element, attrs, ngModelCtrl, transcludeFn) ->

      if ngModelCtrl
        scope.$watch 'selectedItem', ->
          ngModelCtrl.$setViewValue(scope.selectedItem)
          scope.activeItem = scope.selectedItem

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
            link = element[0].querySelector('a.w-chz-active')
            angular.element(link).empty().append(clone)

      # Hide drop down list on click elsewhere
      $window.addEventListener 'click', (e) ->
        parent = $(e.target).parents('div.w-chz')[0]
        if parent != element[0]
          scope.$apply ->
            scope.active = false
]
