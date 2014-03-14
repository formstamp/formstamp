angular.module('angular-w')
.directive 'wField', [->
  restrict: 'A'
  replace: true
  transclude: true
  scope:
    items: '='
    object: '='
    objectName: '@object'
    field: '@wField'
  templateUrl: '/templates/field.html'
]
