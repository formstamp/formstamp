angular.module('angular-w')
.directive 'wField', [->
  restrict: 'A'
  replace: true
  scope:
    items: '='
    object: '='
    objectName: '@object'
    field: '@wField'
    type: '@'
    label: '@'
  templateUrl: '/templates/field.html'
  compile: (tElement, tAttrs) ->
    type = tAttrs.type
    inputDiv = tElement[0].querySelector('.w-field-input')
    angular.element(inputDiv).attr(type, '')

    (scope, element) ->
]
