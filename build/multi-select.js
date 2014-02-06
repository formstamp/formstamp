(function() {
  var difference, hash_key;

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
          var getActiveIndex, move, resetDropDown, scrollIfNeeded, search;
          move = function(d) {
            var activeIndex, items;
            items = $scope.shownItems;
            activeIndex = getActiveIndex() + d;
            activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
            $scope.activeItem = items[activeIndex];
            return scrollIfNeeded(activeIndex);
          };
          scrollIfNeeded = function(activeIndex) {
            var item, li, liHeight, ul, viewport;
            ul = $element.find('ul')[0];
            li = ul.querySelector('li.active');
            if (!(ul && li)) {
              return;
            }
            viewport = {
              top: ul.scrollTop,
              bottom: ul.scrollTop + innerHeightOf(ul)
            };
            li = ul.querySelector('li.active');
            liHeight = innerHeightOf(li);
            item = {
              top: activeIndex * liHeight,
              bottom: (activeIndex + 1) * liHeight
            };
            if (item.bottom > viewport.bottom) {
              return ul.scrollTop += item.bottom - viewport.bottom;
            } else if (item.top < viewport.top) {
              return ul.scrollTop -= viewport.top - item.top;
            }
          };
          search = function(q) {
            $scope.shownItems = difference(filter(q, $scope.items, $scope.valueAttr).slice(0, $scope.limit), $scope.selectedItems);
            $scope.activeItem = $scope.shownItems[0];
            return $scope.prevSearch = q;
          };
          resetDropDown = function() {
            $scope.shownItems = difference($scope.items.slice(0, $scope.limit), $scope.selectedItems);
            return $scope.activeItem = $scope.shownItems[0];
          };
          $scope.selection = function(item) {
            $scope.selectedItems.push(item);
            $scope.hideDropDown();
            return resetDropDown();
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
            $scope.focus = true;
            return search('');
          };
          $scope.onkeys = function(event) {
            switch (event.keyCode) {
              case 40:
                return move(1);
              case 38:
                return move(-1);
              case 13:
                $scope.selection($scope.activeItem);
                $scope.focus = true;
                return event.preventDefault();
              case 9:
                return $scope.selection($scope.activeItem);
              case 27:
                $scope.hideDropDown();
                return $scope.focus = true;
              case 34:
                return move(11);
              case 33:
                return move(-11);
            }
          };
          $scope.$watch('search', search);
          $scope.$watch('active', function(value) {
            if (value) {
              return window.setTimeout((function() {
                return scrollIfNeeded(getActiveIndex());
              }), 0);
            }
          });
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          getActiveIndex = function() {
            return $scope.shownItems.indexOf($scope.activeItem) || 0;
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
