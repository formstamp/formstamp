angular.module('angular-w')
  .controller 'FormCtrl', ['$scope', ($scope) ->

    objectWatch = (val) ->
      console.log val
    $scope.$watch 'object', objectWatch, true
]
