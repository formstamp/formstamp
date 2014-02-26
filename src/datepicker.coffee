angular
.module('formstamp')
.directive('fsDatepicker', ->
  restrict: 'EA'
  require: '?ngModel'
  scope: {}
  templateUrl: '/templates/datepicker.html'
  replace: true
  controller: ($scope, $filter) ->
    $scope.$watch 'selectedDate.date', (newDate) ->
      $scope.formattedDate = $filter('date')(newDate)

  link: ($scope, element, attrs, ngModel) ->
    $scope.selectedDate = {}

    ngModel.$render = ->
      $scope.selectedDate.date = ngModel.$modelValue

    $scope.$watch 'selectedDate.date', (newDate) ->
      ngModel.$setViewValue(newDate)
)
