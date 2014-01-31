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
            var el, _i, _len, _ref, _results;
            _ref = $document.find("div");
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              el = _ref[_i];
              element = angular.element(el);
              if (element.attr('name') === attrs.wPopup) {
                console.log('element', el);
                element.isolateScope().$apply(function(scope) {
                  return scope.isPopupVisible = true;
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
