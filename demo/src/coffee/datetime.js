app = require('./module')

src = require('raw!./datetime.js')

app.controller('DatetimeCtrl',['$scope', function ($scope){
  $scope.selectedDate = new Date();
  $scope.src = src
  $scope.selectedDate = new Date();
  $scope.disabled = false;
  now = new Date();
  $scope.svalue = now.getHours() + ":" + now.getMinutes();
  $scope.disabled = false;

  $scope.setTime = function(str) {
    $scope.svalue = str;
  };
  $scope.disabled = false;
  $scope.selectedDateTime = new Date();
}])
