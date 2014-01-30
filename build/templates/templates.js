angular.module('angular-w').run(['$templateCache', function($templateCache) {
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
