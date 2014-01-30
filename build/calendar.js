(function() {
  var shiftWeekDays;

  shiftWeekDays = function(weekDays, firstDayOfWeek) {
    var weekDaysHead;
    weekDaysHead = weekDays.slice(firstDayOfWeek, weekDays.length);
    return weekDaysHead.concat(weekDays.slice(0, firstDayOfWeek));
  };

  angular.module('angular-w').directive('wCalendar', function() {
    return {
      restrict: 'E',
      templateUrl: '/templates/calendar.html',
      replace: true,
      require: '?ngModel',
      scope: {
        firstDayOfWeek: '@firstDayOfWeek'
      },
      controller: [
        '$scope', '$locale', function($scope, $locale) {
          var addDays, currentTime, i, updateSelectionRanges;
          $scope.selectionMode = 'day';
          $scope.months = $locale.DATETIME_FORMATS.SHORTMONTH;
          $scope.firstDayOfWeek || ($scope.firstDayOfWeek = 0);
          currentTime = new Date();
          $scope.currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
          $scope.selectedYear = $scope.currentDate.getFullYear();
          $scope.selectedMonth = $scope.months[$scope.currentDate.getMonth()];
          $scope.weekDays = shiftWeekDays($locale.DATETIME_FORMATS.SHORTDAY, $scope.firstDayOfWeek);
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
            month = $scope.months.indexOf($scope.selectedMonth) - 1;
            if (month < 0) {
              month = $scope.months.length - 1;
              $scope.selectedYear--;
            }
            return $scope.selectedMonth = $scope.months[month];
          };
          $scope.nextMonth = function() {
            var month;
            month = $scope.months.indexOf($scope.selectedMonth) + 1;
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
            monthIndex = $scope.months.indexOf($scope.selectedMonth);
            firstDayOfMonth = new Date($scope.selectedYear, monthIndex);
            dayOffset = parseInt($scope.firstDayOfWeek) - firstDayOfMonth.getDay();
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
          return $scope.$watch('years', function() {
            return $scope.yearGroups = (function() {
              var _i, _results;
              _results = [];
              for (i = _i = 0; _i <= 3; i = ++_i) {
                _results.push($scope.years.slice(i * 4, i * 4 + 4));
              }
              return _results;
            })();
          });
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
        scope.selectDay = function(day) {
          scope.selectedDate = day;
          return ngModel.$setViewValue(day);
        };
        scope.selectMonth = function(monthName) {
          var monthIndex;
          scope.selectionMode = 'day';
          monthIndex = scope.months.indexOf(monthName);
          if (scope.selectedDate) {
            scope.selectedDate = new Date(scope.selectedYear, monthIndex, scope.selectedDate.getDate());
            return ngModel.$setViewValue(scope.selectedDate);
          } else {
            return scope.selectedMonth = monthName;
          }
        };
        return scope.selectYear = function(year) {
          scope.selectionMode = 'month';
          if (scope.selectedDate) {
            scope.selectedDate = new Date(year, scope.selectedDate.getMonth(), scope.selectedDate.getDate());
            return ngModel.$setViewValue(scope.selectedDate);
          } else {
            return scope.selectedYear = year;
          }
        };
      }
    };
  });

}).call(this);
