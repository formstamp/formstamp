var app = require('./module');
var src = require('raw!./select.js');
var countries = require('./countries');

app.config(function($httpProvider) {
  // Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;
  console.log("configurationBlock called!");
});

app.controller('SelectCtrl', ['$scope', '$q', '$http', function ($scope, $q, $http) {
  $scope.disabled = false;
  $scope.src = src;

  $scope.items = [
    {id: 'S', label: 'Shijima'},
    {id: 'M', label: 'Musubi'},
    {id: 'Y', label: 'Yosuga'}
  ];

  $scope.countries = countries;
  $scope.laughs = ['Ha-ha-ha', 'Ho-ho-ho', 'He-he-he'];

  $scope.wikipediaArticles = function(lookupText) {
    console.log("Search Wikipedia for", lookupText);

    if (typeof lookupText == 'undefined'
        || lookupText == null
        || lookupText == '') {
      return [];
    } else {
      return $q(function(resolve, reject) {
        $http.jsonp('http://en.wikipedia.org/w/api.php?action=opensearch&search=' + lookupText + '&limit=40&format=json&callback=JSON_CALLBACK')
          .success(function(data) {
            console.log(data);
            resolve(data[1]);
          })
          .error(function(data) {
            console.log(data);
            reject([]);
          });
      });
    };
  };
}]);
