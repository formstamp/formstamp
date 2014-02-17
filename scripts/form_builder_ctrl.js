angular.module('angular-w-demo')
    .controller('FormBuilderCtrl', function($scope, $http) {
  $scope.samurai = {};
  $scope.ronin = {};
  $scope.stages = [
    {id: 'S', label: 'Shu'},
    {id: 'H', label: 'Ha'},
    {id: 'R', label: 'Ri'}
  ];
  $scope.names = ["Joe", "Sue", "Sam"];
  $scope.ages = []
  for (var age = 0; age < 100; age++) {
    $scope.ages.push({
      id: age,
      label: age
    });
  }

  $scope.meals = [
    {id: 'meat', label: 'meat'},
    {id: 'milk', label: 'milk'},
    {id: 'orange', label: 'orange'}
  ];
  $scope.weapons = [
    {id: '1', label: 'Katana'},
    {id: '2', label: 'Naginata'},
    {id: '3', label: 'Yari'}
  ];

  $scope.weaponStyles = ['Kenjutsu', 'Naginatajutsu', 'Sōjutsu'];

  $scope.provinces = [
    {id: 1, label: 'Yamashiro'},
    {id: 2, label: 'Yamato'},
    {id: 3, label: 'Kowachi'}
  ];

  $scope.send = function() {
    var res = $http.post('/').success(function(data) {
      angular.copy(data, $scope.samurai);
    });
  }
});
