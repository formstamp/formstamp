angular
.module('formstamp')
.directive('fsDate', ->
  restrict: 'EA'
  require: '?ngModel'
  scope:
    class: '@'
    disabled: '=ngDisabled'
    placeholder: '@'
  templateUrl: '/templates/date.html'
  replace: true
  controller: ($scope, $filter) ->
    $scope.$watch 'selectedDate.date', (newDate, oldDate) ->
      updatedDate = updateDate(newDate, oldDate)
      $scope.active = false
      $scope.formattedDate = $filter('date')(updatedDate, 'shortDate')

  link: ($scope, element, attrs, ngModel) ->
    $scope.selectedDate = {}

    ngModel.$render = ->
      $scope.selectedDate.date = ngModel.$modelValue

    $scope.$watch 'selectedDate.date', (newDate, oldDate) ->
      updatedDate = updateDate(newDate, oldDate)

      if updatedDate?.getTime() != oldDate?.getTime()
        ngModel.$setViewValue(updatedDate)
)
