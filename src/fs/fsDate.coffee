angular
.module('formstamp')
.directive('fsDate', ->
  restrict: 'EA'
  require: '?ngModel'
  scope:
    class: '@'
    disabled: '=ngDisabled'
    placeholder: '@'
    format: '@'
  templateUrl: '/templates/date.html'
  replace: true
  link: ($scope, element, attrs, ngModel) ->
    $scope.selectedDate = {}

    if ngModel
      ngModel.$render = ->
        $scope.selectedDate.date = ngModel.$modelValue

      $scope.$watch 'selectedDate.date', (newDate, oldDate) ->
        updatedDate = updateDate(newDate, oldDate)

        if updatedDate?.getTime() != oldDate?.getTime()
          ngModel.$setViewValue(updatedDate)

    $scope.close = ->
      $scope.active = false
)
