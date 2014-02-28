(function() {
  angular.module("formstamp").directive("fsDatetime", [
    '$compile', function($compile) {
      return {
        restrict: "A",
        scope: {
          disabled: '=ngDisabled',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        template: "<div class=\"fs-datetime fs-widget-root\">\n  <div fs-date ng-model=\"value\" ng-disabled=\"disabled\" fs-null-form></div>\n  <div fs-time ng-model=\"value\" ng-disabled=\"disabled\" fs-null-form with-date></div>\n  <button type=\"button\"\n          class=\"btn btn-default fs-datetime-clear-btn\"\n          ng-show='value'\n          ng-disabled=\"disabled\"\n          ng-click='clearDate()'>&times;</button>\n</div>",
        controller: function($scope) {
          return $scope.clearDate = function() {
            return $scope.value = null;
          };
        },
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
