mod = require('./module')

require('../styles/select.less')

tpl = require('html!../templates/metaSelect.html')

mod.directive "fsSelect", ['$compile', ($compile) ->
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
    tpl.replace(/::itemTpl/g, itemTpl)

  controller: ($scope, $element, $attrs, $filter, $timeout) ->
    $scope.active = false

    if $attrs.freetext?
      $scope.dynamicItems = ->
        if $scope.search then [$scope.search] else []
    else
      $scope.dynamicItems = -> []

    updateDropdown = () ->
      $scope.dropdownItems = $filter('filter')(($scope.items || []), $scope.search).concat($scope.dynamicItems())

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
