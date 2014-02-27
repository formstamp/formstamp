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

    $scope.selectedDate = {}

    ngModel.$render = ->
      $scope.selectedDate.date = ngModel.$modelValue

    $scope.$watch 'selectedDate.date', (newDate) ->
      ngModel.$setViewValue(newDate)
)
