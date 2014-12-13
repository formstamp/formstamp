mod = require('./module')

VALIDATION_DIRECTIVES = [
  'ngRequired', 'ngMinlength',
  'ngMaxlength', 'ngPattern',
  'ngDisabled']

require('../templates/field.html')

mod.directive 'fsField', ->
  restrict: 'A'
  replace: true
  require: ['^fsFormFor', '^form']
  templateUrl: 'templates/fs/field.html'
  scope:
    items: '='
    field: '@fsField'
    type: '@'
    label: '@'
  compile: (tElement, tAttrs) ->
    type = tAttrs.type
    inputDivRaw = tElement[0].querySelector('.fs-field-input')
    inputDiv = angular.element(inputDivRaw)
    angular.element(inputDiv).attr(type, '')

    # Apply boolean directives with normalized names
    angular.forEach VALIDATION_DIRECTIVES, (dir) ->
      inputDiv.attr(tAttrs.$attr[dir], tAttrs[dir]) if tAttrs[dir]

    # We need this because ngModel don't interpolate
    # name attr when registering it in the form controller
    inputDiv.attr('name', tAttrs.fsField)

    (scope, element, attrs, ctrls) ->
      formForCtrl = ctrls[0]
      formCtrl = ctrls[1]

      scope.object = formForCtrl.getObject()
      scope.objectName = formForCtrl.getObjectName()

      # Error validations
      formCtrl = element.parent().controller('form')
      scope.defaultErrors =
        'required':  'This field is required!'
        'pattern':  'This field should match pattern!'
        'minlength': 'This field should be longer!'
        'maxlength': 'This field should be shorter!'

      scope.hasErrorFor = (validityName) ->
        formCtrl[scope.field].$error[validityName]

      scope.$watch ->
        return unless formCtrl.$dirty

        scope.validationErrors = []
        angular.forEach scope.defaultErrors, (value, key) ->
          if scope.hasErrorFor(key)
            scope.validationErrors.push(value)
        if scope.object.$error && (errs = scope.object.$error[scope.field])
          scope.validationErrors = scope.validationErrors.concat(errs)
        console.log scope.validationErrors
        return
