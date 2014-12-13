app = require('./module')

src = require('raw!./radio.js')

sushi = [
  {img: 'CaliforniaRoll', label: 'California Roll', src: require('../imgs/CaliforniaRoll.gif')},
  {img: 'CucumberRoll', label: 'Cucumber Roll', src: require('../imgs/CucumberRoll.gif')},
  {img: 'FattyTuna', label: 'Fatty Tuna',src: require('../imgs/FattyTuna.gif')},
  {img: 'Inari', label: 'Inari',src: require('../imgs/Inari.gif')},
  {img: 'Octopus', label: 'Octopus', src: require('../imgs/Octopus.gif')},
  {img: 'Shrimp', label: 'Shrimp', src: require('../imgs/Shrimp.gif')}
]

app.controller('RadioCtrl', ['$scope', function ($scope){
  $scope.src = src
  $scope.sushi = sushi
  $scope.items = [
    {id: 'S', label: 'Shijima'},
    {id: 'M', label: 'Musubi'},
    {id: 'Y', label: 'Yosuga'}
  ];
}])
