(function() {
  angular.module('angular-w').directive('wCalendar', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/calendar.html',
      replace: true,
      require: '?ngModel',
      scope: {},
      controller: [
        '$scope', '$locale', function($scope, $locale) {
          var currentTime, dateOffsetedBy, updateMonthDays;
          $scope.months = $locale.DATETIME_FORMATS.SHORTMONTH;
          $scope.weekDays = $locale.DATETIME_FORMATS.SHORTDAY;
          currentTime = new Date();
          $scope.currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
          $scope.selectedYear = $scope.currentDate.getFullYear();
          $scope.selectedMonth = $scope.currentDate.getMonth();
          $scope.prevMonth = function() {
            $scope.selectedMonth--;
            if ($scope.selectedMonth < 0) {
              $scope.selectedMonth = $scope.months.length - 1;
              return $scope.selectedYear--;
            }
          };
          $scope.nextMonth = function() {
            $scope.selectedMonth++;
            if ($scope.selectedMonth >= $scope.months.length) {
              $scope.selectedMonth = 0;
              return $scope.selectedYear++;
            }
          };
          $scope.isDayInSelectedMonth = function(day) {
            return day.getFullYear() === $scope.selectedYear && day.getMonth() === $scope.selectedMonth;
          };
          $scope.isCurrentDate = function(day) {
            var _ref;
            return day.getTime() === ((_ref = $scope.currentDate) != null ? _ref.getTime() : void 0);
          };
          $scope.isSelectedDate = function(day) {
            var _ref;
            return day.getTime() === ((_ref = $scope.selectedDate) != null ? _ref.getTime() : void 0);
          };
          dateOffsetedBy = function(date, offsetInDays) {
            return new Date(date.getFullYear(), date.getMonth(), date.getDate() + offsetInDays);
          };
          updateMonthDays = function() {
            var day, firstDayOfMonth, firstDayOfWeek, week;
            firstDayOfMonth = new Date($scope.selectedYear, $scope.selectedMonth);
            firstDayOfWeek = dateOffsetedBy(firstDayOfMonth, -firstDayOfMonth.getDay());
            return $scope.weeks = (function() {
              var _i, _results;
              _results = [];
              for (week = _i = 0; _i <= 5; week = ++_i) {
                _results.push((function() {
                  var _j, _results1;
                  _results1 = [];
                  for (day = _j = 0; _j <= 6; day = ++_j) {
                    _results1.push(dateOffsetedBy(firstDayOfWeek, 7 * week + day));
                  }
                  return _results1;
                })());
              }
              return _results;
            })();
          };
          $scope.$watch('selectedDate', function() {
            if ($scope.selectedDate != null) {
              $scope.selectedYear = $scope.selectedDate.getFullYear();
              return $scope.selectedMonth = $scope.selectedDate.getMonth();
            }
          });
          $scope.$watch('selectedMonth', updateMonthDays);
          return $scope.$watch('selectedYear', updateMonthDays);
        }
      ],
      link: function(scope, element, attrs, ngModel) {
        var parseDate;
        parseDate = function(dateString) {
          var parsedDate, time;
          time = Date.parse(dateString);
          if (!isNaN(time)) {
            parsedDate = new Date(time);
            return new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate());
          }
        };
        ngModel.$render = function() {
          scope.selectedDate = parseDate(ngModel.$modelValue);
          return console.log(scope.selectedDate);
        };
        return scope.selectDay = function(day) {
          scope.selectedDate = day;
          return ngModel.$setViewValue(day);
        };
      }
    };
  });

}).call(this);
