angular
.module('formstamp')
.directive('fsDatepicker', ->
  restrict: 'EA'
  require: '?ngModel'
  scope:
    class: '@'
    disabled: '=ngDisabled'
  templateUrl: '/templates/datepicker.html'
  replace: true
  controller: ($scope, $filter) ->
    $scope.$watch 'selectedDate.date', (newDate) ->
      $scope.active = false
      $scope.formattedDate = $filter('date')(newDate)

  link: ($scope, element, attrs, ngModel) ->
    $scope.selectedDate = {}

    ngModel.$render = ->
      $scope.selectedDate.date = ngModel.$modelValue

    $scope.$watch 'selectedDate.date', (newDate) ->
      oldDate = ngModel.$modelValue
      if oldDate? && newDate?
        newDate.setHours(oldDate.getHours())
        newDate.setMinutes(oldDate.getMinutes())
      ngModel.$setViewValue(newDate)
)
