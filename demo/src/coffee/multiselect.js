app = require('./module')

src = require('raw!./multiselect.js')

countries = require('./countries')
app.controller('MultiSelectCtrl', function ($scope){
    $scope.src = src;
    $scope.disabled = false;

    $scope.items = [
      {id: 'S', label: 'Shijima'},
      {id: 'M', label: 'Musubi'},
      {id: 'Y', label: 'Yosuga'},
      {id: 'GG', label: 'Genmai gohan'},
      {id: 'K', label: 'Kamameshi'},
      {id: 'MO', label: 'Mochi'},
      {id: 'SH', label: 'Sekihan'}
    ];

    $scope.countries = countries
    $scope.countryNames = countries.map(function(x){return x.name})

})
