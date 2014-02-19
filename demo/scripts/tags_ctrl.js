angular.module('angular-w-demo')
  .controller('TagsCtrl', ['$scope', function($scope) {
    $scope.items = [
      'earth',
      'water',
      'fire',
      'wind',
      'void'
    ];
  }]);