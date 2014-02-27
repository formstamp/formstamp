shiftWeekDays = (weekDays, firstDayOfWeek)->
  weekDaysHead = weekDays.slice(firstDayOfWeek, weekDays.length)
  weekDaysHead.concat(weekDays.slice(0, firstDayOfWeek))

angular
.module('formstamp').directive 'fsCalendar', ['$locale', ($locale)->
  restrict: 'E'
  templateUrl: '/templates/calendar.html'
  replace: true
  require: '?ngModel'
  scope: {}
  controller: ['$scope', '$attrs', ($scope, $attrs)->
    $scope.selectionMode = 'day'
    $scope.months = $locale.DATETIME_FORMATS.SHORTMONTH

    currentTime = new Date()
    $scope.currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())
    $scope.selectedYear = $scope.currentDate.getFullYear()
    $scope.selectedMonth = $scope.months[$scope.currentDate.getMonth()]
    $scope.monthGroups = ($scope.months.slice(i * 4, i * 4 + 4) for i in [0..2])

    $scope.prevMonth = ->
      month = indexOf($scope.months, $scope.selectedMonth) - 1
      if month < 0
        month = $scope.months.length - 1
        $scope.selectedYear--
      $scope.selectedMonth = $scope.months[month]

    $scope.nextMonth = ->
      month = indexOf($scope.months, $scope.selectedMonth) + 1
      if month >= $scope.months.length
        month = 0
        $scope.selectedYear++
      $scope.selectedMonth = $scope.months[month]

    $scope.prevYear = ->
      $scope.selectedYear--

    $scope.nextYear = ->
      $scope.selectedYear++

    $scope.prevYearRange = ->
      rangeSize = $scope.years.length
      $scope.years = [$scope.years[0] - rangeSize..$scope.years[$scope.years.length - 1] - rangeSize]

    $scope.nextYearRange = ->
      rangeSize = $scope.years.length
      $scope.years = [$scope.years[0] + rangeSize..$scope.years[$scope.years.length - 1] + rangeSize]

    $scope.switchSelectionMode = ->
      $scope.selectionMode = switch $scope.selectionMode
        when 'day' then 'month'
        when 'month' then 'year'
        else
          'day'

    $scope.isDayInSelectedMonth = (day)->
      day.getFullYear() == $scope.selectedYear && $scope.months[day.getMonth()] == $scope.selectedMonth

    $scope.isCurrentDate = (day)->
      day.getTime() == $scope.currentDate?.getTime()

    $scope.isSelectedDate = (day)->
      day.getTime() == $scope.selectedDate?.getTime()

    addDays = (date, days)->
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)

    updateSelectionRanges = ->
      monthIndex = indexOf($scope.months, $scope.selectedMonth)
      firstDayOfMonth = new Date($scope.selectedYear, monthIndex)
      dayOffset = $scope.firstDayOfWeek - firstDayOfMonth.getDay()
      dayOffset -= 7 if dayOffset > 0
      firstDayOfWeek = addDays(firstDayOfMonth, dayOffset)
      $scope.weeks = ((addDays(firstDayOfWeek, 7 * week + day) for day in [0..6]) for week in [0..5])
      $scope.years = [$scope.selectedYear - 5..$scope.selectedYear + 6]

    $scope.$watch 'selectedDate', ->
      if $scope.selectedDate?
        $scope.selectedYear = $scope.selectedDate.getFullYear()
        $scope.selectedMonth = $scope.months[$scope.selectedDate.getMonth()]

    $scope.$watch 'selectedMonth', updateSelectionRanges
    $scope.$watch 'selectedYear', updateSelectionRanges
    $scope.$watch 'years', ->
      $scope.yearGroups = ($scope.years.slice(i * 4, i * 4 + 4) for i in [0..3])

    $scope.firstDayOfWeek = parseInt($attrs.firstDayOfWeek || 0)
    $scope.weekDays = shiftWeekDays($locale.DATETIME_FORMATS.SHORTDAY, $scope.firstDayOfWeek)
  ]

  link: (scope, element, attrs, ngModel)->
    parseDate = (dateString)->
      time = Date.parse(dateString)
      unless isNaN(time)
        parsedDate = new Date(time)
        new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())

    ngModel.$render = ->
      scope.selectedDate = parseDate(ngModel.$modelValue)

    scope.isSameYear = ->
      parseDate(ngModel.$modelValue)?.getFullYear() == scope.selectedYear

    scope.selectDay = (day)->
      scope.selectedDate = day

    scope.$watch 'selectedDate', (newDate) ->
      oldDate = ngModel.$modelValue
      if oldDate? && newDate?
        newDate.setHours(oldDate.getHours())
        newDate.setMinutes(oldDate.getMinutes())
      ngModel.$setViewValue(newDate)

    scope.selectMonth = (monthName)->
      scope.selectionMode = 'day'
      scope.selectedDate = undefined
      scope.selectedMonth = monthName

    scope.selectYear = (year)->
      scope.selectionMode = 'month'
      scope.selectedDate = undefined
      scope.selectedYear = year
]
