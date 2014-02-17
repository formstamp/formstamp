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
          invalid: '=',
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
          var getActiveIndex, resetDropDown, search;
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
            if ((item != null) && indexOf($scope.selectedItems, item) === -1) {
              $scope.selectedItems.push(item);
            }
            $scope.hideDropDown();
            return resetDropDown();
          };
          $scope.deselect = function(item) {
            var index;
            index = indexOf($scope.selectedItems, item);
            if (index > -1) {
              $scope.selectedItems.splice(index, 1);
              return resetDropDown();
            }
          };
          $scope.reset = function() {
            $scope.selectedItems = [];
            $scope.focus = true;
            return search('');
          };
          $scope.$watch('search', search);
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          $scope.showDropdown = function() {
            return $scope.active = true;
          };
          getActiveIndex = function() {
            return indexOf($scope.shownItems, $scope.activeItem) || 0;
          };
          $scope.selectedItems = [];
          return resetDropDown();
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            var scroll, setViewValue;
            if (ngModelCtrl) {
              setViewValue = function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                  return ngModelCtrl.$setViewValue(scope.selectedItems);
                }
              };
              scope.$watch('selectedItems', setViewValue, true);
              ngModelCtrl.$render = function() {
                return scope.selectedItems = ngModelCtrl.$modelValue || [];
              };
            }
            attrs.$observe('disabled', function(value) {
              return scope.disabled = value;
            });
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
            $window.addEventListener('click', function(e) {
              var parent;
              parent = $(e.target).parents('div.w-multi-select')[0];
              if (parent !== element[0]) {
                return scope.$apply(scope.hideDropDown);
              }
            });
            scroll = function() {
              var delayedScrollFn;
              delayedScrollFn = function() {
                var li, ul;
                ul = element.find('ul')[0];
                li = ul.querySelector('li.active');
                return scrollToTarget(ul, li);
              };
              return setTimeout(delayedScrollFn, 0);
            };
            scope.move = function(d) {
              var activeIndex, items;
              items = scope.shownItems;
              activeIndex = getActiveIndex() + d;
              activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
              scope.activeItem = items[activeIndex];
              return scroll();
            };
            scope.onEnter = function(event) {
              scope.selection(scope.activeItem);
              scope.focus = true;
              return event.preventDefault();
            };
            scope.onPgup = function(event) {
              scope.move(-11);
              return event.preventDefault();
            };
            scope.onPgdown = function(event) {
              scope.move(11);
              return event.preventDefault();
            };
            scope.onTab = function() {
              return scope.selection(scope.activeItem);
            };
            return scope.onEsc = function() {
              scope.hideDropDown();
              return scope.focus = true;
            };
          };
        }
      };
    }
  ]);

}).call(this);
