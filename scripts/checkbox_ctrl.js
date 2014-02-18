angular.module('angular-w-demo')
  .controller('CheckboxCtrl', ['$scope', function($scope) {
    $scope.items = [
      {id: 'A', label: 'Awamori'},
      {id: 'S', label: 'Sake'},
      {id: 'U', label: 'Umeshu'}
    ];
  }]);