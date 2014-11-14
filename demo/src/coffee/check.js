app = require('./module')

src = require('raw!./check.js')

app.controller('CheckCtrl', function ($scope){
  $scope.src = src
  $scope.items = [
    {id: 'S', label: 'Shijima'},
    {id: 'M', label: 'Musubi'},
    {id: 'Y', label: 'Yosuga'}
  ];
})
