angular
.module("formstamp")
.directive "fsTime", ['$compile', ($compile) ->
  restrict: "A"
  scope:
    items: '='
    disabled: '=ngDisabled'
    freetext: '@'
    class: '@'
  require: '?ngModel'
  replace: true
  template: (el)->
    """
    <input type="text"/>
    """

  controller: ($scope, $element, $attrs, $filter, $timeout) ->

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    if ngModelCtrl
      scope.$watch 'item', (newValue, oldValue) ->
        if newValue isnt oldValue
          ngModelCtrl.$setViewValue(scope.item)

      ngModelCtrl.$render = ->
        scope.item = ngModelCtrl.$viewValue
]
