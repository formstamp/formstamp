angular.module('angular-w-demo')
  .controller('ComboCtrl', ['$scope', function($scope) {
    $scope.items = [
      'earth',
      'water',
      'fire',
      'wind',
      'void'
    ];
  }]);