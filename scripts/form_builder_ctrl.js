angular.module('angular-w-demo')
    .controller('FormBuilderCtrl', function($scope, $http) {
  $scope.samurai = {};
  $scope.genders = [
    {id: 'F', label: 'Female'},
    {id: 'M', label: 'Male'},
    {id: 'U', label: 'Unknown'},
    {id: 'O', label: 'Other'}
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
  $scope.warriors = [
    {id: 'Oda', label: 'Nobunaga'},
    {id: 'Suzu', label: 'Hitomi'},
    {id: 'Ruji', label: 'Takeda'}
  ];
  $scope.goals = ['Unite Japan', 'Conquer China']

  $scope.send = function() {
    var res = $http.post('/').success(function(data) {
      angular.copy(data, $scope.samurai);
    });
  }
});
