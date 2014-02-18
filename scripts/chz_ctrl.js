angular.module('angular-w-demo')
.controller('ChzCtrl', ['$scope', function($scope) {
  $scope.awards = [
    {id: 1000, label: 'one thousand'},
    {id: 2000, label: 'two thousands'},
    {id: 3000, label: 'three thousands'}
  ];
}])
.controller('ChzItemsCtrl', function($scope) {
  $scope.weapons = [
    {id: 'katana', label: 'Long sword Katana'},
    {id: 'yuml', label: 'Longbow Yuml'},
    {id: 'yari', label: 'Spear Yari'}
  ];
})

.controller('ChzLimitsCtrl', function($scope) {
  $scope.numbers = [
    {id: 1, label: 1},
    {id: 2, label: 2},
    {id: 3, label: 3}
  ];
  $scope.weapons = [
    {id: 'katana', label: 'Long sword Katana'},
    {id: 'yuml', label: 'Longbow Yuml'},
    {id: 'yari', label: 'Spear Yari'}
  ];
})

.controller('ChzKeyValuesCtrl', function($scope) {
  $scope.cities = [
    {code: 'JP SPK', name: 'Sapporo'},
    {code: 'JP SDJ', name: 'Sendai'},
    {code: 'JP TYO', name: 'Tokyo'},
    {code: 'JP NGO', name: 'Nagoya'}
  ];
})

.controller('ChzTemplatingsCtrl', function($scope) {
  $scope.cities = [
    {id: 'JP SPK', label: 'Sapporo'},
    {id: 'JP SDJ', label: 'Sendai'},
    {id: 'JP TYO', label: 'Tokyo'},
    {id: 'JP NGO', label: 'Nagoya'}
  ];
});
