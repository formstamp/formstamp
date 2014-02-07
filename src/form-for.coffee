angular
.module('angular-w').directive 'wFormFor', [ ->
  restrict: 'A'
  scope: true
  compile: (tElement, tAttrs) ->
    objectName = tAttrs.wFormFor

    tAttrs.name ||= "#{objectName}Form"

    required = {}

    angular.forEach tElement.find('input'), (rawInput) ->
      input = angular.element(rawInput)
      if fieldName = input.attr('w-field')
        input.attr('ng-model', objectName + '.' + fieldName)


    # link
    (scope, element, attrs) ->

]

