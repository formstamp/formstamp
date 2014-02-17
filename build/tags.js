(function() {
  angular.module("angular-w").directive("wTags", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          invalid: '=',
          items: '=',
          limit: '='
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/tags.html",
        controller: function($scope, $element, $attrs) {
          var search;
          search = function(q) {
            $scope.shownItems = filter(q, $scope.items).slice(0, $scope.limit);
            if ($scope.shownItems.length === 0) {
              $scope.shownItems.push(q);
            }
            $scope.activeItem = $scope.shownItems[0];
            return $scope.prevSearch = q;
          };
          $scope.selection = function(item) {
            if ((item != null) && item.length > 0 && indexOf($scope.selectedItems, item) === -1) {
              $scope.selectedItems.push(item);
              $scope.search = '';
            }
            return $scope.hideDropDown();
          };
          $scope.deselect = function(item) {
            var index;
            index = indexOf($scope.selectedItems, item);
            if (index > -1) {
              return $scope.selectedItems.splice(index, 1);
            }
          };
          $scope.reset = function() {
            $scope.selectedItems = [];
            $scope.focus = true;
            return search('');
          };
          $scope.activeKeys = function(event) {
            if (event.keyCode === 13) {
              return $scope.active = true;
            }
          };
          $scope.$watch('search', search);
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          $scope.selectedItems = [];
          return search('');
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          var getActiveIndex, scroll, setViewValue;
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
            addValidations(attrs, ngModelCtrl);
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
              return scope.$apply(function() {
                scope.hideDropDown();
                return scope.selection(scope.search);
              });
            }
          });
          scope.onEnter = function(event) {
            scope.selection(scope.activeItem || scope.search);
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
            return scope.selection(scope.search || scope.activeItem);
          };
          scope.onEsc = function() {
            scope.hideDropDown();
            return scope.focus = true;
          };
          getActiveIndex = function() {
            return indexOf(scope.shownItems, scope.activeItem) || 0;
          };
          scope.move = function(d) {
            var activeIndex, items;
            items = scope.shownItems;
            activeIndex = getActiveIndex() + d;
            activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
            scope.activeItem = items[activeIndex];
            return scroll();
          };
          return scroll = function() {
            var delayedScrollFn;
            delayedScrollFn = function() {
              var li, ul;
              ul = element.find('ul')[0];
              li = ul.querySelector('li.active');
              return scrollToTarget(ul, li);
            };
            return setTimeout(delayedScrollFn, 0);
          };
        }
      };
    }
  ]);

}).call(this);
