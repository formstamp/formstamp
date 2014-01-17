(function() {
  var filter, focuz;

  filter = function(q, items) {
    if (q) {
      return items.filter(function(item) {
        return item.name.toLowerCase().indexOf(q.toLowerCase()) > -1;
      });
    } else {
      return items;
    }
  };

  focuz = function(el) {
    var f;
    f = (function() {
      return el.focus();
    });
    return window.setTimeout(f, 0);
  };

  angular.module("angular-w", []).directive("wFocus", [
    function() {
      return {
        link: function(scope, element, attrs) {
          return scope.$watch(attrs.wFocus, function(fcs) {
            if (fcs) {
              return focuz(element[0]);
            }
          });
        }
      };
    }
  ]);

  angular.module("angular-w").directive("wChz", [
    function() {
      return {
        restrict: "A",
        scope: {
          items: '='
        },
        replace: true,
        template: "<div>\n  <a class=\"btn btn-default\"\n     href=\"javascript:void(0)\"\n     ng-hide=\"active\"\n     ng-click=\"active=true\">\n  {{ (selectedItem || 'none') | json }}\n  </a>\n  <div class=\"open\" ng-show=\"active\" >\n    <input ng-keydown=\"onkeys($event.keyCode)\" w-focus=\"active\" class=\"form-control\" type=\"search\" ng-model=\"search\" />\n    <ul class=\"dropdown-menu\" role=\"menu\" style=\"margin-left: 15px;\">\n     <li ng-repeat=\"item in shownItems\" ng-class=\"{true: 'active'}[item == activeItem]\"><a ng-click=\"selection(item)\" href=\"javascript:void(0)\" >{{ item.name }}</a></li>\n    </ul>\n  </div>\n</div>",
        controller: function($scope, $element, $attrs) {
          var move, search;
          move = function(d) {
            var activeIndex, items;
            items = $scope.shownItems;
            activeIndex = (items.indexOf($scope.activeItem) || 0) + d;
            activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
            return $scope.activeItem = items[activeIndex];
          };
          search = function(q) {
            if ($scope.prevSearch !== q) {
              $scope.shownItems = filter(q, $scope.items).slice(0, 11);
              $scope.activeItem = $scope.shownItems[0];
            }
            return $scope.prevSearch = q;
          };
          $scope.selection = function(item) {
            $scope.selectedItem = item;
            return $scope.active = false;
          };
          $scope.onkeys = function(key) {
            switch (key) {
              case 40:
                return move(1);
              case 38:
                return move(-1);
              case 13:
                return $scope.selection($scope.activeItem);
            }
          };
          $scope.$watch('search', search);
          return search('');
        }
      };
    }
  ]);

}).call(this);
