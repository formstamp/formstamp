var addValidations, comp, filter, getComputedStyleFor, indexOf, innerHeightOf, scrollToTarget;

comp = function(a, b) {
  return ("" + a).toLowerCase().indexOf(b.toString().toLowerCase()) > -1;
};

filter = function(x, xs, valueAttr) {
  if (x) {
    return xs.filter(function(i) {
      var item;
      item = valueAttr ? i[valueAttr] : i;
      return comp(item, x);
    });
  } else {
    return xs;
  }
};

indexOf = function(array, elem) {
  var index, _i, _ref;
  for (index = _i = 0, _ref = array.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; index = 0 <= _ref ? ++_i : --_i) {
    if (angular.equals(array[index], elem)) {
      return index;
    }
  }
  return -1;
};

getComputedStyleFor = function(elem, prop) {
  return parseInt(window.getComputedStyle(elem, null).getPropertyValue(prop));
};

innerHeightOf = function(elem) {
  return elem.clientHeight - getComputedStyleFor(elem, 'padding-top') - getComputedStyleFor(elem, 'padding-bottom');
};

scrollToTarget = function(container, target) {
  var item, viewport;
  if (!(container && target)) {
    return;
  }
  viewport = {
    top: container.scrollTop,
    bottom: container.scrollTop + innerHeightOf(container)
  };
  item = {
    top: target.offsetTop,
    bottom: target.offsetTop + target.offsetHeight
  };
  if (item.bottom > viewport.bottom) {
    return container.scrollTop += item.bottom - viewport.bottom;
  } else if (item.top < viewport.top) {
    return container.scrollTop -= viewport.top - item.top;
  }
};

addValidations = function(attrs, ctrl) {
  var match, maxLengthValidator, maxlength, minLengthValidator, minlength, pattern, patternValidator, validate, validateRegex;
  validate = function(ctrl, validatorName, validity, value) {
    ctrl.$setValidity(validatorName, validity);
    if (validity) {
      return value;
    } else {
      return void 0;
    }
  };
  if (attrs.ngMinlength) {
    minlength = parseInt(attrs.ngMinlength);
    minLengthValidator = function(value) {
      return validate(ctrl, 'minlength', ctrl.$isEmpty(value) || value.length >= minlength, value);
    };
    ctrl.$formatters.push(minLengthValidator);
    ctrl.$parsers.push(minLengthValidator);
  }
  if (attrs.ngMaxlength) {
    maxlength = parseInt(attrs.ngMaxlength);
    maxLengthValidator = function(value) {
      return validate(ctrl, 'maxlength', ctrl.$isEmpty(value) || value.length <= maxlength, value);
    };
    ctrl.$formatters.push(maxLengthValidator);
    ctrl.$parsers.push(maxLengthValidator);
  }
  if (attrs.ngPattern) {
    pattern = attrs.ngPattern;
    validateRegex = function(regexp, value) {
      return validate(ctrl, 'pattern', ctrl.$isEmpty(value) || regexp.test(value), value);
    };
    match = pattern.match(/^\/(.*)\/([gim]*)$/);
    if (match) {
      pattern = new RegExp(match[1], match[2]);
      patternValidator = function(value) {
        return validateRegex(pattern, value);
      };
    } else {
      patternValidator = function(value) {
        var patternObj;
        patternObj = scope.$eval(pattern);
        if (!patternObj || !patternObj.test) {
          throw minErr('ngPattern')('noregexp', 'Expected {0} to be a RegExp but was {1}. Element: {2}', pattern, patternObj, startingTag(element));
        }
        return validateRegex(patternObj, value);
      };
    }
    ctrl.$formatters.push(patternValidator);
    return ctrl.$parsers.push(patternValidator);
  }
};

angular.module('angular-w', []).run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/templates/calendar.html',
    "<div class=\"w-calendar\" data-ng-switch=\"selectionMode\">\n" +
    "  <div data-ng-switch-when=\"year\">\n" +
    "    <div class=\"w-calendar-header\">\n" +
    "      <span class=\"w-calendar-prev\" data-ng-click=\"prevYearRange()\"></span>\n" +
    "      <span class=\"w-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{years[0]}}-{{years[years.length-1]}}\n" +
    "      </span>\n" +
    "      <span class=\"w-calendar-next\" data-ng-click=\"nextYearRange()\"></span>\n" +
    "    </div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <tr data-ng-repeat=\"yearGroup in yearGroups\">\n" +
    "        <td data-ng-repeat=\"year in yearGroup\"\n" +
    "            data-ng-click=\"selectYear(year)\"\n" +
    "            data-ng-class=\"{'active': year == selectedYear}\"\n" +
    "            class=\"year\">\n" +
    "          {{year}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div data-ng-switch-when=\"month\">\n" +
    "    <div class=\"w-calendar-header\">\n" +
    "      <span class=\"w-calendar-prev\" data-ng-click=\"prevYear()\"></span>\n" +
    "      <span class=\"w-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{selectedYear}}\n" +
    "      </span>\n" +
    "      <span class=\"w-calendar-next\" data-ng-click=\"nextYear()\"></span>\n" +
    "    </div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <tr data-ng-repeat=\"monthGroup in monthGroups\">\n" +
    "        <td data-ng-repeat=\"month in monthGroup\"\n" +
    "            data-ng-click=\"selectMonth(month)\"\n" +
    "            data-ng-class=\"{'active': month == selectedMonth && isSameYear()}\"\n" +
    "            class=\"month\">\n" +
    "          {{month}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div data-ng-switch-default>\n" +
    "    <div class=\"w-calendar-header\">\n" +
    "      <span class=\"w-calendar-prev\" data-ng-click=\"prevMonth()\"></span>\n" +
    "      <span class=\"w-calendar-title\" data-ng-click=\"switchSelectionMode()\">\n" +
    "        {{selectedMonth + ', ' + selectedYear}}\n" +
    "      </span>\n" +
    "      <span class=\"w-calendar-next\" data-ng-click=\"nextMonth()\"></span>\n" +
    "    </div>\n" +
    "    <table class=\"table-condensed\">\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th data-ng-repeat=\"weekDay in weekDays\">\n" +
    "          {{weekDay}}\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr data-ng-repeat=\"week in weeks\">\n" +
    "        <td data-ng-repeat=\"day in week\" class=\"day\"\n" +
    "            data-ng-class=\"{'day-in-selected-month': isDayInSelectedMonth(day),\n" +
    "                       'day-current': isCurrentDate(day),\n" +
    "                       'active': isSelectedDate(day)}\"\n" +
    "            data-ng-click=\"selectDay(day)\">\n" +
    "          {{day.getDate()}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/checkbox.html',
    "<div class='w-racheck'>\n" +
    "  <div ng-repeat='item in shownItems track by item.id'>\n" +
    "    <a class=\"w-racheck-item\"\n" +
    "       ng-click=\"toggle(item)\"\n" +
    "       href='javascript:void(0)'\n" +
    "       w-space='toggleOnSpace($event, item)'>\n" +
    "      <span class=\"w-check-outer\"><span ng-show=\"isSelected(item)\" class=\"w-check-inner\"></span></span>\n" +
    "      {{item[valueAttr]}}\n" +
    "    </a>\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/chz.html',
    "<div class='w-chz w-wiget-root'>\n" +
    "  <div ng-hide=\"active\" class=\"w-chz-sel\" ng-class=\"{'btn-group': selectedItem}\">\n" +
    "      <a class=\"btn btn-default w-chz-active\"\n" +
    "         ng-class='{\"btn-danger\": invalid}'\n" +
    "         href=\"javascript:void(0)\"\n" +
    "         ng-click=\"active=true\"\n" +
    "         ng-disabled=\"disabled\" >\n" +
    "         <span ng-show='selectedItem'>{{ getItemLabel(selectedItem) }}</span>\n" +
    "         <span ng-hide='selectedItem'>none</span>\n" +
    "      </a>\n" +
    "      <button type=\"button\"\n" +
    "              class=\"btn btn-default w-chz-clear-btn\"\n" +
    "              aria-hidden=\"true\"\n" +
    "              ng-show='selectedItem'\n" +
    "              ng-click='unselectItem()'>&times;</button>\n" +
    "    </div>\n" +
    "  <div class=\"open\" ng-show=\"active\">\n" +
    "    <input class=\"form-control\"\n" +
    "           w-focus=\"active\"\n" +
    "           w-down='move(1)'\n" +
    "           w-up='move(-1)'\n" +
    "           w-pgup='move(-11)'\n" +
    "           w-pgdown='move(11)'\n" +
    "           w-enter='onEnter($event)'\n" +
    "           type=\"search\"\n" +
    "           placeholder='Search'\n" +
    "           ng-model=\"search\" />\n" +
    "    <div ng-if=\"active && dropdownItems.length > 0\">\n" +
    "      <div w-list items=\"dropdownItems\" on-highlight=\"highlight\">\n" +
    "        <span class=\"item-expressin\"></span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <!-- FIXME: why errors here -->\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/datepicker.html',
    "<div class=\"w-datepicker\">\n" +
    "  <input type=\"text\"\n" +
    "    class=\"form-control\"\n" +
    "    ng-focus=\"active=true\"\n" +
    "    data-ng-model=\"date\"\n" +
    "    ng-change=\"dateSelection()\"\n" +
    "    data-date-format=\"shortDate\">\n" +
    "  <div ng-if=\"active\" class=\"open\">\n" +
    "    <div class=\"dropdown-menu\">\n" +
    "      <w-calendar ng-model=\"date\"\n" +
    "        ng-change=\"console.log('here');active=false;\"/>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/field.html',
    "<div class='form-group'\n" +
    "  ng-class='{\"has-error\": validationErrors.length > 0}'>\n" +
    "  <label for='{{field}}' class='col-sm-2 control-label'>{{label}}</label>\n" +
    "  <div class='col-sm-10'>\n" +
    "    <div class='w-field-input'\n" +
    "         items='items'\n" +
    "         invalid='validationErrors.length > 0'\n" +
    "         ng-model='object[field]'></div>\n" +
    "    <div>\n" +
    "    <p class='text-danger' ng-repeat='message in validationErrors'>\n" +
    "      <span>{{message}}</span>\n" +
    "    </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/templates/list.html',
    "<div class=\"dropdown open no-popup\">\n" +
    "  <ul class=\"dropdown-menu w-multi-select-items-list-default w-multi-select-items-list\"\n" +
    "      role=\"menu\" >\n" +
    "    <li ng-repeat=\"item in items\"\n" +
    "        ng-class=\"{true: 'active'}[$index == highlightIndex]\">\n" +
    "      <a ng-click=\"highlightItem(item)\"\n" +
    "         href=\"javascript:void(0)\"\n" +
    "         tabindex='-1'>\n" +
    "         <span ng-transclude></span>\n" +
    "       </a>\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/multi-select.html',
    "<div class='w-multi-select w-widget-root'>\n" +
    "  <div class=\"w-multi-options\" ng-if=\"selectedItems.length > 0\">\n" +
    "    <a ng-repeat='selectedItem in selectedItems' class=\"btn\" ng-click=\"unselectItem(selectedItem)\">\n" +
    "      {{ getItemLabel(selectedItem) }}\n" +
    "      <span class=\"glyphicon glyphicon-remove\" ></span>\n" +
    "    </a>\n" +
    "  </div>\n" +
    "\n" +
    "  <!-- FIXME: why not use existing control -->\n" +
    "  <input ng-keydown=\"onkeys($event)\"\n" +
    "         w-hold-focus=\"active = true\"\n" +
    "         w-hold-focus-blur=\"active=false\"\n" +
    "         w-down='move(1)'\n" +
    "         w-up='move(-1)'\n" +
    "         w-pgup='onPgup($event)'\n" +
    "         w-pgdown='onPgdown($event)'\n" +
    "         w-enter='onEnter($event)'\n" +
    "         class=\"form-control\"\n" +
    "         type=\"text\"\n" +
    "         placeholder='Search'\n" +
    "         ng-model=\"search\" />\n" +
    "\n" +
    "  <div ng-if=\"active && (filteredItems = dropdownItems()).length > 0\" class=\"open\">\n" +
    "    <ul class=\"dropdown-menu w-multi-select-items-list-default w-multi-select-items-list\"\n" +
    "        role=\"menu\" >\n" +
    "      <li ng-repeat=\"item in filteredItems\"\n" +
    "          ng-class=\"{true: 'active'}[$index == highlightIndex]\">\n" +
    "        <a ng-click=\"selectItem(item)\"\n" +
    "           href=\"javascript:void(0)\"\n" +
    "           tabindex='-1'>{{ getItemLabel(item) }}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/radio.html',
    "<div class='w-racheck'>\n" +
    "  <div ng-repeat='item in shownItems'>\n" +
    "  <a class=\"w-racheck-item\"\n" +
    "     ng-click=\"selection(item)\"\n" +
    "     href='javascript:void(0)'\n" +
    "     tabindex='{{ $first ? 0 : -1 }}'\n" +
    "     w-down='move($event, +1)'\n" +
    "     w-up='move($event, -1)'>\n" +
    "    <span class=\"w-radio-outer\"><span ng-show=\"isSelected(item)\" class=\"w-radio-inner\"></span></span>\n" +
    "    {{item[valueAttr]}}\n" +
    "  </a>\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/submit_field.html',
    "<div class=\"form-group\">\n" +
    "  <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "    <button type=\"submit\" class=\"btn btn-default\" ng-transclude></button>\n" +
    "  </div>\n" +
    "</div>\n"
  );

}]);

(function() {
  var shiftWeekDays;

  shiftWeekDays = function(weekDays, firstDayOfWeek) {
    var weekDaysHead;
    weekDaysHead = weekDays.slice(firstDayOfWeek, weekDays.length);
    return weekDaysHead.concat(weekDays.slice(0, firstDayOfWeek));
  };

  angular.module('angular-w').directive('wCalendar', [
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
            return scope.selectedDate = parseDate(ngModel.$modelValue);
          };
          scope.isSameYear = function() {
            var _ref;
            return ((_ref = parseDate(ngModel.$modelValue)) != null ? _ref.getFullYear() : void 0) === scope.selectedYear;
          };
          scope.selectDay = function(day) {
            scope.selectedDate = day;
            return ngModel.$setViewValue(day);
          };
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

(function() {
  angular.module("angular-w").directive("wCheckbox", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          errors: '=',
          items: '=',
          limit: '=',
          inline: '=',
          keyAttr: '@',
          valueAttr: '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/checkbox.html",
        controller: function($scope, $element, $attrs) {
          $scope.toggle = function(item) {
            if (!$scope.isSelected(item)) {
              return $scope.selectedItems.push(item);
            } else {
              return $scope.selectedItems.splice(indexOf($scope.selectedItems, item), 1);
            }
          };
          $scope.toggleOnSpace = function(event, item) {
            $scope.toggle(item);
            return event.preventDefault();
          };
          $scope.hasItem = function(item) {
            return indexOf($scope.selectedItems, item) > -1;
          };
          $scope.isSelected = function(item) {
            return indexOf($scope.selectedItems, item) > -1;
          };
          $scope.invalid = function() {
            return ($scope.errors != null) && $scope.errors.length > 0;
          };
          $scope.selectedItems = [];
          return $scope.shownItems = $scope.items;
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            var setViewValue;
            if (ngModelCtrl) {
              setViewValue = function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                  return ngModelCtrl.$setViewValue(scope.selectedItems);
                }
              };
              scope.$watch('selectedItems', setViewValue, true);
              ngModelCtrl.$render = function() {
                if (!scope.disabled) {
                  return scope.selectedItems = ngModelCtrl.$viewValue || [];
                }
              };
            }
            attrs.$observe('disabled', function(value) {
              return scope.disabled = value;
            });
            return attrs.$observe('required', function(value) {
              return scope.required = value;
            });
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("angular-w").directive("wChz", [
    '$compile', function($compile) {
      return {
        restrict: "A",
        scope: {
          invalid: '=',
          items: '=',
          limit: '=',
          keyAttr: '@',
          disabled: '@',
          freetext: '@',
          valueAttr: '@',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        template: function(el) {
          var itemTpl, template;
          itemTpl = el.html();
          return template = "<div class='w-chz w-wiget-root'>\n  <div ng-hide=\"active\" class=\"w-chz-sel\" ng-class=\"{'btn-group': item}\">\n      <a class=\"btn btn-default w-chz-active\"\n         ng-class='{\"btn-danger\": invalid}'\n         href=\"javascript:void(0)\"\n         ng-click=\"active=true\"\n         ng-disabled=\"disabled\" >\n         <span ng-show='item'>" + itemTpl + "</span>\n         <span ng-hide='item'>none</span>\n      </a>\n      <button type=\"button\"\n              class=\"btn btn-default w-chz-clear-btn\"\n              aria-hidden=\"true\"\n              ng-show='item'\n              ng-click='unselectItem()'>&times;</button>\n    </div>\n  <div class=\"open\" ng-show=\"active\">\n    <input class=\"form-control\"\n           w-focus=\"active\"\n           w-down='move(1)'\n           w-up='move(-1)'\n           w-pgup='move(-11)'\n           w-pgdown='move(11)'\n           w-enter='onEnter($event)'\n           type=\"search\"\n           placeholder='Search'\n           ng-model=\"search\" />\n    <div ng-if=\"active && dropdownItems.length > 0\">\n      <div w-list items=\"dropdownItems\" on-highlight=\"highlight\">\n       " + itemTpl + "\n      </div>\n    </div>\n  </div>\n  <!-- FIXME: why errors here -->\n  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n</div>";
        },
        controller: function($scope, $element, $attrs, $filter) {
          var keyAttr, valueAttr;
          $scope.active = false;
          if ($scope.freetext) {
            $scope.getItemLabel = function(item) {
              return item;
            };
            $scope.getItemValue = function(item) {
              return item;
            };
            $scope.dynamicItems = function() {
              if ($scope.search) {
                return [$scope.search];
              } else {
                return [];
              }
            };
          } else {
            valueAttr = function() {
              return $scope.valueAttr || "label";
            };
            keyAttr = function() {
              return $scope.valueAttr || "id";
            };
            $scope.getItemLabel = function(item) {
              return item && item[valueAttr()];
            };
            $scope.getItemValue = function(item) {
              return item && item[keyAttr()];
            };
            $scope.dynamicItems = function() {
              return [];
            };
          }
          $scope.$watch('search', function(q) {
            return $scope.dropdownItems = $filter('filter')($scope.items, $scope.search).concat($scope.dynamicItems());
          });
          $scope.selectItem = function(item) {
            $scope.item = item;
            $scope.search = "";
            return $scope.active = false;
          };
          $scope.unselectItem = function(item) {
            return $scope.item = null;
          };
          $scope.move = function(d) {
            return $scope._list.move && $scope._list.move(d);
          };
          $scope.onEnter = function(event) {
            return $scope._list.item && $scope.selectItem($scope._list.item);
          };
          return $scope._list = {
            onselection: $scope.onEnter
          };
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          if (ngModelCtrl) {
            scope.$watch('item', function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return ngModelCtrl.$setViewValue(scope.item);
              }
            });
            return ngModelCtrl.$render = function() {
              return scope.item = ngModelCtrl.$viewValue;
            };
          }
        }
      };
    }
  ]);

  angular.module("angular-w").directive("wList", function() {
    return {
      restrict: "A",
      scope: {
        items: '=',
        move: '@',
        labelAttr: '@'
      },
      transclude: true,
      replace: true,
      templateUrl: "/templates/list.html",
      controller: function($scope, $element, $attrs, $filter) {
        $scope.highlightItem = function(item) {
          $scope.highlightIndex = $scope.items.indexOf(item);
          $scope.$parent._list.item = item;
          return $scope.$parent._list.onselection();
        };
        $scope.$watch('items', function(idx) {
          return $scope.highlightIndex = 0;
        });
        $scope.$watch('highlightIndex', function(idx) {
          if (!$scope.$parent._list) {
            return;
          }
          return $scope.$parent._list.item = $scope.items[idx];
        });
        $scope.domove = function(d) {
          var filteredItems;
          filteredItems = $scope.items;
          $scope.highlightIndex += d;
          if ($scope.highlightIndex === -1) {
            $scope.highlightIndex = filteredItems.length - 1;
          }
          if ($scope.highlightIndex >= filteredItems.length) {
            return $scope.highlightIndex = 0;
          }
        };
        $scope.highlightIndex = 0;
        if ($scope.$parent._list) {
          return $scope.$parent._list.move = function(d) {
            return $scope.domove(d);
          };
        }
      }
    };
  });

}).call(this);

(function() {
  angular.module('angular-w').directive('dateFormat', [
    'dateFilter', function(dateFilter) {
      return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
          ngModel.$formatters.push(function(value) {
            var date, milis;
            date = angular.isString(value) ? (milis = Date.parse(value), !isNaN(milis) ? new Date(milis) : void 0) : value;
            return dateFilter(date, attrs.dateFormat);
          });
          return ngModel.$parsers.push(function(value) {
            return new Date(value);
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('angular-w').directive('wDatepicker', [
    'wPopupManager', function(popupManager) {
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

(function() {
  angular.module('angular-w').directive('wField', [
    function() {
      var VALIDATION_DIRECTIVES;
      VALIDATION_DIRECTIVES = ['ngRequired', 'ngMinlength', 'ngMaxlength', 'ngPattern', 'ngDisabled'];
      return {
        restrict: 'A',
        replace: true,
        require: ['^wFormFor', '^form'],
        scope: {
          items: '=',
          field: '@wField',
          type: '@',
          label: '@'
        },
        templateUrl: '/templates/field.html',
        compile: function(tElement, tAttrs) {
          var inputDiv, inputDivRaw, type;
          type = tAttrs.type;
          inputDivRaw = tElement[0].querySelector('.w-field-input');
          inputDiv = angular.element(inputDivRaw);
          angular.element(inputDiv).attr(type, '');
          angular.forEach(VALIDATION_DIRECTIVES, function(dir) {
            if (tAttrs[dir]) {
              return inputDiv.attr(tAttrs.$attr[dir], tAttrs[dir]);
            }
          });
          inputDiv.attr('name', tAttrs.wField);
          return function(scope, element, attrs, ctrls) {
            var formCtrl, formForCtrl;
            formForCtrl = ctrls[0];
            formCtrl = ctrls[1];
            scope.object = formForCtrl.getObject();
            scope.objectName = formForCtrl.getObjectName();
            formCtrl = element.parent().controller('form');
            scope.defaultErrors = {
              'required': 'This field is required!',
              'pattern': 'This field should match pattern!',
              'minlength': 'This field should be longer!',
              'maxlength': 'This field should be shorter!'
            };
            scope.hasErrorFor = function(validityName) {
              return formCtrl[scope.field].$error[validityName];
            };
            return scope.$watch(function() {
              var errs;
              if (!formCtrl.$dirty) {
                return;
              }
              scope.validationErrors = [];
              angular.forEach(scope.defaultErrors, function(value, key) {
                if (scope.hasErrorFor(key)) {
                  return scope.validationErrors.push(value);
                }
              });
              if (scope.object.$error && (errs = scope.object.$error[scope.field])) {
                scope.validationErrors = scope.validationErrors.concat(errs);
              }
              console.log(scope.validationErrors);
            });
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("angular-w").directive("wFocus", function() {
    var focuz;
    focuz = function(el) {
      return window.setTimeout((function() {
        return el.focus();
      }), 0);
    };
    return {
      link: function(scope, element, attrs) {
        return scope.$watch(attrs.wFocus, function(fcs) {
          if (fcs != null) {
            return focuz(element[0]);
          }
        });
      }
    };
  });

}).call(this);

(function() {
  angular.module('angular-w').directive('wFormFor', [
    '$window', function($window) {
      return {
        restrict: 'A',
        require: '?form',
        scope: {
          object: '=wFormFor'
        },
        compile: function(tElement, tAttrs) {
          tElement.attr('class', 'form-horizontal');
          tElement.attr('role', 'form');
          return function(scope, element, attrs, formController) {
            return $window.addEventListener('beforeunload', function() {
              if (formController.$dirty) {
                return 'You will lose unsaved changes unless you stay on this page';
              }
            });
          };
        },
        controller: function($scope, $element, $attrs) {
          this.getObject = function() {
            return $scope.object;
          };
          this.getObjectName = function() {
            return $attrs.wFormFor;
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("angular-w").directive("wHoldFocus", function($timeout) {
    var widgetRoot;
    widgetRoot = function(el) {
      var currentEl;
      currentEl = el;
      while (currentEl && currentEl.className.indexOf("w-widget-root") < 0) {
        currentEl = currentEl.parentNode;
      }
      return currentEl;
    };
    return {
      link: function(scope, element, attrs) {
        element.on('focus', function(event) {
          return scope.$apply(attrs["wHoldFocus"]);
        });
        return element.on('blur', function(event) {
          var newWidgetRoot, oldWidgetRoot;
          oldWidgetRoot = widgetRoot(event.srcElement || event.target);
          newWidgetRoot = widgetRoot(event.relatedTarget);
          if (event.relatedTarget && newWidgetRoot !== null && oldWidgetRoot === newWidgetRoot) {
            return setTimeout((function() {
              return element[0].focus();
            }), 0);
          } else {
            return scope.$apply(attrs["wHoldFocusBlur"]);
          }
        });
      }
    };
  });

}).call(this);

(function() {
  var difference, hash_key;

  hash_key = function(item) {
    return angular.toJson(item);
  };

  difference = function(a, b) {
    var b_element, hash, _i, _len;
    if (!(b && a)) {
      return a;
    }
    hash = {};
    for (_i = 0, _len = b.length; _i < _len; _i++) {
      b_element = b[_i];
      hash[hash_key(b_element)] = true;
    }
    return a.filter((function(a_element) {
      return !hash[hash_key(a_element)];
    }));
  };

  angular.module('angular-w').filter('exclude', function() {
    return function(input, selected) {
      return input.filter(function(item) {
        return selected.indexOf(item) < 0;
      });
    };
  });

  angular.module("angular-w").directive("wMultiSelect", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          invalid: '=',
          items: '=',
          keyAttr: '@',
          valueAttr: '@',
          disabled: '@',
          freetext: '@',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/multi-select.html",
        controller: function($scope, $element, $attrs, $filter) {
          var keyAttr, valueAttr;
          if ($scope.freetext) {
            $scope.getItemLabel = function(item) {
              return item;
            };
            $scope.getItemValue = function(item) {
              return item;
            };
            $scope.dynamicItems = function() {
              if ($scope.search) {
                return [$scope.search];
              } else {
                return [];
              }
            };
          } else {
            valueAttr = function() {
              return $scope.valueAttr || "label";
            };
            keyAttr = function() {
              return $scope.valueAttr || "id";
            };
            $scope.getItemLabel = function(item) {
              return item && item[valueAttr()];
            };
            $scope.getItemValue = function(item) {
              return item && item[keyAttr()];
            };
            $scope.dynamicItems = function() {
              return [];
            };
          }
          $scope.dropdownItems = function() {
            var allItems, excludeFilter, searchFilter;
            searchFilter = $filter('filter');
            excludeFilter = $filter('exclude');
            allItems = $scope.items.concat($scope.dynamicItems());
            return searchFilter(excludeFilter(allItems, $scope.selectedItems), $scope.search);
          };
          $scope.selectItem = function(item) {
            if ((item != null) && indexOf($scope.selectedItems, item) === -1) {
              $scope.selectedItems.push(item);
            }
            $scope.search = "";
            return $scope.highlightIndex = 0;
          };
          $scope.unselectItem = function(item) {
            var index;
            index = indexOf($scope.selectedItems, item);
            if (index > -1) {
              return $scope.selectedItems.splice(index, 1);
            }
          };
          $scope.move = function(d) {
            var filteredItems;
            filteredItems = $scope.dropdownItems();
            $scope.highlightIndex += d;
            if ($scope.highlightIndex === -1) {
              $scope.highlightIndex = filteredItems.length - 1;
            }
            if ($scope.highlightIndex >= filteredItems.length) {
              return $scope.highlightIndex = 0;
            }
          };
          $scope.getHighlightedItem = function() {};
          $scope.onEnter = function(event) {
            var highlightedItem;
            highlightedItem = $scope.dropdownItems()[$scope.highlightIndex];
            $scope.selectItem($scope.highlightedItem);
            return false;
          };
          $scope.onPgup = function(event) {
            $scope.move(-11);
            return false;
          };
          $scope.onPgdown = function(event) {
            $scope.move(11);
            return false;
          };
          $scope.$watch('search', function() {
            return $scope.highlightIndex = 0;
          });
          $scope.selectedItems = [];
          $scope.active = false;
          return $scope.highlightIndex = 0;
        },
        link: function($scope, element, attrs, ngModelCtrl, transcludeFn) {
          var setViewValue;
          if (ngModelCtrl) {
            setViewValue = function(newValue, oldValue) {
              if (!angular.equals(newValue, oldValue)) {
                return ngModelCtrl.$setViewValue($scope.selectedItems);
              }
            };
            $scope.$watch('selectedItems', setViewValue, true);
            return ngModelCtrl.$render = function() {
              return $scope.selectedItems = ngModelCtrl.$modelValue || [];
            };
          }
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('angular-w').directive('wPopup', [
    '$rootScope', "$compile", 'wPopupManager', function($rootScope, $compile, popupManager) {
      return {
        restrict: 'E',
        compile: function(tElement, tAttrs) {
          var content;
          content = "" + (tElement.html().trim());
          tElement.remove();
          return popupManager.add(tAttrs.name, content);
        }
      };
    }
  ]).factory('wPopupManager', [
    '$document', '$compile', '$rootScope', function($document, $compile, $rootScope) {
      var attachTo, currentPopup, documentClickBind, popupManager;
      attachTo = void 0;
      currentPopup = void 0;
      documentClickBind = function(event) {
        if (event.target !== attachTo) {
          return $rootScope.$apply(function() {
            return $rootScope.popup.hide();
          });
        }
      };
      popupManager = {
        popups: {},
        add: function(name, popup) {
          return this.popups[name] = popup;
        },
        show: function(name, target) {
          var attachToElement, attachToScope, popupContent, popupElement;
          this.hide();
          popupContent = this.popups[name];
          if (popupContent == null) {
            return;
          }
          attachTo = target;
          attachToElement = angular.element(attachTo);
          attachToScope = attachToElement.scope();
          popupElement = angular.element("<div>" + popupContent + "</div>");
          currentPopup = $compile(popupElement)(attachToScope);
          currentPopup.bind('click', function(event) {
            event.preventDefault();
            return event.stopPropagation();
          });
          attachToElement.after(currentPopup);
          $document.bind('click', documentClickBind);
        },
        hide: function() {
          $document.unbind('click', documentClickBind);
          if (currentPopup != null) {
            currentPopup.remove();
          }
          currentPopup = attachTo = void 0;
        }
      };
      return $rootScope.popup = popupManager;
    }
  ]);

}).call(this);

(function() {
  var directiveFactory, keyCodes;

  keyCodes = {
    Tab: 9,
    ShiftTab: 9,
    Enter: 13,
    Esc: 27,
    Pgup: 33,
    Pgdown: 34,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Space: 32
  };

  directiveFactory = function(keyCode, dirName, shift) {
    return [
      '$parse', function($parse) {
        return {
          restrict: 'A',
          link: function(scope, element, attr) {
            var fn;
            fn = $parse(attr[dirName]);
            return element.on('keydown', function(event) {
              if (event.keyCode === keyCode && event.shiftKey === shift) {
                if (!scope.$apply(function() {
                  return fn(scope, {
                    $event: event
                  });
                })) {
                  return event.preventDefault();
                }
              }
            });
          }
        };
      }
    ];
  };

  angular.forEach(keyCodes, function(keyCode, keyName) {
    var dirName, shift;
    dirName = 'w' + keyName;
    shift = keyName.indexOf('Shift') !== -1;
    return angular.module('angular-w').directive(dirName, directiveFactory(keyCode, dirName, shift));
  });

}).call(this);

(function() {
  angular.module("angular-w").directive("wRadio", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          items: '=',
          limit: '=',
          inline: '=',
          keyAttr: '@',
          valueAttr: '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/radio.html",
        controller: function($scope, $element, $attrs) {
          $scope.toggle = function(item) {
            if (item !== $scope.selectedItem) {
              return $scope.selection(item);
            } else {
              return $scope.selectedItem = null;
            }
          };
          $scope.selection = function(item) {
            return $scope.selectedItem = item;
          };
          $scope.isSelected = function(item) {
            return angular.equals(item, $scope.selectedItem);
          };
          $scope.invalid = function() {
            return ($scope.errors != null) && $scope.errors.length > 0;
          };
          return $scope.shownItems = $scope.items;
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            var getSelectedIndex;
            if (ngModelCtrl) {
              scope.$watch('selectedItem', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return ngModelCtrl.$setViewValue(scope.selectedItem);
                }
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
            getSelectedIndex = function() {
              return indexOf(scope.shownItems, scope.selectedItem);
            };
            scope.selectedIndex = 0;
            scope.move = function(event, d) {
              scope.selectedIndex = scope.selectedIndex + d;
              if (scope.selectedIndex < 0) {
                scope.selectedIndex = 0;
              } else if (scope.selectedIndex > scope.shownItems.length - 1) {
                scope.selectedIndex = scope.shownItems.length - 1;
              } else {
                event.preventDefault();
              }
              return scope.selectedItem = scope.shownItems[scope.selectedIndex];
            };
            return scope.selectOnSpace = function(event, item) {
              scope.selection(item);
              return event.preventDefault();
            };
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("angular-w").directive("wSubmit", [
    '$parse', function($parse) {
      return {
        restrict: "A",
        require: '?form',
        link: function(scope, element, attr, controller) {
          var fn;
          fn = $parse(attr.wSubmit);
          return element.bind('submit', function(event) {
            return scope.$apply(function() {
              if (!controller || controller.$valid) {
                return fn(scope, {
                  $event: event
                });
              } else {
                return controller.$setDirty();
              }
            });
          });
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module('angular-w').directive('wSubmitField', [
    function() {
      return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/templates/submit_field.html'
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("angular-w").directive("wTags", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          invalid: '=',
          items: '=',
          limit: '=',
          disabled: '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/multi-select.html",
        controller: function($scope, $element, $attrs) {
          var search;
          search = function(q) {
            $scope.shownItems = filter(q, $scope.items).slice(0, $scope.limit);
            if ($scope.shownItems.length === 0) {
              $scope.shownItems.push(q);
            }
            $scope.activeItem = $scope.shownItems[0];
            return $scope.prevSearch = q;
          };
          $scope.getItemLabel = function(item) {
            return item;
          };
          $scope.getItemValue = function(item) {
            return item;
          };
          $scope.selectItem = function(item) {
            if ((item != null) && item.length > 0 && indexOf($scope.selectedItems, item) === -1) {
              $scope.selectedItems.push(item);
              return $scope.search = '';
            }
          };
          $scope.unselectItem = function(item) {
            var index;
            index = indexOf($scope.selectedItems, item);
            if (index > -1) {
              return $scope.selectedItems.splice(index, 1);
            }
          };
          $scope.onEnter = function(event) {
            $scope.selectItem($scope.activeItem || $scope.search);
            return true;
          };
          $scope.onPgup = function(event) {
            $scope.move(-11);
            return true;
          };
          $scope.onPgdown = function(event) {
            $scope.move(11);
            return true;
          };
          $scope.move = function(d) {
            var activeIndex, items;
            items = $scope.shownItems;
            activeIndex = (indexOf($scope.shownItems, $scope.activeItem) || 0) + d;
            activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
            return $scope.activeItem = items[activeIndex];
          };
          $scope.$watch('search', search);
          return $scope.selectedItems = [];
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          var scroll, setViewValue;
          if (ngModelCtrl) {
            setViewValue = function(newValue, oldValue) {
              if (!angular.equals(newValue, oldValue)) {
                return ngModelCtrl.$setViewValue(scope.selectedItems);
              }
            };
            scope.$watch('selectedItems', setViewValue, true);
            ngModelCtrl.$render = function() {
              return scope.selectedItems = ngModelCtrl.$modelValue || [];
            };
            addValidations(attrs, ngModelCtrl);
          }
          return scroll = function() {
            var delayedScrollFn;
            delayedScrollFn = function() {
              var li, ul;
              ul = element.find('ul')[0];
              li = ul.querySelector('li.active');
              return scrollToTarget(ul, li);
            };
            return setTimeout(delayedScrollFn, 0);
          };
        }
      };
    }
  ]);

}).call(this);
