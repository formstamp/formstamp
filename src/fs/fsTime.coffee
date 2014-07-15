angular
.module("formstamp")
.directive "fsTime", ['$compile', '$filter', '$timeout', ($compile, $filter, $timeout) ->
  restrict: "A"
  scope:
    disabled: '=ngDisabled'
    class: '@'
  require: '?ngModel'
  replace: true
  template: (el)->
    """
    <div class="fs-time fs-widget-root">
      <input
        fs-null-form
        fs-input
        fs-focus-when='active'
        fs-blur-when='!active'
        fs-on-focus='active = true'
        fs-on-blur='onBlur()'
        fs-hold-focus
        fs-time-format
        fs-down='move(1)'
        fs-up='move(-1)'
        fs-pg-up='move(-11)'
        fs-pg-down='move(11)'
        fs-enter='onEnter()'
        fs-esc='active = false'
        ng-model="value"
        class="form-control"
        ng-disabled="disabled"
        type="text"/>

      <span class="glyphicon glyphicon-time" ng-click="active = !disabled"></span>
      <div ng-if='!disabled && active' fs-list items="dropdownItems">
        {{item}}
      </div>
    </div>
    """
  link: (scope, element, attrs, ngModelCtrl) ->
    hours = (num for num in [0..23])
    minutes = ['00','15','30','45']
    items = []
    for h in hours
      zh = if h < 10 then "0#{h}" else h
      for m in minutes
        items.push "#{zh}:#{m}"

    dynamicItems = ->
      if scope.value and scope.value.length == 5 and indexOf(items, scope.value) == -1
        [scope.value]
      else
        []

    updateDropdown = ->
      if not scope.value
        filterStr = ""
      else if scope.value?.indexOf(':') >= 0
        filterStr = scope.value
      else
        filterStr = "#{scope.value}:"

      scope.dropdownItems = $filter('filter')(items, filterStr).concat(dynamicItems())

    scope.$watch 'value', (q)-> updateDropdown()

    scope.onBlur = ->
      $timeout(->
        scope.active = false
      , 0, true)

    scope.onEnter = ->
      scope.select(scope.listInterface.selectedItem)
      scope.active = false
      false

    scope.move = (d) ->
      scope.listInterface.move && scope.listInterface.move(d)

    scope.select = (value) ->
      scope.value = value
      scope.active = false

    scope.listInterface =
      onSelect: scope.select
      move: () ->
        console.log "not-implemented listInterface.move() function"

    if ngModelCtrl
      watchFn = (newValue, oldValue) ->
        unless angular.equals(newValue, oldValue)
          ngModelCtrl.$setViewValue(newValue)

      scope.$watch 'value', watchFn

      ngModelCtrl.$render = ->
        scope.value = ngModelCtrl.$viewValue
]
