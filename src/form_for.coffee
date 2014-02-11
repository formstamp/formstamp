angular
.module('angular-w').directive 'wFormFor', [->
  restrict: 'A'
  scope:
    object: '=wFormFor'
  compile: (tElement, tAttrs) ->
    tElement.attr('class', 'form-horizontal')
    tElement.attr('role', 'form')

    (scope, element, attrs) ->
      #element.controller('form').$setPristine()

  controller: ($scope, $element, $attrs) ->
    @getObject = ->
      $scope.object

    @getObjectName = ->
      $attrs.wFormFor

    return null
]

