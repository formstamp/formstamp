angular
.module('angular-w').directive 'wCalendar', ->
  restrict: 'E'
  templateUrl: '/templates/calendar.html'
  replace: true
  require: '?ngModel'
  scope: {firstDayOfWeek: '@firstDayOfWeek'}
  controller: ['$scope', '$locale', ($scope, $locale)->
    $scope.months = $locale.DATETIME_FORMATS.SHORTMONTH
    $scope.weekDays = $locale.DATETIME_FORMATS.SHORTDAY
    console.log($scope.firstDayOfWeek)
    if typeof $scope.firstDayOfWeek == undefined
      $scope.firstDayOfWeek = 0
    weekDays = $scope.weekDays
    weekDaysHead = weekDays.slice($scope.firstDayOfWeek, weekDays.length)
    weekDaysTail = weekDays.slice(0, $scope.firstDayOfWeek)
    $scope.weekDays = weekDaysHead.concat(weekDaysTail)
    currentTime = new Date()
    $scope.currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate())
    $scope.selectedYear = $scope.currentDate.getFullYear()
    $scope.selectedMonth = $scope.currentDate.getMonth()

    $scope.prevMonth = ->
      $scope.selectedMonth--
      if $scope.selectedMonth < 0
        $scope.selectedMonth = $scope.months.length - 1
        $scope.selectedYear--

    $scope.nextMonth = ->
      $scope.selectedMonth++
      if $scope.selectedMonth >= $scope.months.length
        $scope.selectedMonth = 0
        $scope.selectedYear++

    $scope.isDayInSelectedMonth = (day)->
      day.getFullYear() == $scope.selectedYear &&
        day.getMonth() == $scope.selectedMonth

    $scope.isCurrentDate = (day)->
      day.getTime() == $scope.currentDate?.getTime()

    $scope.isSelectedDate = (day)->
      day.getTime() == $scope.selectedDate?.getTime()

    dateOffsetedBy = (date, offsetInDays)->
      new Date(date.getFullYear(), date.getMonth(), date.getDate() + offsetInDays)

    updateMonthDays = ->
      firstDayOfMonth = new Date($scope.selectedYear, $scope.selectedMonth)
      firstDayOfWeek = dateOffsetedBy(firstDayOfMonth, -firstDayOfMonth.getDay())
      $scope.weeks = ((dateOffsetedBy(firstDayOfWeek, 7 * week + day) for day in [0..6]) for week in [0..5])

    $scope.$watch 'selectedDate', ->
      if $scope.selectedDate?
        $scope.selectedYear = $scope.selectedDate.getFullYear()
        $scope.selectedMonth = $scope.selectedDate.getMonth()

    $scope.$watch 'selectedMonth', updateMonthDays
    $scope.$watch 'selectedYear', updateMonthDays
  ]
  link: (scope, element, attrs, ngModel)->
    parseDate = (dateString)->
      time = Date.parse(dateString)
      unless isNaN(time)
        parsedDate = new Date(time)
        new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())

    ngModel.$render = ->
      scope.selectedDate = parseDate(ngModel.$modelValue)
      console.log(scope.selectedDate)

    scope.selectDay = (day)->
      scope.selectedDate = day
      ngModel.$setViewValue(day)
