(function() {
  angular.module('formstamp').directive('fsDatepicker', [
    'fsPopupManager', function(popupManager) {
      return {
        restrict: 'EA',
        require: '?ngModel',
        scope: {},
        templateUrl: '/templates/datepicker.html',
        replace: true,
        link: function(scope, element, attrs, ngModel) {
          scope.popup = popupManager;
          ngModel.$render = function() {
            return scope.date = ngModel.$modelValue;
          };
          return scope.dateSelection = function() {
            return ngModel.$setViewValue(scope.date);
          };
        }
      };
    }
  ]);

}).call(this);
