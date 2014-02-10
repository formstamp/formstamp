angular.module('angular-w')
  .controller 'FormCtrl', ['$scope', ($scope) ->

    objectWatch = (val) ->
    $scope.$watch 'object', objectWatch, true
]
