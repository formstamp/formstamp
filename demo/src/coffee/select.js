app = require('./module')

src = require('raw!./select.js')

countries = require('./countries')

app.controller('SelectCtrl', function ($scope){
  $scope.disabled = false;
  $scope.src = src

  $scope.items = [
    {id: 'S', label: 'Shijima'},
    {id: 'M', label: 'Musubi'},
    {id: 'Y', label: 'Yosuga'}
  ];

  $scope.countries = countries;

  $scope.laughs = ['Ha-ha-ha', 'Ho-ho-ho', 'He-he-he'];
})
