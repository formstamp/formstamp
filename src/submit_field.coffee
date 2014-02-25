angular.module('formstamp')
.directive 'wSubmitField', [->
  restrict: 'A'
  replace: true
  transclude: true
  templateUrl: '/templates/submit_field.html'
]
