angular
.module('formstamp')
.directive('fsDatepicker', ($filter)->
  restrict: 'EA'
  require: '?ngModel'
  scope:
    class: '@'
    disabled: '=ngDisabled'
  templateUrl: '/templates/datepicker.html'
  replace: true

  link: ($scope, element, attrs, ngModel) ->
    $scope.selectedDate = {}

    ngModel.$render = ->
      $scope.selectedDate.date = ngModel.$modelValue

    $scope.$watch 'selectedDate.date', (newDate, oldDate) ->
      console.log('selectedDate.date', newDate, oldDate, newDate == oldDate)
      if oldDate? && newDate?  && oldDate.getTime() != newDate.getTime()
        newDate.setHours(oldDate.getHours())
        newDate.setMinutes(oldDate.getMinutes())
      ngModel.$setViewValue(newDate)
      $scope.formattedDate = $filter('date')(newDate)
      $scope.active = false
)
