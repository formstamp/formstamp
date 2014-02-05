(function() {
  var comp, filter, focuz;

  comp = function(a, b) {
    return a.toString().toLowerCase().indexOf(b.toString().toLowerCase()) > -1;
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

  angular.module("angular-w").directive("wChz", [
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
        templateUrl: "/templates/chz.html",
        controller: function($scope, $element, $attrs) {
          $scope.search = function(q) {
            return filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit);
          };
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          $scope.select = function(item) {
            $scope.selectedItem = item;
            return $scope.hideDropDown();
          };
          $scope.onEnter = function(item) {
            $scope.select(item);
            return $scope.focus = true;
          };
          $scope.onEsc = function() {
            $scope.hideDropDown();
            return $scope.focus = true;
          };
          $scope.reset = function() {
            $scope.selectedItem = null;
            return $scope.focus = true;
          };
          return $scope.search('');
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            if (ngModelCtrl) {
              scope.$watch('selectedItem', function() {
                ngModelCtrl.$setViewValue(scope.selectedItem);
                return scope.activeItem = scope.selectedItem;
              });
              ngModelCtrl.$render = function() {
                return scope.selectedItem = ngModelCtrl.$modelValue;
              };
            }
            attrs.$observe('disabled', function(value) {
              return scope.disabled = value;
            });
            attrs.$observe('required', function(value) {
              return scope.required = value;
            });
            scope.$watch('selectedItem', function() {
              var childScope;
              childScope = scope.$new();
              childScope.item = scope.selectedItem;
              return transcludeFn(childScope, function(clone) {
                var link;
                if (clone.text().trim() !== "") {
                  link = element[0].querySelector('a.w-chz-active');
                  return angular.element(link).empty().append(clone);
                }
              });
            });
            return $window.addEventListener('click', function(e) {
              var parent;
              parent = $(e.target).parents('div.w-chz')[0];
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
