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
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          items: '='
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/chz.html",
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
            return $scope.hideDropDown();
          };
          $scope.onkeys = function(key) {
            switch (key) {
              case 40:
                return move(1);
              case 38:
                return move(-1);
              case 13:
                return $scope.selection($scope.activeItem);
              case 27:
                return $scope.hideDropDown();
            }
          };
          $scope.$watch('search', search);
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          return search('');
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          if (ngModelCtrl) {
            scope.$watch('selectedItem', function() {
              return ngModelCtrl.$setViewValue(scope.selectedItem);
            });
            ngModelCtrl.$render = function() {
              return scope.selectedItem = ngModelCtrl.$modelValue;
            };
          }
          attrs.$observe('disabled', function(value) {
            return scope.disabled = value;
          });
          scope.$watch('selectedItem', function() {
            var childScope;
            childScope = scope.$new();
            childScope.item = scope.selectedItem;
            return transcludeFn(childScope, function(clone) {
              var link;
              if (clone.text().trim() !== "") {
                link = angular.element(element.find('a')[0]);
                return link.empty().append(clone);
              }
            });
          });
          return $window.addEventListener('click', function(e) {
            var parent;
            parent = $(e.target).parents('div.w-chz');
            element = $(element[0]);
            if (!parent.is(element)) {
              return scope.$apply(scope.hideDropDown);
            }
          });
        }
      };
    }
  ]);

}).call(this);
