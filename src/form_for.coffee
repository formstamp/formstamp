angular
.module('angular-w').directive 'wFormFor', ['$window', ($window)->
  restrict: 'A'
  scope:
    object: '=wFormFor'
  compile: (tElement, tAttrs) ->
    tElement.attr('class', 'form-horizontal')
    tElement.attr('role', 'form')

    (scope, element, attrs) ->
      #element.controller('form').$setPristine()
      $window.addEventListener 'beforeunload', ->
        if element.controller('form').$dirty
          'You will lose unsaved changes unless you stay on this page'


  controller: ($scope, $element, $attrs) ->
    @getObject = ->
      $scope.object

    @getObjectName = ->
      $attrs.wFormFor

    return null
]

