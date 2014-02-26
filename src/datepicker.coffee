angular
.module('formstamp')
.directive('fsDatepicker', ->
  restrict: 'EA'
  require: '?ngModel'
  scope: {}
  templateUrl: '/templates/datepicker.html'
  replace: true
  link: ($scope, element, attrs, ngModel) ->
    $scope.selectedDate = {}

    ngModel.$render = ->
      $scope.selectedDate.date = ngModel.$modelValue

    $scope.$watch 'selectedDate.date', (newDate) ->
      ngModel.$setViewValue(newDate)
)
