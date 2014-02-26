(function() {
  angular.module("formstamp").directive("fsList", function() {
    return {
      restrict: "A",
      scope: {
        items: '=',
        "class": '@'
      },
      transclude: true,
      replace: true,
      templateUrl: "/templates/list.html",
      link: function($scope, $element, $attrs) {
        var ensureHighlightedItemVisible;
        ensureHighlightedItemVisible = function() {
          var delayedScrollFn;
          delayedScrollFn = function() {
            var li, ul;
            ul = $element.find('ul')[0];
            li = ul.querySelector('li.active');
            return scrollToTarget(ul, li);
          };
          return setTimeout(delayedScrollFn, 0);
        };
        return $scope.$watch('highlightIndex', function(idx) {
          return ensureHighlightedItemVisible();
        });
      },
      controller: function($scope, $element, $attrs, $filter) {
        var updateSelectedItem;
        updateSelectedItem = function(hlIdx) {
          if ($scope.$parent.listInterface != null) {
            return $scope.$parent.listInterface.selectedItem = $scope.items[hlIdx];
          }
        };
        $scope.highlightItem = function(item) {
          $scope.highlightIndex = $scope.items.indexOf(item);
          return $scope.$parent.listInterface.onSelect(item);
        };
        $scope.$watch('items', function(newItems) {
          $scope.highlightIndex = 0;
          return updateSelectedItem(0);
        });
        $scope.$watch('highlightIndex', function(idx) {
          return updateSelectedItem(idx);
        });
        $scope.move = function(d) {
          var items;
          items = $scope.items;
          $scope.highlightIndex += d;
          if ($scope.highlightIndex === -1) {
            $scope.highlightIndex = items.length - 1;
          }
          if ($scope.highlightIndex >= items.length) {
            return $scope.highlightIndex = 0;
          }
        };
        $scope.highlightIndex = 0;
        if ($scope.$parent.listInterface != null) {
          return $scope.$parent.listInterface.move = function(delta) {
            return $scope.move(delta);
          };
        }
      }
    };
  });

}).call(this);
