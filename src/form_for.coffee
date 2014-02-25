angular
.module('formstamp').directive 'wFormFor', ['$window', ($window)->
  restrict: 'A'
  require: '?form'
  scope:
    object: '=wFormFor'
  compile: (tElement, tAttrs) ->
    tElement.attr('class', 'form-horizontal')
    tElement.attr('role', 'form')

    (scope, element, attrs, formController) ->

      # Dirty form handling
      $window.addEventListener 'beforeunload', ->
        if formController.$dirty
          'You will lose unsaved changes unless you stay on this page'

  controller: ($scope, $element, $attrs) ->
    @getObject = ->
      $scope.object

    @getObjectName = ->
      $attrs.wFormFor

    return
]

