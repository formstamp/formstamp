(function() {
  angular.module('angular-w').directive('wDropdown', [
    '$window', function($window) {
      return {
        restrict: 'A',
        replace: true,
        scope: {
          opened: '=',
          items: '=',
          valueAttr: '=',
          onSearch: '=',
          onClick: '=',
          onEnter: '=',
          onTab: '=',
          onEsc: '=',
          focusInput: '='
        },
        templateUrl: '/templates/dropdown.html',
        link: function(scope, element, attrs) {
          var getActiveIndex, getComputedStyle, move, scrollIfNeeded;
          getActiveIndex = function() {
            return scope.items.indexOf(scope.activeItem) || 0;
          };
          getComputedStyle = function(elem, prop) {
            return parseInt($window.getComputedStyle(elem, null).getPropertyValue(prop));
          };
          move = function(d) {
            var activeIndex, items;
            items = scope.items;
            activeIndex = getActiveIndex() + d;
            activeIndex = Math.min(Math.max(activeIndex, 0), items.length - 1);
            scope.activeItem = items[activeIndex];
            return scrollIfNeeded(activeIndex);
          };
          scrollIfNeeded = function(activeIndex) {
            var item, li, liHeight, ul, ulHeight, viewport;
            ul = element.find('ul')[0];
            li = ul.querySelector('li.active');
            if (!(ul && li)) {
              return;
            }
            ulHeight = ul.clientHeight - getComputedStyle(ul, 'padding-top') - getComputedStyle(ul, 'padding-bottom');
            viewport = {
              top: ul.scrollTop,
              bottom: ul.scrollTop + ulHeight
            };
            li = ul.querySelector('li.active');
            liHeight = li.clientHeight - getComputedStyle(li, 'padding-top') - getComputedStyle(li, 'padding-bottom');
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
          scope.onkeys = function(event) {
            switch (event.keyCode) {
              case 40:
                return move(1);
              case 38:
                return move(-1);
              case 13:
                scope.onEnter && scope.onEnter(scope.activeItem);
                return event.preventDefault();
              case 9:
                return scope.onTab && scope.onTab(scope.activeItem);
              case 27:
                return scope.onEsc && scope.onEsc();
              case 34:
                return move(11);
              case 33:
                return move(-11);
            }
          };
          scope.$watch('opened', function(value) {
            if (value) {
              return window.setTimeout((function() {
                return scrollIfNeeded(getActiveIndex());
              }), 0);
            }
          });
          return scope.$watch('search', function(q) {
            scope.items = scope.onSearch(q);
            return scope.activeItem = scope.items[0];
          });
        }
      };
    }
  ]);

}).call(this);
