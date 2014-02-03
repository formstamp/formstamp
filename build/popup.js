(function() {
  angular.module('angular-w').directive('wPopup', [
    "$compile", function($compile) {
      return {
        restrict: 'E',
        scope: {},
        replace: true,
        template: function(tElement, tAttrs) {
          var content;
          content = tElement.html();
          return "<div ng-show='isPopupVisible'>\n  " + content + "\n</div>";
        },
        compile: function(tElement, tAttrs) {
          var content, contentLinkFn;
          content = tElement.html().trim();
          tElement.empty();
          contentLinkFn = $compile(angular.element(content)[0]);
          return function(originalScope, element) {
            var childScope, linkedContent;
            originalScope.isPopupVisible = false;
            childScope = originalScope.$new();
            linkedContent = contentLinkFn(childScope);
            element.append(linkedContent);
            originalScope.$on('$destroy', function() {
              linkedContent.remove();
              return childScope.$destroy();
            });
            return originalScope.showPopup = function(attachTo) {
              return originalScope.isPopupVisible = true;
            };
          };
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
