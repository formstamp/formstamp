angular.module('formstamp')
.directive 'fsSubmitField', [->
  restrict: 'A'
  replace: true
  transclude: true
  templateUrl: '/templates/submit_field.html'
]
