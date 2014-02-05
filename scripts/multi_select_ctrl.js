angular.module('angular-w-demo')
.controller('MultiSelectCtrl', ['$scope', function($scope) {
  $scope.games = [
    {id: 0, label: 'Dragon Quest'},
    {id: 1, label: 'Final Fantasy'},
    {id: 2, label: 'Shin Megami Tensei'}
  ];
}]);