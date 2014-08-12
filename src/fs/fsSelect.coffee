angular
.module("formstamp")
.directive "fsSelect", ['$compile', ($compile) ->
  restrict: "A"
  scope:
    items: '='
    disabled: '=ngDisabled'
    freetext: '@'
    class: '@'
  require: '?ngModel'
  replace: true
  template: (el)->
    itemTpl = el.html()
    template = """
<div class='fs-select fs-widget-root'>
  <div ng-hide="active" class="fs-select-sel" ng-class="{'btn-group': item}">
      <a class="btn btn-default fs-select-active"
         ng-class='{"btn-danger": invalid}'
         href="javascript:void(0)"
         ng-click="active = true"
         ng-disabled="disabled">
           #{itemTpl}
      </a>
      <button type="button"
              class="btn btn-default fs-select-clear-btn"
              aria-hidden="true"
              ng-show='item'
              ng-disabled="disabled"
              ng-click='unselectItem()'>&times;</button>
    </div>
  <div class="open" ng-show="active">
    <input class="form-control"
           fs-input
           fs-focus-when='active'
           fs-blur-when='!active'
           fs-on-focus='active = true'
           fs-on-blur='onBlur()'
           fs-hold-focus
           fs-down='move(1)'
           fs-up='move(-1)'
           fs-pg-up='move(-11)'
           fs-pg-down='move(11)'
           fs-enter='onEnter($event)'
           fs-esc='active = false'
           type="text"
           placeholder='Search'
           ng-model="search"
           fs-null-form />

    <div ng-if="active && dropdownItems.length > 0">
      <div fs-list items="dropdownItems">
       #{itemTpl}
      </div>
    </div>
  </div>
</div>
    """

  controller: ($scope, $element, $attrs, $filter, $timeout) ->
    $scope.active = false

    if $attrs.freetext?
      $scope.dynamicItems = ->
        if $scope.search then [$scope.search] else []
    else
      $scope.dynamicItems = -> []

    updateDropdown = () ->
      $scope.dropdownItems = $filter('filter')($scope.items, $scope.search).concat($scope.dynamicItems())

    $scope.$watch 'active', (q)-> updateDropdown()
    $scope.$watch 'search', (q)-> updateDropdown()

    $scope.selectItem = (item)->
      $scope.item = item
      $scope.search = ""
      $scope.active = false

    $scope.unselectItem = (item)->
      $scope.item = null

    $scope.onBlur = () ->
      $timeout(->
        $scope.active = false
        $scope.search = ''
      , 0, true)

    $scope.move = (d) ->
      $scope.listInterface.move && $scope.listInterface.move(d)

    $scope.onEnter = (event) ->
      if $scope.dropdownItems.length > 0
        $scope.selectItem($scope.listInterface.selectedItem)
      else
        $scope.selectItem(null)

    $scope.listInterface =
      onSelect: (selectedItem) ->
        $scope.selectItem(selectedItem)

      move: () ->
        console.log "not-implemented listInterface.move() function"

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.$watch 'item', (newValue, oldValue) ->
        if newValue isnt oldValue
          ngModelCtrl.$setViewValue(scope.item)

      ngModelCtrl.$render = ->
        scope.item = ngModelCtrl.$viewValue
]
