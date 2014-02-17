var addValidations, comp, filter, getComputedStyleFor, indexOf, innerHeightOf, scrollToTarget;

comp = function(a, b) {
  return a.toString().toLowerCase().indexOf(b.toString().toLowerCase()) > -1;
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
    "<div class='w-checkbox'>\n" +
    "  <div class='checkbox' ng-repeat='item in shownItems track by item.id' ng-class=\"{'w-checkbox-inline': inline}\">\n" +
    "    <label ng-click='toggle(item)'>\n" +
    "      <a href='javascript:void(0)' class='w-checkbox-item-container'>\n" +
    "        <span\n" +
    "                ng-disabled='disabled'\n" +
    "                class=\"w-checkbox-item-container-sign glyphicon glyphicon-search\"\n" +
    "                ng-class=\"{'glyphicon-pushpin': hasItem(item)}\"></span>\n" +
    "        {{item[valueAttr]}}\n" +
    "      </a>\n" +
    "    </label>\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/chz.html',
    "<div class='w-chz'>\n" +
    "    <div ng-hide=\"active\" ng-class=\"{'btn-group': selectedItem}\">\n" +
    "      <a class=\"btn btn-default w-chz-active\"\n" +
    "         ng-class='{\"btn-danger\": invalid}'\n" +
    "         href=\"javascript:void(0)\"\n" +
    "         ng-click=\"active=true\"\n" +
    "         w-focus='focus'\n" +
    "         ng-disabled=\"disabled\"\n" +
    "         ng-blur='focus=false'>\n" +
    "         <span ng-show='selectedItem'>{{selectedItem[valueAttr]}}</span>\n" +
    "         <span ng-hide='selectedItem'>none</span>\n" +
    "      </a>\n" +
    "      <button type=\"button\"\n" +
    "              class=\"btn btn-default\"\n" +
    "              aria-hidden=\"true\"\n" +
    "              ng-show='selectedItem'\n" +
    "              ng-click='reset()'>&times;</button>\n" +
    "    </div>\n" +
    "  <div class=\"open\" ng-show=\"active\">\n" +
    "    <input w-down='move(1)'\n" +
    "           w-up='move(-1)'\n" +
    "           w-pgup='onPgup($event)'\n" +
    "           w-pgdown='onPgdown($event)'\n" +
    "           w-enter='onEnter($event)'\n" +
    "           w-tab='onTab()'\n" +
    "           w-esc='onEsc()'\n" +
    "           w-focus=\"active\"\n" +
    "           class=\"form-control\"\n" +
    "           type=\"search\"\n" +
    "           placeholder='Search'\n" +
    "           ng-model=\"search\" />\n" +
    "    <ul class=\"dropdown-menu w-chz-items-list-default w-chz-items-list\"\n" +
    "        role=\"menu\"\n" +
    "        ng-show=\"shownItems.length\">\n" +
    "       <li ng-repeat=\"item in shownItems\"\n" +
    "           ng-class=\"{active: isActive(item)}\">\n" +
    "         <a ng-click=\"selection(item)\"\n" +
    "            href=\"javascript:void(0)\"\n" +
    "            id='{{item[keyAttr]}}'\n" +
    "            tabindex='-1'>{{ item[valueAttr] }}</a>\n" +
    "       </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/combo.html',
    "<div class='w-combo'>\n" +
    "    <div ng-hide=\"active\" ng-class=\"{'btn-group': selectedItem}\">\n" +
    "      <a class=\"btn btn-default w-combo-active\"\n" +
    "         ng-class='{\"btn-danger\": invalid}'\n" +
    "         href=\"javascript:void(0)\"\n" +
    "         ng-click=\"active=true\"\n" +
    "         w-focus='focus'\n" +
    "         ng-disabled=\"disabled\"\n" +
    "         ng-blur='focus=false'>\n" +
    "         <span ng-show='selectedItem'>{{selectedItem}}</span>\n" +
    "         <span ng-hide='selectedItem'>none</span>\n" +
    "      </a>\n" +
    "      <button type=\"button\"\n" +
    "              class=\"btn btn-default\"\n" +
    "              aria-hidden=\"true\"\n" +
    "              ng-show='selectedItem'\n" +
    "              ng-click='reset()'>&times;</button>\n" +
    "    </div>\n" +
    "  <div class=\"open\" ng-show=\"active\">\n" +
    "    <input w-down='move(1)'\n" +
    "           w-up='move(-1)'\n" +
    "           w-pgup='onPgup($event)'\n" +
    "           w-pgdown='onPgdown($event)'\n" +
    "           w-enter='onEnter($event)'\n" +
    "           w-tab='onTab()'\n" +
    "           w-esc='onEsc()'\n" +
    "           w-focus=\"active\"\n" +
    "           class=\"form-control\"\n" +
    "           type=\"search\"\n" +
    "           placeholder='Search'\n" +
    "           ng-model=\"search\" />\n" +
    "    <ul class=\"dropdown-menu w-combo-items-list-default w-combo-items-list\"\n" +
    "        role=\"menu\">\n" +
    "       <li ng-repeat=\"item in shownItems\"\n" +
    "           ng-class=\"{true: 'active'}[item == activeItem]\">\n" +
    "         <a ng-click=\"selection(item)\"\n" +
    "            href=\"javascript:void(0)\"\n" +
    "            id='{{item[keyAttr]}}'\n" +
    "            tabindex='-1'>{{ item }}</a>\n" +
    "       </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/datepicker.html',
    "<span>\n" +
    "  <input type=\"text\" data-ng-focus=\"popup.show('w-datepicker-popup', $event.target)\"\n" +
    "         data-ng-model=\"date\" data-ng-change=\"dateSelection()\" data-date-format=\"shortDate\">\n" +
    "  <w-popup name=\"w-datepicker-popup\">\n" +
    "    <w-calendar data-ng-model=\"date\" data-ng-change=\"popup.hide(); dateSelection()\"/>\n" +
    "  </w-popup>\n" +
    "</span>"
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
    "      <p class='text-danger' ng-repeat='message in validationErrors'>\n" +
    "        <span>{{message}}</span>\n" +
    "      </p>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('/templates/multi-select.html',
    "<div class='w-multi-select'>\n" +
    "  <div ng-hide=\"active\" ng-class=\"{'btn-group': selectedItems.length}\">\n" +
    "    <div class=\"btn btn-default w-multi-select-active-items\"\n" +
    "       ng-class='{\"has-error\": invalid}'\n" +
    "       href=\"javascript:void(0)\"\n" +
    "       ng-click='showDropdown()'\n" +
    "       w-focus='focus'\n" +
    "       ng-disabled=\"disabled\"\n" +
    "       tabindex='0'\n" +
    "       ng-blur='focus=false'\n" +
    "       w-enter='showDropdown()'>\n" +
    "      <span ng-hide='selectedItems.length'>none</span>\n" +
    "      <span ng-repeat='selectedItem in selectedItems' class=\"label label-primary w-multi-select-active-item\">\n" +
    "        <span class=\"glyphicon glyphicon-remove\" ng-click=\"deselect(selectedItem)\"></span>\n" +
    "        {{selectedItem[valueAttr]}}\n" +
    "      </span>\n" +
    "    </div>\n" +
    "    <button type=\"button\"\n" +
    "            class=\"btn btn-default\"\n" +
    "            aria-hidden=\"true\"\n" +
    "            ng-show='selectedItems.length'\n" +
    "            ng-click='reset()'>&times;</button>\n" +
    "  </div>\n" +
    "  <div class=\"open\" ng-show=\"active\">\n" +
    "    <input ng-keydown=\"onkeys($event)\"\n" +
    "           w-down='move(1)'\n" +
    "           w-up='move(-1)'\n" +
    "           w-pgup='onPgup($event)'\n" +
    "           w-pgdown='onPgdown($event)'\n" +
    "           w-enter='onEnter($event)'\n" +
    "           w-tab='onTab()'\n" +
    "           w-esc='onEsc()'\n" +
    "           w-focus=\"active\"\n" +
    "           class=\"form-control\"\n" +
    "           type=\"search\"\n" +
    "           placeholder='Search'\n" +
    "           ng-model=\"search\" />\n" +
    "    <ul class=\"dropdown-menu w-multi-select-items-list-default w-multi-select-items-list\"\n" +
    "        role=\"menu\"\n" +
    "        ng-show=\"shownItems.length\">\n" +
    "      <li ng-repeat=\"item in shownItems\"\n" +
    "          ng-class=\"{true: 'active'}[item == activeItem]\">\n" +
    "        <a ng-click=\"selection(item)\"\n" +
    "           href=\"javascript:void(0)\"\n" +
    "           id='{{item[keyAttr]}}'\n" +
    "           tabindex='-1'>{{ item[valueAttr] }}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/radio.html',
    "<div class='w-radio'>\n" +
    "  <div class='radio' ng-repeat='item in shownItems' ng-class=\"{'w-radio-inline': inline}\">\n" +
    "    <label ng-click='selection(item)'>\n" +
    "      <a href='javascript:void(0)' class='w-radio-item-container'>\n" +
    "        <span\n" +
    "          ng-disabled='disabled'\n" +
    "          class=\"w-radio-item-container-sign glyphicon glyphicon-search\"\n" +
    "          ng-class=\"{'glyphicon-pushpin': isSelected(item)}\"></span>\n" +
    "        {{item[valueAttr]}}\n" +
    "      </a>\n" +
    "    </label>\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
    "</div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('/templates/submit_field.html',
    "<div class=\"form-group\">\n" +
    "  <div class=\"col-sm-offset-2 col-sm-10\">\n" +
    "    <button type=\"submit\" class=\"btn btn-default\" ng-transclude></button>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('/templates/tags.html',
    "<div class='w-multi-select'>\n" +
    "  <div ng-hide=\"active\" ng-class=\"{'btn-group': selectedItems.length}\">\n" +
    "    <div class=\"btn btn-default w-multi-select-active-items\"\n" +
    "         ng-class='{\"has-error\": invalid}'\n" +
    "         href=\"javascript:void(0)\"\n" +
    "         ng-click=\"active=true\"\n" +
    "         w-focus='focus'\n" +
    "         ng-disabled=\"disabled\"\n" +
    "         tabindex='0'\n" +
    "         ng-blur='focus=false'\n" +
    "         ng-keydown='activeKeys($event)'>\n" +
    "      <span ng-hide='selectedItems.length'>none</span>\n" +
    "      <span ng-repeat='selectedItem in selectedItems' class=\"label label-primary w-multi-select-active-item\">\n" +
    "        <span class=\"glyphicon glyphicon-remove\" ng-click=\"deselect(selectedItem)\"></span>\n" +
    "        {{selectedItem}}\n" +
    "      </span>\n" +
    "    </div>\n" +
    "    <button type=\"button\"\n" +
    "            class=\"btn btn-default\"\n" +
    "            aria-hidden=\"true\"\n" +
    "            ng-show='selectedItems.length'\n" +
    "            ng-click='reset()'>&times;</button>\n" +
    "  </div>\n" +
    "  <div class=\"open\" ng-show=\"active\">\n" +
    "    <input w-down='move(1)'\n" +
    "           w-up='move(-1)'\n" +
    "           w-pgup='onPgup($event)'\n" +
    "           w-pgdown='onPgdown($event)'\n" +
    "           w-enter='onEnter($event)'\n" +
    "           w-tab='onTab()'\n" +
    "           w-esc='onEsc()'\n" +
    "           w-focus=\"active\"\n" +
    "           class=\"form-control\"\n" +
    "           type=\"search\"\n" +
    "           placeholder='Search'\n" +
    "           ng-model=\"search\" />\n" +
    "    <ul class=\"dropdown-menu w-multi-select-items-list-default w-multi-select-items-list\"\n" +
    "        role=\"menu\">\n" +
    "      <li ng-repeat=\"item in shownItems\"\n" +
    "          ng-class=\"{true: 'active'}[item == activeItem]\">\n" +
    "        <a ng-click=\"selection(item)\"\n" +
    "           href=\"javascript:void(0)\"\n" +
    "           id='{{item[keyAttr]}}'\n" +
    "           tabindex='-1'>{{ item }}</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n" +
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
            if (!$scope.hasItem(item)) {
              return $scope.selectedItems.push(item);
            } else {
              return $scope.selectedItems.splice(indexOf($scope.selectedItems, item), 1);
            }
          };
          $scope.hasItem = function(item) {
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
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          invalid: '=',
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
          var search;
          search = function(q) {
            $scope.shownItems = filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit);
            return $scope.activeItem = $scope.shownItems[0];
          };
          $scope.selection = function(item) {
            $scope.selectedItem = item;
            return $scope.hideDropDown();
          };
          $scope.reset = function() {
            $scope.selectedItem = null;
            return $scope.focus = true;
          };
          $scope.$watch('search', search);
          $scope.$watch('limit', function() {
            return search('');
          });
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          $scope.isActive = function(item) {
            return angular.equals(item, $scope.activeItem);
          };
          return search('');
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            var scroll;
            if (ngModelCtrl) {
              scope.$watch('selectedItem', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return ngModelCtrl.$setViewValue(scope.selectedItem);
                }
              });
              ngModelCtrl.$render = function() {
                return scope.selectedItem = ngModelCtrl.$viewValue;
              };
            }
            attrs.$observe('disabled', function(value) {
              return scope.disabled = value;
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
            $window.addEventListener('click', function(e) {
              var parent;
              parent = $(e.target).parents('div.w-chz')[0];
              if (parent !== element[0]) {
                return scope.$apply(scope.hideDropDown);
              }
            });
            scope.onEnter = function(event) {
              scope.selection(scope.activeItem);
              scope.focus = true;
              return event.preventDefault();
            };
            scope.onPgup = function(event) {
              scope.move(-11);
              return event.preventDefault();
            };
            scope.onPgdown = function(event) {
              scope.move(11);
              return event.preventDefault();
            };
            scope.onTab = function() {
              return scope.selection(scope.activeItem);
            };
            scope.onEsc = function() {
              scope.hideDropDown();
              return scope.focus = true;
            };
            scope.getActiveIndex = function() {
              return indexOf(scope.shownItems, scope.activeItem) || 0;
            };
            scope.move = function(d) {
              var activeIndex, items;
              items = scope.shownItems;
              activeIndex = getActiveIndex() + d;
              activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
              scope.activeItem = items[activeIndex];
              return scroll();
            };
            scroll = function() {
              var delayedScrollFn;
              delayedScrollFn = function() {
                var li, ul;
                ul = element.find('ul')[0];
                li = ul.querySelector('li.active');
                return scrollToTarget(ul, li);
              };
              return setTimeout(delayedScrollFn, 0);
            };
            return scope.$watch('active', function(value) {
              if (value) {
                scope.activeItem = scope.selectedItem;
                return scroll();
              }
            });
          };
        }
      };
    }
  ]);

}).call(this);

(function() {
  angular.module("angular-w").directive("wCombo", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          invalid: '=',
          items: '=',
          limit: '='
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/combo.html",
        controller: function($scope, $element, $attrs) {
          var search;
          search = function(q) {
            $scope.shownItems = filter(q, $scope.items).slice(0, $scope.limit);
            if ($scope.shownItems.length === 0) {
              $scope.shownItems.push(q);
            }
            return $scope.activeItem = $scope.shownItems[0];
          };
          $scope.selection = function(item) {
            $scope.selectedItem = item;
            return $scope.hideDropDown();
          };
          $scope.reset = function() {
            $scope.selectedItem = null;
            return $scope.focus = true;
          };
          $scope.$watch('search', search);
          $scope.$watch('limit', function() {
            return search('');
          });
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          return search('');
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          var getActiveIndex, scroll;
          if (ngModelCtrl) {
            scope.$watch('selectedItem', function(newValue, oldValue) {
              if (newValue !== oldValue) {
                ngModelCtrl.$setViewValue(scope.selectedItem);
                scope.activeItem = scope.selectedItem;
                return scope.search = scope.selectedItem;
              }
            });
            ngModelCtrl.$render = function() {
              return scope.selectedItem = ngModelCtrl.$viewValue;
            };
            addValidations(attrs, ngModelCtrl);
          }
          attrs.$observe('disabled', function(value) {
            return scope.disabled = value;
          });
          scope.$watch('selectedItem', function() {
            var childScope;
            childScope = scope.$new();
            childScope.item = scope.selectedItem;
            return transcludeFn(childScope, function(clone) {
              var link;
              if (clone.text().trim() !== "") {
                link = element[0].querySelector('a.w-combo-active');
                return angular.element(link).empty().append(clone);
              }
            });
          });
          $window.addEventListener('click', function(e) {
            var parent;
            parent = $(e.target).parents('div.w-combo')[0];
            if (parent !== element[0]) {
              return scope.$apply(function() {
                scope.hideDropDown();
                return scope.selection(scope.search);
              });
            }
          });
          scope.onPgup = function(event) {
            scope.move(-11);
            return event.preventDefault();
          };
          scope.onPgdown = function(event) {
            scope.move(11);
            return event.preventDefault();
          };
          scope.onEsc = function() {
            scope.hideDropDown();
            return scope.focus = true;
          };
          scope.onTab = function() {
            return scope.selection(scope.search || scope.activeItem);
          };
          scope.onEnter = function(event) {
            scope.selection(scope.activeItem || scope.search);
            scope.focus = true;
            return event.preventDefault();
          };
          getActiveIndex = function() {
            return indexOf(scope.shownItems, scope.activeItem) || 0;
          };
          scope.move = function(d) {
            var activeIndex, items;
            items = scope.shownItems;
            activeIndex = getActiveIndex() + d;
            activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
            scope.activeItem = items[activeIndex];
            return scroll();
          };
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
          if (fcs) {
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

  angular.module("angular-w").directive("wMultiSelect", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          invalid: '=',
          items: '=',
          limit: '=',
          keyAttr: '@',
          valueAttr: '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/multi-select.html",
        controller: function($scope, $element, $attrs) {
          var getActiveIndex, resetDropDown, search;
          search = function(q) {
            $scope.shownItems = difference(filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit), $scope.selectedItems);
            $scope.activeItem = $scope.shownItems[0];
            return $scope.prevSearch = q;
          };
          resetDropDown = function() {
            $scope.shownItems = difference($scope.items.slice(0, $scope.limit), $scope.selectedItems);
            return $scope.activeItem = $scope.shownItems[0];
          };
          $scope.selection = function(item) {
            if ((item != null) && indexOf($scope.selectedItems, item) === -1) {
              $scope.selectedItems.push(item);
            }
            $scope.hideDropDown();
            return resetDropDown();
          };
          $scope.deselect = function(item) {
            var index;
            index = indexOf($scope.selectedItems, item);
            if (index > -1) {
              $scope.selectedItems.splice(index, 1);
              return resetDropDown();
            }
          };
          $scope.reset = function() {
            $scope.selectedItems = [];
            $scope.focus = true;
            return search('');
          };
          $scope.$watch('search', search);
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          $scope.showDropdown = function() {
            return $scope.active = true;
          };
          getActiveIndex = function() {
            return indexOf($scope.shownItems, $scope.activeItem) || 0;
          };
          $scope.selectedItems = [];
          return resetDropDown();
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
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
            }
            attrs.$observe('disabled', function(value) {
              return scope.disabled = value;
            });
            scope.$watch('selectedItems', function() {
              var childScope;
              childScope = scope.$new();
              childScope.items = scope.selectedItems;
              return transcludeFn(childScope, function(clone) {
                var link;
                if (clone.text().trim() !== "") {
                  link = element[0].querySelector('a.w-multi-select-active');
                  return angular.element(link).empty().append(clone);
                }
              });
            });
            $window.addEventListener('click', function(e) {
              var parent;
              parent = $(e.target).parents('div.w-multi-select')[0];
              if (parent !== element[0]) {
                return scope.$apply(scope.hideDropDown);
              }
            });
            scroll = function() {
              var delayedScrollFn;
              delayedScrollFn = function() {
                var li, ul;
                ul = element.find('ul')[0];
                li = ul.querySelector('li.active');
                return scrollToTarget(ul, li);
              };
              return setTimeout(delayedScrollFn, 0);
            };
            scope.move = function(d) {
              var activeIndex, items;
              items = scope.shownItems;
              activeIndex = getActiveIndex() + d;
              activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
              scope.activeItem = items[activeIndex];
              return scroll();
            };
            scope.onEnter = function(event) {
              scope.selection(scope.activeItem);
              scope.focus = true;
              return event.preventDefault();
            };
            scope.onPgup = function(event) {
              scope.move(-11);
              return event.preventDefault();
            };
            scope.onPgdown = function(event) {
              scope.move(11);
              return event.preventDefault();
            };
            scope.onTab = function() {
              return scope.selection(scope.activeItem);
            };
            return scope.onEsc = function() {
              scope.hideDropDown();
              return scope.focus = true;
            };
          };
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
    Enter: 13,
    Esc: 27,
    Pgup: 33,
    Pgdown: 34,
    Up: 38,
    Down: 40
  };

  directiveFactory = function(keyCode, dirName) {
    return [
      '$parse', function($parse) {
        return {
          restrict: 'A',
          link: function(scope, element, attr) {
            var fn;
            fn = $parse(attr[dirName]);
            return element.on('keydown', function(event) {
              if (event.keyCode === keyCode) {
                return scope.$apply(function() {
                  return fn(scope, {
                    $event: event
                  });
                });
              }
            });
          }
        };
      }
    ];
  };

  angular.forEach(keyCodes, function(keyCode, keyName) {
    var dirName;
    dirName = 'w' + keyName;
    return angular.module('angular-w').directive(dirName, directiveFactory(keyCode, dirName));
  });

}).call(this);

(function() {
  angular.module("angular-w").directive("wRadio", [
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
        templateUrl: "/templates/radio.html",
        controller: function($scope, $element, $attrs) {
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
          limit: '='
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/tags.html",
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
          $scope.selection = function(item) {
            if ((item != null) && item.length > 0 && indexOf($scope.selectedItems, item) === -1) {
              $scope.selectedItems.push(item);
              $scope.search = '';
            }
            return $scope.hideDropDown();
          };
          $scope.deselect = function(item) {
            var index;
            index = indexOf($scope.selectedItems, item);
            if (index > -1) {
              return $scope.selectedItems.splice(index, 1);
            }
          };
          $scope.reset = function() {
            $scope.selectedItems = [];
            $scope.focus = true;
            return search('');
          };
          $scope.activeKeys = function(event) {
            if (event.keyCode === 13) {
              return $scope.active = true;
            }
          };
          $scope.$watch('search', search);
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          $scope.selectedItems = [];
          return search('');
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          var getActiveIndex, scroll, setViewValue;
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
          attrs.$observe('disabled', function(value) {
            return scope.disabled = value;
          });
          scope.$watch('selectedItems', function() {
            var childScope;
            childScope = scope.$new();
            childScope.items = scope.selectedItems;
            return transcludeFn(childScope, function(clone) {
              var link;
              if (clone.text().trim() !== "") {
                link = element[0].querySelector('a.w-multi-select-active');
                return angular.element(link).empty().append(clone);
              }
            });
          });
          $window.addEventListener('click', function(e) {
            var parent;
            parent = $(e.target).parents('div.w-multi-select')[0];
            if (parent !== element[0]) {
              return scope.$apply(function() {
                scope.hideDropDown();
                return scope.selection(scope.search);
              });
            }
          });
          scope.onEnter = function(event) {
            scope.selection(scope.activeItem || scope.search);
            scope.focus = true;
            return event.preventDefault();
          };
          scope.onPgup = function(event) {
            scope.move(-11);
            return event.preventDefault();
          };
          scope.onPgdown = function(event) {
            scope.move(11);
            return event.preventDefault();
          };
          scope.onTab = function() {
            return scope.selection(scope.search || scope.activeItem);
          };
          scope.onEsc = function() {
            scope.hideDropDown();
            return scope.focus = true;
          };
          getActiveIndex = function() {
            return indexOf(scope.shownItems, scope.activeItem) || 0;
          };
          scope.move = function(d) {
            var activeIndex, items;
            items = scope.shownItems;
            activeIndex = getActiveIndex() + d;
            activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
            scope.activeItem = items[activeIndex];
            return scroll();
          };
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
