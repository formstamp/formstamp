(function() {
  angular.module("angular-w").directive("wTags", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          items: '=',
          limit: '='
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/tags.html",
        controller: function($scope, $element, $attrs) {
          var getActiveIndex, move, scrollIfNeeded, search;
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
            $scope.shownItems = filter(q, $scope.items).slice(0, $scope.limit);
            if ($scope.shownItems.length === 0) {
              $scope.shownItems.push(q);
            }
            $scope.activeItem = $scope.shownItems[0];
            return $scope.prevSearch = q;
          };
          $scope.selection = function(item) {
            if ((item != null) && item.length > 0 && $scope.selectedItems.indexOf(item) === -1) {
              $scope.selectedItems.push(item);
              $scope.hideDropDown();
              return $scope.search = '';
            }
          };
          $scope.deselect = function(item) {
            var index;
            index = $scope.selectedItems.indexOf(item);
            if (index > -1) {
              return $scope.selectedItems.splice($scope.selectedItems.indexOf(item), 1);
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
                $scope.selection($scope.activeItem || $scope.search);
                $scope.focus = true;
                return event.preventDefault();
              case 9:
                return $scope.selection($scope.search || $scope.activeItem);
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
          return search('');
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
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
              return scope.$apply(function() {
                scope.hideDropDown();
                return scope.selection(scope.search);
              });
            }
          });
        }
      };
    }
  ]);

}).call(this);
