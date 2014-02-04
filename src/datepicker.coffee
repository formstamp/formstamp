angular
.module('angular-w')
.directive('wDatepicker', ['wPopupManager', (popupManager)->
    restrict: 'E'
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