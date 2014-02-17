angular.module('angular-w')
.directive 'wSubmitField', [->
  restrict: 'A'
  replace: true
  transclude: true
  templateUrl: '/templates/submit_field.html'
]
