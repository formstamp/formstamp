angular.module('angular-w')
.directive 'wSubmit', [->
  restrict: 'A'
  replace: true
  transclude: true
  templateUrl: '/templates/submit.html'
]
