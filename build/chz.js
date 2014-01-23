(function() {
  var comp, filter, focuz;

  comp = function(a, b) {
    return a.toLowerCase().indexOf(b.toLowerCase()) > -1;
  };

  filter = function(x, xs) {
    if (x) {
      return xs.filter((function(i) {
        return comp(i.name, x);
      }));
    } else {
      return xs;
    }
  };

  focuz = function(el) {
    return window.setTimeout((function() {
      return el.focus();
    }), 0);
  };

  angular.module("angular-w", []).directive("wFocus", function() {
    return {
      link: function(scope, element, attrs) {
        return scope.$watch(attrs.wFocus, function(fcs) {
          if (fcs) {
            return focuz(element[0]);
          }
        });
      }
    };
  });

  angular.module("angular-w").directive("wChz", [
    function() {
      return {
        restrict: "A",
        scope: {
          items: '='
        },
        replace: true,
        template: "<div>\n  <a class=\"btn btn-default\"\n     href=\"javascript:void(0)\"\n     ng-hide=\"active\"\n     ng-click=\"active=true\">\n     {{ (selectedItem || 'none') | json }}</a>\n  <div class=\"open\"\n       ng-show=\"active\" >\n    <input ng-keydown=\"onkeys($event.keyCode)\"\n           w-focus=\"active\"\n           class=\"form-control\"\n           type=\"search\"\n           ng-model=\"search\" />\n    <ul class=\"dropdown-menu\"\n        role=\"menu\"\n        style=\"margin-left: 15px;\">\n     <li ng-repeat=\"item in shownItems\"\n         ng-class=\"{true: 'active'}[item == activeItem]\">\n           <a ng-click=\"selection(item)\"\n              href=\"javascript:void(0)\" >{{ item.name }}</a></li></ul></div></div>",
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
