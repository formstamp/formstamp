mod = require('./module')

require("../styles/multiselect.less")
u = require("./utils")

mod.filter 'exclude', ->
  (input, selected) ->
    return input unless selected?
    return [] unless input?

    input.filter (item) -> selected.indexOf(item) < 0

mod.directive "fsMultiselect", ['$window', ($window) ->
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

      """
<div class='fs-multiselect fs-widget-root' ng-class='{ "fs-with-selected-items": selectedItems.length > 0 }'>
  <div class='fs-multiselect-wrapper'>
    <div class="fs-multiselect-selected-items" ng-if="selectedItems.length > 0">
      <a ng-repeat='item in selectedItems' class="btn" ng-click="unselectItem(item)" ng-disabled="disabled">
        #{itemTpl}
        <span class="glyphicon glyphicon-remove" ></span>
      </a>
    </div>

    <input ng-keydown="onkeys($event)"
           fs-null-form
           ng-disabled="disabled"
           fs-input
           fs-hold-focus
           fs-on-focus="active = true"
           fs-on-blur="onBlur()"
           fs-blur-when="!active"
           fs-down='listInterface.move(1)'
           fs-up='listInterface.move(-1)'
           fs-pgup='listInterface.move(-11)'
           fs-pgdown='listInterface.move(11)'
           fs-enter='onEnter()'
           fs-esc='active = false'
           class="form-control"
           type="text"
           placeholder='Select something'
           ng-model="search" />

    <div ng-if="active && dropdownItems.length > 0" class="open">
      <div fs-list items="dropdownItems">
        #{itemTpl}
      </div>
    </div>
  </div>
</div>
    """
    controller: ($scope, $element, $attrs, $filter) ->
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

    link: ($scope, element, attrs, ngModelCtrl, transcludeFn) ->
      if ngModelCtrl
        setViewValue = (newValue, oldValue)->
          unless angular.equals(newValue, oldValue)
            ngModelCtrl.$setViewValue(newValue)

        $scope.$watch 'selectedItems', setViewValue, true

        ngModelCtrl.$render = ->
          $scope.selectedItems = ngModelCtrl.$modelValue || []
  ]
