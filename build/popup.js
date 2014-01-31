(function() {
  angular.module('angular-w').directive('wPopup', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
          'name': '='
        },
        template: '<div ng-show="isPopupVisible" ng-transclude></div>',
        link: function(scope, element) {
          scope.isPopupVisible = false;
          scope.showPopup = function(attachTo) {
            return scope.isPopupVisible = true;
          };
          return element.attr('name', scope.name);
        }
      };
    }
  ]).directive('wPopup', [
    '$document', function($document) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          return element.on('focus', function() {
            var el, popup, _i, _len, _ref, _results;
            _ref = $document.find("div");
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              el = _ref[_i];
              popup = angular.element(el);
              if (popup.attr('name') === attrs.wPopup) {
                console.log('element', el);
                popup.isolateScope().$apply(function(scope) {
                  return scope.showPopup(element);
                });
                break;
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          });
        }
      };
    }
  ]);

}).call(this);
