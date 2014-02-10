angular.module('angular-w')
  .controller 'FormCtrl', ['$scope', '$element', ($scope, $element) ->

    objectWatch = (val) ->
    $scope.$watch 'object', objectWatch, true
]
