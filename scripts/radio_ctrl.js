angular.module('angular-w-demo')
  .controller('RadioCtrl', ['$scope', function($scope) {
    $scope.items = [
      {id: 'S', label: 'Shijima'},
      {id: 'M', label: 'Musubi'},
      {id: 'Y', label: 'Yosuga'}
    ];
  }]);