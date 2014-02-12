angular.module('angular-w')
.directive 'wField', [->

  VALIDATION_DIRECTIVES = ['ngRequired', 'ngMinlength',
    'ngMaxlength', 'ngPattern']

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
    inputDivRaw = tElement[0].querySelector('.w-field-input')
    inputDiv = angular.element(inputDivRaw)
    angular.element(inputDiv).attr(type, '')

    # Apply boolean directives with normalized names
    angular.forEach VALIDATION_DIRECTIVES, (dir) ->
      inputDiv.attr(tAttrs.$attr[dir], tAttrs[dir]) if tAttrs[dir]

    # We need this because ngModel don't interpolate
    # name attr when registering it in the form controller
    inputDiv.attr('name', tAttrs.wField)

    (scope, element, attrs, formForCtrl) ->
      scope.object = formForCtrl.getObject()
      scope.objectName = formForCtrl.getObjectName()

      scope.errors = ->
        scope.object.$errors[scope.field] if scope.object.$errors
]
