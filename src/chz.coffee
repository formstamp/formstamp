angular
.module("angular-w")
.directive "wChz", ['$compile', ($compile) ->
  restrict: "A"
  scope:
    invalid: '='
    items: '='
    limit: '='
    keyAttr: '@'
    disabled: '@'
    freetext: '@'
    valueAttr: '@'
    class: '@'
  require: '?ngModel'
  replace: true
  # transclude: true
  template: (el)->
    itemTpl = el.html()
    template = """
<div class='w-chz w-wiget-root'>
  <div ng-hide="active" class="w-chz-sel" ng-class="{'btn-group': item}">
      <a class="btn btn-default w-chz-active"
         ng-class='{"btn-danger": invalid}'
         href="javascript:void(0)"
         ng-click="active=true"
         ng-disabled="disabled" >
         <span ng-show='item'>#{itemTpl}</span>
         <span ng-hide='item'>none</span>
      </a>
      <button type="button"
              class="btn btn-default w-chz-clear-btn"
              aria-hidden="true"
              ng-show='item'
              ng-click='unselectItem()'>&times;</button>
    </div>
  <div class="open" ng-show="active">
    <input class="form-control"
           w-focus="active"
           w-down='move(1)'
           w-up='move(-1)'
           w-pgup='move(-11)'
           w-pgdown='move(11)'
           w-enter='onEnter($event)'
           type="search"
           placeholder='Search'
           ng-model="search" />
    <div ng-if="active && dropdownItems.length > 0">
      <div w-list items="dropdownItems" on-highlight="highlight">
       #{itemTpl}
      </div>
    </div>
  </div>
  <!-- FIXME: why errors here -->
  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>
</div>
    """

  controller: ($scope, $element, $attrs, $filter) ->
    $scope.active = false

    if $scope.freetext
      $scope.getItemLabel = (item)-> item
      $scope.getItemValue = (item)-> item
      $scope.dynamicItems = ->
        if $scope.search then [$scope.search] else []
    else
      valueAttr = () -> $scope.valueAttr || "label"
      keyAttr = () -> $scope.valueAttr || "id"

      $scope.getItemLabel = (item)-> item && item[valueAttr()]
      $scope.getItemValue = (item)-> item && item[keyAttr()]
      $scope.dynamicItems = -> []

    $scope.$watch 'search', (q)->
      $scope.dropdownItems = $filter('filter')($scope.items, $scope.search).concat($scope.dynamicItems())

    $scope.selectItem = (item)->
      $scope.item = item
      $scope.search = ""
      $scope.active = false

    $scope.unselectItem = (item)->
      $scope.item = null

    $scope.move = (d) ->
      $scope._list.move && $scope._list.move(d)

    $scope.onEnter = (event) ->
      $scope._list.item && $scope.selectItem($scope._list.item)

    # HACK: for comunicate with child directives
    # see https://github.com/angular/angular.js/wiki/Understanding-Scopes
    $scope._list = { onselection: $scope.onEnter }


  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.$watch 'item', (newValue, oldValue) ->
        if newValue isnt oldValue
          ngModelCtrl.$setViewValue(scope.item)

      ngModelCtrl.$render = ->
        scope.item = ngModelCtrl.$viewValue
]

angular
.module("angular-w")
.directive "wList", () ->
  restrict: "A"
  scope:
    items: '='
    move:'@'
    labelAttr: '@'
  transclude: true
  replace: true
  templateUrl: "/templates/list.html"
  controller: ($scope, $element, $attrs, $filter) ->

    $scope.highlightItem = (item) ->
      $scope.highlightIndex = $scope.items.indexOf(item)
      $scope.$parent._list.item = item
      $scope.$parent._list.onselection()

    $scope.$watch 'items', (idx)-> $scope.highlightIndex = 0

    $scope.$watch 'highlightIndex', (idx)->
      return unless $scope.$parent._list
      $scope.$parent._list.item = $scope.items[idx]

    $scope.domove = (d) ->
      filteredItems = $scope.items

      $scope.highlightIndex += d
      $scope.highlightIndex = filteredItems.length - 1 if $scope.highlightIndex == -1
      $scope.highlightIndex = 0 if $scope.highlightIndex >= filteredItems.length

    $scope.highlightIndex = 0

    if $scope.$parent._list
      $scope.$parent._list.move = (d)-> $scope.domove(d)
