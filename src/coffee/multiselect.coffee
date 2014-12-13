mod = require('./module')

require("../styles/common.less")
require("../styles/multiselect.less")
require("../templates/multiselect.html")
u = require("./utils")

mod.filter 'exclude', ->
  (input, selected) ->
    return input unless selected?
    return [] unless input?

    input.filter (item) -> selected.indexOf(item) < 0

mod.directive "fsMultiselect", ['$templateCache', ($templateCache) ->
    restrict: "A"
    scope:
      items: '='
      disabled: '=ngDisabled'
      freetext: '@'
      class: '@'
    require: '?ngModel'
    replace: true
    template: (el, attributes) ->
      defaultItemTpl = "{{ item }}"
      itemTpl = el.html() || defaultItemTpl

      $templateCache.get('templates/fs/multiselect.html')
        .replace(/::item-template/g, itemTpl)

    controller: ['$scope', '$element', '$attrs', '$filter', ($scope, $element, $attrs, $filter) ->
      if $attrs.freetext?
        $scope.dynamicItems = ->
          if $scope.search then [$scope.search] else []
      else
        $scope.dynamicItems = -> []

      $scope.updateDropdownItems = () ->
        searchFilter = $filter('filter')
        excludeFilter = $filter('exclude')
        allItems = ($scope.items || []).concat($scope.dynamicItems())

        $scope.dropdownItems = searchFilter(excludeFilter(allItems, $scope.selectedItems), $scope.search)

      $scope.selectItem = (item)->
        if item? and u.indexOf($scope.selectedItems, item) == -1
          $scope.selectedItems = $scope.selectedItems.concat([item])
        $scope.search = ''

      $scope.unselectItem = (item)->
        index = u.indexOf($scope.selectedItems, item)
        if index > -1
          $scope.selectedItems.splice(index, 1)

      $scope.onBlur = ->
        $scope.active = false
        $scope.search = ''

      $scope.onEnter = ->
        $scope.selectItem(if $scope.dropdownItems.length > 0 then $scope.listInterface.selectedItem else null)

      $scope.listInterface =
        onSelect: (selectedItem) ->
          $scope.selectItem(selectedItem)

        move: () ->
          console.log "not-implemented listInterface.move() function"

      $scope.dropdownItems = []
      $scope.active = false

      $scope.$watchCollection 'selectedItems', -> $scope.updateDropdownItems()
      $scope.$watchCollection 'items', -> $scope.updateDropdownItems()
      $scope.$watch 'search', -> $scope.updateDropdownItems()
      $scope.updateDropdownItems()
    ]

    link: ($scope, element, attrs, ngModelCtrl, transcludeFn) ->
      if ngModelCtrl
        setViewValue = (newValue, oldValue)->
          unless angular.equals(newValue, oldValue)
            ngModelCtrl.$setViewValue(newValue)

        $scope.$watch 'selectedItems', setViewValue, true

        ngModelCtrl.$render = ->
          $scope.selectedItems = ngModelCtrl.$modelValue || []
  ]
