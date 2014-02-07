angular
.module('angular-w').directive 'wFormFor', ['$parse', ($parse) ->
  restrict: 'A'
  replace: true
  transclude: true
  scope:
    wSubmit: '&'
    object: '=wFormFor'
  templateUrl: '/templates/form_for.html'
  compile: (tElement, tAttrs) ->
    objectName = tAttrs.wFormFor

    angular.forEach tElement.find('input'), (rawInput) ->

      input = angular.element(rawInput)
      if fieldName = input.attr('w-field')
        input.attr('ng-model', objectName + '.' + fieldName)

    # link
    (scope, element, attrs) ->
]

