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
    "            data-ng-class=\"{'active': month == selectedMonth}\"\n" +
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
