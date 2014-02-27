(function() {
  angular.module("formstamp").directive("fsDatetimepicker", [
    '$compile', function($compile) {
      return {
        restrict: "A",
        scope: {
          disabled: '=ngDisabled',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        template: "<div class=\"fs-datetimepicker fs-widget-root\" fs-null-form>\n  <div fs-datepicker ng-model=\"value\" ng-disabled=\"disabled\"></div>\n  <div fs-time ng-model=\"value\" ng-disabled=\"disabled\"></div>\n</div>",
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          if (ngModelCtrl) {
            scope.$watch('value', function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return ngModelCtrl.$setViewValue(newValue);
              }
            });
            return ngModelCtrl.$render = function() {
              return scope.value = ngModelCtrl.$viewValue;
            };
          }
        }
      };
    }
  ]);

}).call(this);
