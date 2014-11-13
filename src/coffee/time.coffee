mod = require('./module')
require('../templates/time.html')

u = require('./utils')
si = require('./smartInput')


IDEAL_REX = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/

validInput = (v)->
  return true if v == ''
  IDEAL_REX.test(v)

mkTimeInput = (el, cb, ddcb)->
  items = mkTimeItems()

  el.on 'blur', (e)->
    v = el.val()
    fixed = si.timeLastFix(v)
    if fixed != v && validInput(fixed)
      el.val(fixed)
      cb(fixed)
    else if not validInput(v)
      el.val(null)
      cb(null)

  el.on 'keydown', (e)->
    v = el.val()
    if /:$/.test(v)
      if e.which == 8
        el.val(v.substring(0, v.length - 1))

  el.on 'input', (e)->
    v = si.timeInput(el.val())
    el.val(v)
    if v == ''
      cb(null, items)
      ddcb(items)
    if validInput(v)
      cb(v)
    ddcb(items.filter((x)-> x.indexOf(v) == 0).concat(dynamicItems(v,items)))
  (v)-> el.val(v)

mkTimeItems = ()->
  hours = (num for num in [0..23])
  minutes = ['00','15','30','45']
  items = []
  for h in hours
    zh = if h < 10 then "0#{h}" else h
    for m in minutes
      items.push "#{zh}:#{m}"
  items

dynamicItems = (v,items)->
  if v and v.length == 5 and u.indexOf(items, v) == -1
    [v]
  else
    []

mod.directive "fsTime", ['$filter', '$timeout', ($filter, $timeout) ->
  restrict: "A"
  scope:
    disabled: '=ngDisabled'
    class: '@'
  require: '?ngModel'
  replace: true
  templateUrl: 'templates/fs/time.html'
  link: (scope, element, attrs, ngModelCtrl) ->
    scope.dropdownItems = mkTimeItems()

    dropDownUpdate = (items)->
      scope.$apply ()->
        scope.dropdownItems = items

    scopeUpdate = (v)->
      scope.$apply ()->
        scope.value = v

    updateInput = mkTimeInput element.find('input'), scopeUpdate, dropDownUpdate
    scope.$watch 'value', (q)->
      updateInput(scope.value)

    scope.onBlur = ->
      $timeout((-> scope.active = false) , 0, true)

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
      move: () -> console.log "not-implemented listInterface.move() function"

    if ngModelCtrl
      watchFn = (newValue, oldValue) ->
        unless angular.equals(newValue, oldValue)
          ngModelCtrl.$setViewValue(newValue)

      scope.$watch 'value', watchFn

      ngModelCtrl.$render = ->
        scope.value = ngModelCtrl.$viewValue
]
