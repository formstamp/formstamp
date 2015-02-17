mod = require('./module')

require('../styles/common.less')
require('../styles/select.less')

require('../templates/metaSelect.html')

mod.directive "fsSelect", ['$templateCache', ($templateCache) ->
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

    $templateCache.get('templates/fs/metaSelect.html')
      .replace(/::itemTpl/g, itemTpl)

  controller: ['$scope', '$element', '$attrs', '$filter', '$timeout', ($scope, $element, $attrs, $filter, $timeout) ->
    $scope.asyncState = 'loaded'
    $scope.active = false
    throttleTime = parseInt($attrs['throttle'] || '200')

    if $attrs.freetext?
      $scope.dynamicItems = ->
        if $scope.search then [$scope.search] else []
    else
      $scope.dynamicItems = -> []

    updateDropdown = () ->
      if angular.isFunction($scope.items)
        result = $scope.items($scope.search)

        if angular.isArray(result)
          $scope.dropdownItems = result
        else
          # result is a promise!
          $scope.asyncState = 'loading'

          result.then((data) ->
            $scope.asyncState = 'loaded'
            $scope.dropdownItems = data
          , (data) ->
            console.log("WARNING: promise rejected")
            $scope.asyncState = 'loaded'
            $scope.dropdownItems = []
          )
      else
        $scope.dropdownItems = $filter('filter')(($scope.items || []), $scope.search).concat($scope.dynamicItems())

    $scope.$watch 'active', (q) -> updateDropdown()
    $scope.$watch 'search', (q) ->
      if angular.isFunction($scope.items)
        if $scope.searchTimeout
          $timeout.cancel($scope.searchTimeout)

        $scope.searchTimeout = $timeout(updateDropdown, throttleTime)
      else
        updateDropdown()

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
  ]

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.$watch 'item', (newValue, oldValue) ->
        if newValue isnt oldValue
          ngModelCtrl.$setViewValue(scope.item)

      ngModelCtrl.$render = ->
        scope.item = ngModelCtrl.$viewValue
]
