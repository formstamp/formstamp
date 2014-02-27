(function() {
  angular.module('formstamp').directive('fsDatepicker', function() {
    return {
      restrict: 'EA',
      require: '?ngModel',
      scope: {
        "class": '@',
        disabled: '=ngDisabled'
      },
      templateUrl: '/templates/datepicker.html',
      replace: true,
      controller: function($scope, $filter) {
        return $scope.$watch('selectedDate.date', function(newDate) {
          $scope.active = false;
          return $scope.formattedDate = $filter('date')(newDate);
        });
      },
      link: function($scope, element, attrs, ngModel) {
        $scope.selectedDate = {};
        ngModel.$render = function() {
          return $scope.selectedDate.date = ngModel.$modelValue;
        };
        return $scope.$watch('selectedDate.date', function(newDate) {
          var oldDate;
          oldDate = ngModel.$modelValue;
          if ((oldDate != null) && (newDate != null)) {
            newDate.setHours(oldDate.getHours());
            newDate.setMinutes(oldDate.getMinutes());
          }
          return ngModel.$setViewValue(newDate);
        });
      }
    };
  });

}).call(this);
