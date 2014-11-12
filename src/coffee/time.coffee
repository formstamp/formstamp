mod = require('./module')

u = require('./utils')
require('../templates/time.html')

mod.directive "fsTime", ['$compile', '$filter', '$timeout', ($compile, $filter, $timeout) ->
  restrict: "A"
  scope:
    disabled: '=ngDisabled'
    class: '@'
  require: '?ngModel'
  replace: true
  templateUrl: 'templates/fs/time.html'
  link: (scope, element, attrs, ngModelCtrl) ->
    hours = (num for num in [0..23])
    minutes = ['00','15','30','45']
    items = []
    for h in hours
      zh = if h < 10 then "0#{h}" else h
      for m in minutes
        items.push "#{zh}:#{m}"

    dynamicItems = ->
      if scope.value and scope.value.length == 5 and u.indexOf(items, scope.value) == -1
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
