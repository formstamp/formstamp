(function() {
  angular.module('formstamp').directive('fsField', [
    function() {
      var VALIDATION_DIRECTIVES;
      VALIDATION_DIRECTIVES = ['ngRequired', 'ngMinlength', 'ngMaxlength', 'ngPattern', 'ngDisabled'];
      return {
        restrict: 'A',
        replace: true,
        require: ['^fsFormFor', '^form'],
        scope: {
          items: '=',
          field: '@fsField',
          type: '@',
          label: '@'
        },
        templateUrl: '/templates/field.html',
        compile: function(tElement, tAttrs) {
          var inputDiv, inputDivRaw, type;
          type = tAttrs.type;
          inputDivRaw = tElement[0].querySelector('.fs-field-input');
          inputDiv = angular.element(inputDivRaw);
          angular.element(inputDiv).attr(type, '');
          angular.forEach(VALIDATION_DIRECTIVES, function(dir) {
            if (tAttrs[dir]) {
              return inputDiv.attr(tAttrs.$attr[dir], tAttrs[dir]);
            }
          });
          inputDiv.attr('name', tAttrs.fsField);
          return function(scope, element, attrs, ctrls) {
            var formCtrl, formForCtrl;
            formForCtrl = ctrls[0];
            formCtrl = ctrls[1];
            scope.object = formForCtrl.getObject();
            scope.objectName = formForCtrl.getObjectName();
            formCtrl = element.parent().controller('form');
            scope.defaultErrors = {
              'required': 'This field is required!',
              'pattern': 'This field should match pattern!',
              'minlength': 'This field should be longer!',
              'maxlength': 'This field should be shorter!'
            };
            scope.hasErrorFor = function(validityName) {
              return formCtrl[scope.field].$error[validityName];
            };
            return scope.$watch(function() {
              var errs;
              if (!formCtrl.$dirty) {
                return;
              }
              scope.validationErrors = [];
              angular.forEach(scope.defaultErrors, function(value, key) {
                if (scope.hasErrorFor(key)) {
                  return scope.validationErrors.push(value);
                }
              });
              if (scope.object.$error && (errs = scope.object.$error[scope.field])) {
                scope.validationErrors = scope.validationErrors.concat(errs);
              }
              console.log(scope.validationErrors);
            });
          };
        }
      };
    }
  ]);

}).call(this);
