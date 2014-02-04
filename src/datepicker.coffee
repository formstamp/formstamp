angular
.module('angular-w')
.directive('wDatepicker', ['wPopupManager', (popupManager)->
  restrict: 'E'
  require: '?ngModel'
  scope: {}
  templateUrl: '/templates/datepicker.html'
  replace: true
  link: (scope, element, attrs, ngModel)->
    console.log(ngModel)
    scope.popup = scope.$parent.popup
    ngModel.$render = ->
      scope.date = ngModel.$modelValue
    scope.dateSelection = ->
      console.log(ngModel)
      ngModel.$setViewValue(scope.date)
])