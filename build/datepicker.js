(function() {
  angular.module('formstamp').directive('fsDatepicker', function($filter) {
    return {
      restrict: 'EA',
      require: '?ngModel',
      scope: {
        "class": '@',
        disabled: '=ngDisabled'
      },
      templateUrl: '/templates/datepicker.html',
      replace: true,
      link: function($scope, element, attrs, ngModel) {
        $scope.selectedDate = {};
        ngModel.$render = function() {
          return $scope.selectedDate.date = ngModel.$modelValue;
        };
        return $scope.$watch('selectedDate.date', function(newDate, oldDate) {
          console.log('selectedDate.date', newDate, oldDate, newDate === oldDate);
          if ((oldDate != null) && (newDate != null) && oldDate.getTime() !== newDate.getTime()) {
            newDate.setHours(oldDate.getHours());
            newDate.setMinutes(oldDate.getMinutes());
          }
          ngModel.$setViewValue(newDate);
          $scope.formattedDate = $filter('date')(newDate);
          return $scope.active = false;
        });
      }
    };
  });

}).call(this);
