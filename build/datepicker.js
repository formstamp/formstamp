(function() {
  angular.module('formstamp').directive('fsDatepicker', function() {
    return {
      restrict: 'EA',
      require: '?ngModel',
      scope: {
        "class": '@'
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
          return ngModel.$setViewValue(newDate);
        });
      }
    };
  });

}).call(this);
