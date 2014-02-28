(function() {
  angular.module('formstamp').directive('fsDate', function() {
    return {
      restrict: 'EA',
      require: '?ngModel',
      scope: {
        "class": '@',
        disabled: '=ngDisabled',
        placeholder: '@'
      },
      templateUrl: '/templates/date.html',
      replace: true,
      controller: function($scope, $filter) {
        return $scope.$watch('selectedDate.date', function(newDate) {
          $scope.active = false;
          return $scope.formattedDate = $filter('date')(newDate, 'shortDate');
        });
      },
      link: function($scope, element, attrs, ngModel) {
        var parseDate;
        parseDate = function(dateString) {
          var parsedDate, time;
          time = Date.parse(dateString);
          if (!isNaN(time)) {
            parsedDate = new Date(time);
            return new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
          }
        };
        $scope.selectedDate = {};
        ngModel.$render = function() {
          return $scope.selectedDate.date = ngModel.$modelValue;
        };
        return $scope.$watch('selectedDate.date', function(newDate) {
          var oldDate, updatedDate;
          oldDate = ngModel.$modelValue;
          updatedDate = updateDate(newDate, oldDate);
          if ((newDate != null ? newDate.getTime() : void 0) !== (oldDate != null ? oldDate.getTime() : void 0)) {
            return ngModel.$setViewValue(newDate);
          }
        });
      }
    };
  });

}).call(this);
