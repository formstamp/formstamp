var app = require('./module');
var src = require('raw!./select.js');
var countries = require('./countries');

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
    console.log("Searching Wikipedia for", lookupText);

    if (typeof lookupText == 'undefined'
        || lookupText == null
        || lookupText == '') {
      return [];
    } else {
      return $q(function(resolve, reject) {
        $http.jsonp('http://en.wikipedia.org/w/api.php?action=opensearch&search=' + lookupText + '&limit=40&format=json&callback=JSON_CALLBACK')
          .success(function(data) {
            var result = [];
            var i = 0;

            for(i = 0; i < data[1].length; i++) {
              result.push({label: data[1][i], desc: data[2][i], url: data[3][i]});
            }

            resolve(result);
          })
          .error(function(data) {
            console.log(data);
            reject([]);
          });
      });
    };
  };
}]);
