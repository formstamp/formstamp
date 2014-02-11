angular.module('angular-w')
.directive 'wField', [->
  restrict: 'A'
  replace: true
  require: '^wFormFor'
  scope:
    items: '='
    field: '@wField'
    type: '@'
    label: '@'
  templateUrl: '/templates/field.html'
  compile: (tElement, tAttrs) ->
    type = tAttrs.type
    inputDiv = tElement[0].querySelector('.w-field-input')
    angular.element(inputDiv).attr(type, '')

    (scope, element, attrs, formForCtrl) ->
      scope.object = formForCtrl.getObject()
      scope.objectName = formForCtrl.getObjectName()
      scope.inputName = "#{scope.objectName}[#{scope.field}]"

      scope.errors = ->
        scope.object.$errors[scope.field] if scope.object.$errors
]
