(function() {
  var comp, difference, filter, focuz, hash_key;

  comp = function(a, b) {
    return a.toLowerCase().indexOf(b.toLowerCase()) > -1;
  };

  hash_key = function(item) {
    return angular.toJson(item);
  };

  difference = function(a, b) {
    var b_element, hash, _i, _len;
    if (!(b && a)) {
      return a;
    }
    hash = {};
    for (_i = 0, _len = b.length; _i < _len; _i++) {
      b_element = b[_i];
      hash[hash_key(b_element)] = true;
    }
    return a.filter((function(a_element) {
      return !hash[hash_key(a_element)];
    }));
  };

  filter = function(x, xs, valueAttr) {
    if (x) {
      return xs.filter((function(i) {
        return comp(i[valueAttr], x);
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

  angular.module("angular-w").directive("wFocus", function() {
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

  angular.module("angular-w").directive("wMultiSelect", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          items: '=',
          limit: '=',
          keyAttr: '@',
          valueAttr: '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/multi-select.html",
        controller: function($scope, $element, $attrs) {
          var resetDropDown;
          $scope.search = function(q) {
            $scope.shownItems = difference(filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit), $scope.selectedItems);
            return $scope.shownItems;
          };
          resetDropDown = function() {
            $scope.shownItems = difference($scope.items.slice(0, $scope.limit), $scope.selectedItems);
            return $scope.activeItem = $scope.shownItems[0];
          };
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          $scope.select = function(item) {
            $scope.selectedItems.push(item);
            $scope.hideDropDown();
            return resetDropDown();
          };
          $scope.onEnter = function(item) {
            $scope.select(item);
            return $scope.focus = true;
          };
          $scope.onEsc = function() {
            $scope.hideDropDown();
            return $scope.focus = true;
          };
          $scope.deselect = function(item) {
            var index;
            index = $scope.selectedItems.indexOf(item);
            if (index > -1) {
              $scope.selectedItems.splice($scope.selectedItems.indexOf(item), 1);
              return resetDropDown();
            }
          };
          $scope.reset = function() {
            $scope.selectedItems = [];
            return $scope.focus = true;
          };
          $scope.selectedItems = [];
          return resetDropDown();
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            if (ngModelCtrl) {
              scope.$watch('selectedItems', function() {
                ngModelCtrl.$setViewValue(scope.selectedItems);
                return scope.activeItem = scope.selectedItems;
              });
              ngModelCtrl.$render = function() {
                return scope.selectedItems = ngModelCtrl.$modelValue || [];
              };
            }
            scope.$watch('selectedItems', function() {
              var childScope;
              childScope = scope.$new();
              childScope.items = scope.selectedItems;
              return transcludeFn(childScope, function(clone) {
                var link;
                if (clone.text().trim() !== "") {
                  link = element[0].querySelector('a.w-multi-select-active');
                  return angular.element(link).empty().append(clone);
                }
              });
            });
            return $window.addEventListener('click', function(e) {
              var parent;
              parent = $(e.target).parents('div.w-multi-select')[0];
              if (parent !== element[0]) {
                return scope.$apply(scope.hideDropDown);
              }
            });
          };
        }
      };
    }
  ]);

}).call(this);
