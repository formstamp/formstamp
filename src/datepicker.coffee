angular
.module('formstamp')
.directive('fsDatepicker', ['fsPopupManager', (popupManager)->
    restrict: 'EA'
    require: '?ngModel'
    scope: {}
    templateUrl: '/templates/datepicker.html'
    replace: true
    link: (scope, element, attrs, ngModel)->
      scope.popup = popupManager
      ngModel.$render = ->
        scope.date = ngModel.$modelValue
      scope.dateSelection = ->
        ngModel.$setViewValue(scope.date)
  ])
