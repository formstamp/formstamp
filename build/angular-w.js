angular.module('angular-w', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/templates/calendar.html',
    "<div class=\"w-calendar\">\n" +
    "  <div class=\"w-calendar-header\">\n" +
    "    <a ng-click=\"prevMonth()\">&lt;- Left</a>\n" +
    "    <span ng-bind=\"months[selectedMonth] + ', ' + selectedYear\"></span>\n" +
    "    <a ng-click=\"nextMonth()\">Right -&gt;</a>\n" +
    "  </div>\n" +
    "  <div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <thead>\n" +
    "        <tr>\n" +
    "          <th ng-repeat=\"weekDay in weekDays\">\n" +
    "            {{weekDay}}\n" +
    "          </th>\n" +
    "        </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "        <tr ng-repeat=\"week in weeks\">\n" +
    "          <td ng-repeat=\"day in week\" class=\"day\"\n" +
    "              ng-class=\"{'day-in-selected-month': isDayInSelectedMonth(day),\n" +
    "                        'day-current': isCurrentDate(day),\n" +
    "                        'day-selected': isSelectedDate(day)}\"\n" +
    "              ng-click=\"selectDay(day)\">\n" +
    "            {{day.getDate()}}\n" +
    "          </td>\n" +
    "        </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/chz.html',
    "<div class='w-chz'>\n" +
    "  <input type='text' ng-model='selectedItem' style='display: none' ng-required='required' />\n" +
    "    <div ng-hide=\"active\" ng-class=\"{'btn-group': selectedItem}\">\n" +
    "      <a class=\"btn btn-default w-chz-active\"\n" +
    "         href=\"javascript:void(0)\"\n" +
    "         ng-click=\"active=true\"\n" +
    "         w-focus='focus'\n" +
    "         ng-disabled=\"disabled\"\n" +
    "         ng-blur='focus=false'>\n" +
    "          {{ (selectedItem || 'none') }}\n" +
    "      </a>\n" +
    "      <button type=\"button\"\n" +
    "              class=\"btn btn-default\"\n" +
    "              aria-hidden=\"true\"\n" +
    "              ng-show='selectedItem'\n" +
    "              ng-click='reset()'>&times;</button>\n" +
    "    </div>\n" +
    "  <div class=\"open\" ng-show=\"active\">\n" +
    "    <input ng-keydown=\"onkeys($event)\"\n" +
    "           w-focus=\"active\"\n" +
    "           class=\"form-control\"\n" +
    "           type=\"search\"\n" +
    "           ng-model=\"search\" />\n" +
    "    <ul class=\"dropdown-menu w-chz-items-list-default w-chz-items-list\"\n" +
    "        role=\"menu\">\n" +
    "       <li ng-repeat=\"item in shownItems\"\n" +
    "           ng-class=\"{true: 'active'}[item == activeItem]\">\n" +
    "         <a ng-click=\"selection(item)\"\n" +
    "            href=\"javascript:void(0)\"\n" +
    "            id='{{item[keyAttr]}}'\n" +
    "            tabindex='-1'>{{ item[valueAttr] }}</a>\n" +
    "       </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);

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

(function() {
  var comp, filter, focuz;

  comp = function(a, b) {
    return a.toLowerCase().indexOf(b.toLowerCase()) > -1;
  };

  filter = function(x, xs, valueAttr) {
    if (x) {
      return xs.filter((function(i) {
        return comp(i[valueAttr], x);
      }));
    } else {
      return xs;
    }
  };

  focuz = function(el) {
    return window.setTimeout((function() {
      return el.focus();
    }), 0);
  };

  angular.module("angular-w", []).directive("wFocus", function() {
    return {
      link: function(scope, element, attrs) {
        return scope.$watch(attrs.wFocus, function(fcs) {
          if (fcs) {
            return focuz(element[0]);
          }
        });
      }
    };
  });

  angular.module("angular-w").directive("wChz", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          items: '=',
          limit: '=',
          keyAttr: '@',
          valueAttr: '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/chz.html",
        controller: function($scope, $element, $attrs) {
          var getActiveIndex, getComputedStyle, move, scrollIfNeeded, search;
          getComputedStyle = function(elem, prop) {
            return parseInt($window.getComputedStyle(elem, null).getPropertyValue(prop));
          };
          move = function(d) {
            var activeIndex, items;
            items = $scope.shownItems;
            activeIndex = getActiveIndex() + d;
            activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
            $scope.activeItem = items[activeIndex];
            return scrollIfNeeded(activeIndex);
          };
          scrollIfNeeded = function(activeIndex) {
            var item, li, liHeight, ul, ulHeight, viewport;
            ul = $element.find('ul')[0];
            li = ul.querySelector('li.active');
            if (!(ul && li)) {
              return;
            }
            ulHeight = ul.clientHeight - getComputedStyle(ul, 'padding-top') - getComputedStyle(ul, 'padding-bottom');
            viewport = {
              top: ul.scrollTop,
              bottom: ul.scrollTop + ulHeight
            };
            li = ul.querySelector('li.active');
            liHeight = li.clientHeight - getComputedStyle(li, 'padding-top') - getComputedStyle(li, 'padding-bottom');
            item = {
              top: activeIndex * liHeight,
              bottom: (activeIndex + 1) * liHeight
            };
            if (item.bottom > viewport.bottom) {
              return ul.scrollTop += item.bottom - viewport.bottom;
            } else if (item.top < viewport.top) {
              return ul.scrollTop -= viewport.top - item.top;
            }
          };
          search = function(q) {
            if ($scope.prevSearch !== q) {
              $scope.shownItems = filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit);
              $scope.activeItem = $scope.shownItems[0];
            }
            return $scope.prevSearch = q;
          };
          $scope.selection = function(item) {
            $scope.selectedItem = item;
            return $scope.hideDropDown();
          };
          $scope.reset = function() {
            $scope.selectedItem = null;
            return $scope.focus = true;
          };
          $scope.onkeys = function(event) {
            switch (event.keyCode) {
              case 40:
                return move(1);
              case 38:
                return move(-1);
              case 13:
                $scope.selection($scope.activeItem);
                $scope.focus = true;
                return event.preventDefault();
              case 9:
                return $scope.selection($scope.activeItem);
              case 27:
                $scope.hideDropDown();
                return $scope.focus = true;
              case 34:
                return move(11);
              case 33:
                return move(-11);
            }
          };
          $scope.$watch('search', search);
          $scope.$watch('active', function(value) {
            if (value) {
              return window.setTimeout((function() {
                return scrollIfNeeded(getActiveIndex());
              }), 0);
            }
          });
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          getActiveIndex = function() {
            return $scope.shownItems.indexOf($scope.activeItem) || 0;
          };
          return search('');
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            if (ngModelCtrl) {
              scope.$watch('selectedItem', function() {
                ngModelCtrl.$setViewValue(scope.selectedItem);
                return scope.activeItem = scope.selectedItem;
              });
              ngModelCtrl.$render = function() {
                return scope.selectedItem = ngModelCtrl.$modelValue;
              };
            }
            attrs.$observe('disabled', function(value) {
              return scope.disabled = value;
            });
            attrs.$observe('required', function(value) {
              return scope.required = value;
            });
            scope.$watch('selectedItem', function() {
              var childScope;
              childScope = scope.$new();
              childScope.item = scope.selectedItem;
              return transcludeFn(childScope, function(clone) {
                var link;
                if (clone.text().trim() !== "") {
                  link = element[0].querySelector('a.w-chz-active');
                  return angular.element(link).empty().append(clone);
                }
              });
            });
            return $window.addEventListener('click', function(e) {
              var parent;
              parent = $(e.target).parents('div.w-chz')[0];
              if (parent !== element[0]) {
                return scope.$apply(scope.hideDropDown);
              }
            });
          };
        }
      };
    }
  ]);

}).call(this);
