comp = (a, b)->
  a.toLowerCase().indexOf(b.toLowerCase()) > -1

hash_key = (item)->
  angular.toJson(item)

difference = (a, b)->
  return a unless b && a
  hash = {}
  hash[hash_key(b_element)] = true for b_element in b
  a.filter ((a_element)-> not hash[hash_key(a_element)])

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
.directive "wMultiSelect", ['$window', ($window) ->
    restrict: "A"
    scope:
      items: '='
      limit: '='
      keyAttr: '@'
      valueAttr: '@'
    require: '?ngModel'
    replace: true
    transclude: true
    templateUrl: "/templates/multi-select.html"
    controller: ($scope, $element, $attrs) ->

      search = (q) ->
        $scope.shownItems = difference(
          filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit),
          $scope.selectedItems
        )
        $scope.activeItem = $scope.shownItems[0]
        $scope.prevSearch = q

      resetDropDown = ->
        $scope.shownItems = difference(
          $scope.items.slice(0, $scope.limit),
          $scope.selectedItems
        )
        $scope.activeItem = $scope.shownItems[0]

      #TODO: why is this method's name a noun instead of a verb?
      $scope.selection = (item)->
        $scope.selectedItems.push(item)
        resetDropDown()

      $scope.deselect = (item)->
        index = $scope.selectedItems.indexOf(item)
        if index > -1
          $scope.selectedItems.splice($scope.selectedItems.indexOf(item), 1)
          resetDropDown()

      $scope.reset = ->
        $scope.selectedItems = []
        $scope.focus = true

      $scope.$watch 'search', search

      # TODO move to init
      $scope.selectedItems = []
      # run
      resetDropDown()

    compile: (tElement, tAttrs) ->
      tAttrs.keyAttr ||= 'id'
      tAttrs.valueAttr ||= 'label'

      # Link function
      (scope, element, attrs, ngModelCtrl, transcludeFn) ->

        if ngModelCtrl
          scope.$watch 'selectedItems', ->
            ngModelCtrl.$setViewValue(scope.selectedItems)
            #TODO: activeItem can't hold an array
            scope.activeItem = scope.selectedItems

          ngModelCtrl.$render = ->
            scope.selectedItems = ngModelCtrl.$modelValue || []

        scope.$watch  'selectedItems', ->
          childScope = scope.$new()
          childScope.items = scope.selectedItems
          transcludeFn childScope, (clone) ->
            if clone.text().trim() isnt ""
              link = element[0].querySelector('a.w-multi-select-active')
              angular.element(link).empty().append(clone)

        # Hide drop down list on click elsewhere
        $window.addEventListener 'click', (e) ->
          parent = $(e.target).parents('div.w-multi-select')[0]
          if parent != element[0]
            scope.$apply ->
              scope.active = false
  ]
