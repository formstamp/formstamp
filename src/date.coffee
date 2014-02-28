angular
.module('formstamp')
.directive('fsDate', ->
  restrict: 'EA'
  require: '?ngModel'
  scope:
    class: '@'
    disabled: '=ngDisabled'
  templateUrl: '/templates/date.html'
  replace: true
  controller: ($scope, $filter) ->
    $scope.$watch 'selectedDate.date', (newDate) ->
      $scope.active = false
      $scope.formattedDate = $filter('date')(newDate)

  link: ($scope, element, attrs, ngModel) ->
    parseDate = (dateString)->
      time = Date.parse(dateString)
      unless isNaN(time)
        parsedDate = new Date(time)
        new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())

    $scope.selectedDate = {}

    ngModel.$render = ->
      $scope.selectedDate.date = ngModel.$modelValue

    $scope.$watch 'selectedDate.date', (newDate) ->
      oldDate = ngModel.$modelValue
      updatedDate = updateDate(newDate, oldDate)

      if newDate?.getTime() != oldDate?.getTime()
        ngModel.$setViewValue(newDate)
)
