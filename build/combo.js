(function() {
  angular.module("angular-w").directive("wCombo", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          invalid: '=',
          items: '=',
          limit: '=',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/chz.html",
        controller: function($scope, $element, $attrs) {
          var search;
          search = function(q) {
            $scope.shownItems = filter(q, $scope.items).slice(0, $scope.limit);
            if ($scope.shownItems.length === 0) {
              $scope.shownItems.push(q);
            }
            return $scope.activeItem = $scope.shownItems[0];
          };
          $scope.getSelectedLabel = function() {
            return $scope.getItemLabel($scope.selectedItem);
          };
          $scope.getItemLabel = function(item) {
            return item;
          };
          $scope.isActive = function(item) {
            return item === $scope.activeItem;
          };
          $scope.selection = function(item) {
            $scope.selectedItem = item;
            return $scope.hideDropDown();
          };
          $scope.reset = function() {
            $scope.selectedItem = null;
            return $scope.focus = true;
          };
          $scope.$watch('search', search);
          $scope.$watch('limit', function() {
            return search('');
          });
          $scope.hideDropDown = function() {
            return $scope.active = false;
          };
          return search('');
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          var getActiveIndex, scroll;
          if (ngModelCtrl) {
            scope.$watch('selectedItem', function(newValue, oldValue) {
              if (newValue !== oldValue) {
                ngModelCtrl.$setViewValue(scope.selectedItem);
                scope.activeItem = scope.selectedItem;
                return scope.search = scope.selectedItem;
              }
            });
            ngModelCtrl.$render = function() {
              return scope.selectedItem = ngModelCtrl.$viewValue;
            };
            addValidations(attrs, ngModelCtrl);
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
                link = element[0].querySelector('a.w-chz-active');
                return angular.element(link).empty().append(clone);
              }
            });
          });
          $window.addEventListener('click', function(e) {
            var parent;
            parent = $(e.target).parents('div.w-chz')[0];
            if (parent !== element[0]) {
              return scope.$apply(function() {
                scope.hideDropDown();
                return scope.selection(scope.search);
              });
            }
          });
          scope.onPgup = function(event) {
            scope.move(-11);
            return event.preventDefault();
          };
          scope.onPgdown = function(event) {
            scope.move(11);
            return event.preventDefault();
          };
          scope.onEsc = function() {
            scope.hideDropDown();
            return scope.focus = true;
          };
          scope.onTab = function() {
            return scope.selection(scope.search || scope.activeItem);
          };
          scope.onEnter = function(event) {
            scope.selection(scope.activeItem || scope.search);
            scope.focus = true;
            return event.preventDefault();
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
