app = require('./module')

src = require('raw!./list.js')

app.controller('ListCtrl', function ($scope){
  $scope.src = src
  SC.initialize({ client_id: '8399f2e0577e0acb4eee4d65d6c6cce6' });

  $scope.$watch('search', function () {
    SC.get('/tracks',
      { q: $scope.search, license: 'cc-by-sa' },
      function(tracks) {
        $scope.$apply(function() { $scope.tracks = tracks })
      })
  });

  $scope.search = 'bach';
  $scope.tracks = [];

  $scope.move = function (d) {
    $scope.listInterface.move(d);
  };

  $scope.listInterface = {
    onSelect: function (selectedItem) {
      $scope.select(selectedItem)
    }
  };

  $scope.select = function(selectedItem) {
    $scope.selectedTrack = selectedItem || $scope.listInterface.selectedItem;
  };
})

app.directive("demoAudio", function() {
  return {
    restrict: "E",
    scope: {
      track: '='
    },
    template: "<audio controls />",
    replace: true,
    link: function($scope, $element, $attrs) {
      return $scope.$watch('track', function(track) {
        if (track) {
          $element.attr('src', track.stream_url + "?client_id=8399f2e0577e0acb4eee4d65d6c6cce6");
          return $element[0].play();
        }
      });
    }
  };
});
