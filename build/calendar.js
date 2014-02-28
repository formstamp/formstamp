(function() {
  var shiftWeekDays;

  shiftWeekDays = function(weekDays, firstDayOfWeek) {
    var weekDaysHead;
    weekDaysHead = weekDays.slice(firstDayOfWeek, weekDays.length);
    return weekDaysHead.concat(weekDays.slice(0, firstDayOfWeek));
  };

  angular.module('formstamp').directive('fsCalendar', [
    '$locale', function($locale) {
      return {
        restrict: 'E',
        templateUrl: '/templates/calendar.html',
        replace: true,
        require: '?ngModel',
        scope: {},
        controller: [
          '$scope', '$attrs', function($scope, $attrs) {
            var addDays, currentTime, i, updateSelectionRanges;
            $scope.selectionMode = 'day';
            $scope.months = $locale.DATETIME_FORMATS.SHORTMONTH;
            currentTime = new Date();
            $scope.currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
            $scope.selectedYear = $scope.currentDate.getFullYear();
            $scope.selectedMonth = $scope.months[$scope.currentDate.getMonth()];
            $scope.monthGroups = (function() {
              var _i, _results;
              _results = [];
              for (i = _i = 0; _i <= 2; i = ++_i) {
                _results.push($scope.months.slice(i * 4, i * 4 + 4));
              }
              return _results;
            })();
            $scope.prevMonth = function() {
              var month;
              month = indexOf($scope.months, $scope.selectedMonth) - 1;
              if (month < 0) {
                month = $scope.months.length - 1;
                $scope.selectedYear--;
              }
              return $scope.selectedMonth = $scope.months[month];
            };
            $scope.nextMonth = function() {
              var month;
              month = indexOf($scope.months, $scope.selectedMonth) + 1;
              if (month >= $scope.months.length) {
                month = 0;
                $scope.selectedYear++;
              }
              return $scope.selectedMonth = $scope.months[month];
            };
            $scope.prevYear = function() {
              return $scope.selectedYear--;
            };
            $scope.nextYear = function() {
              return $scope.selectedYear++;
            };
            $scope.prevYearRange = function() {
              var rangeSize, _i, _ref, _ref1, _results;
              rangeSize = $scope.years.length;
              return $scope.years = (function() {
                _results = [];
                for (var _i = _ref = $scope.years[0] - rangeSize, _ref1 = $scope.years[$scope.years.length - 1] - rangeSize; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
                return _results;
              }).apply(this);
            };
            $scope.nextYearRange = function() {
              var rangeSize, _i, _ref, _ref1, _results;
              rangeSize = $scope.years.length;
              return $scope.years = (function() {
                _results = [];
                for (var _i = _ref = $scope.years[0] + rangeSize, _ref1 = $scope.years[$scope.years.length - 1] + rangeSize; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
                return _results;
              }).apply(this);
            };
            $scope.switchSelectionMode = function() {
              return $scope.selectionMode = (function() {
                switch ($scope.selectionMode) {
                  case 'day':
                    return 'month';
                  case 'month':
                    return 'year';
                  default:
                    return 'day';
                }
              })();
            };
            $scope.isDayInSelectedMonth = function(day) {
              return day.getFullYear() === $scope.selectedYear && $scope.months[day.getMonth()] === $scope.selectedMonth;
            };
            $scope.isCurrentDate = function(day) {
              var _ref;
              return day.getTime() === ((_ref = $scope.currentDate) != null ? _ref.getTime() : void 0);
            };
            $scope.isSelectedDate = function(day) {
              var _ref;
              return day.getTime() === ((_ref = $scope.selectedDate) != null ? _ref.getTime() : void 0);
            };
            addDays = function(date, days) {
              return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
            };
            updateSelectionRanges = function() {
              var day, dayOffset, firstDayOfMonth, firstDayOfWeek, monthIndex, week, _i, _ref, _ref1, _results;
              monthIndex = indexOf($scope.months, $scope.selectedMonth);
              firstDayOfMonth = new Date($scope.selectedYear, monthIndex);
              dayOffset = $scope.firstDayOfWeek - firstDayOfMonth.getDay();
              if (dayOffset > 0) {
                dayOffset -= 7;
              }
              firstDayOfWeek = addDays(firstDayOfMonth, dayOffset);
              $scope.weeks = (function() {
                var _i, _results;
                _results = [];
                for (week = _i = 0; _i <= 5; week = ++_i) {
                  _results.push((function() {
                    var _j, _results1;
                    _results1 = [];
                    for (day = _j = 0; _j <= 6; day = ++_j) {
                      _results1.push(addDays(firstDayOfWeek, 7 * week + day));
                    }
                    return _results1;
                  })());
                }
                return _results;
              })();
              return $scope.years = (function() {
                _results = [];
                for (var _i = _ref = $scope.selectedYear - 5, _ref1 = $scope.selectedYear + 6; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; _ref <= _ref1 ? _i++ : _i--){ _results.push(_i); }
                return _results;
              }).apply(this);
            };
            $scope.$watch('selectedDate', function() {
              if ($scope.selectedDate != null) {
                $scope.selectedYear = $scope.selectedDate.getFullYear();
                return $scope.selectedMonth = $scope.months[$scope.selectedDate.getMonth()];
              }
            });
            $scope.$watch('selectedMonth', updateSelectionRanges);
            $scope.$watch('selectedYear', updateSelectionRanges);
            $scope.$watch('years', function() {
              return $scope.yearGroups = (function() {
                var _i, _results;
                _results = [];
                for (i = _i = 0; _i <= 3; i = ++_i) {
                  _results.push($scope.years.slice(i * 4, i * 4 + 4));
                }
                return _results;
              })();
            });
            $scope.firstDayOfWeek = parseInt($attrs.firstDayOfWeek || 0);
            return $scope.weekDays = shiftWeekDays($locale.DATETIME_FORMATS.SHORTDAY, $scope.firstDayOfWeek);
          }
        ],
        link: function(scope, element, attrs, ngModel) {
          scope.isSameYear = function() {
            var _ref;
            return ((_ref = parseDate(ngModel.$modelValue)) != null ? _ref.getFullYear() : void 0) === scope.selectedYear;
          };
          scope.selectDay = function(day) {
            return scope.selectedDate = day;
          };
          ngModel.$render = function() {
            return scope.selectedDate = parseDate(ngModel.$modelValue);
          };
          scope.$watch('selectedDate', function(newDate) {
            var oldDate, updatedDate;
            oldDate = ngModel.$modelValue;
            updatedDate = updateDate(newDate, oldDate);
            if ((newDate != null ? newDate.getTime() : void 0) !== (oldDate != null ? oldDate.getTime() : void 0)) {
              return ngModel.$setViewValue(newDate);
            }
          });
          scope.selectMonth = function(monthName) {
            scope.selectionMode = 'day';
            scope.selectedDate = void 0;
            return scope.selectedMonth = monthName;
          };
          return scope.selectYear = function(year) {
            scope.selectionMode = 'month';
            scope.selectedDate = void 0;
            return scope.selectedYear = year;
          };
        }
      };
    }
  ]);

}).call(this);
