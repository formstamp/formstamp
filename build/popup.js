(function() {
  angular.module('angular-w').directive('wPopup', [
    "$document", "$compile", function($document, $compile) {
      return {
        restrict: 'E',
        replace: true,
        template: function(tElement, tAttrs) {
          var content;
          content = tElement.html();
          return "<div>\n  " + content + "\n</div>";
        },
        compile: function(tElement, tAttrs) {
          var content, contentLinkFn;
          content = tElement.html().trim();
          tElement.empty();
          tElement.bind('click', function(event) {
            event.preventDefault();
            return event.stopPropagation();
          });
          contentLinkFn = $compile(angular.element(content)[0]);
          return function(originalScope, element) {
            var childScope, documentClickBind, linkedContent;
            childScope = originalScope.$new();
            childScope.isPopupVisible = false;
            linkedContent = contentLinkFn(childScope);
            element.append(linkedContent);
            documentClickBind = function(event) {
              if (childScope.isPopupVisible && event.target !== childScope.attachTo) {
                return originalScope.$apply(function() {
                  return childScope.isPopupVisible = false;
                });
              }
            };
            childScope.$watch('isPopupVisible', function(isPopupVisible) {
              if (isPopupVisible) {
                $document.bind('click', documentClickBind);
                return element.css("display", "");
              } else {
                $document.unbind('click', documentClickBind);
                return element.css("display", "none");
              }
            });
            originalScope.$on('$destroy', function() {
              linkedContent.remove();
              return childScope.$destroy();
            });
            return originalScope.showPopup = function(attachTo) {
              childScope.isPopupVisible = true;
              return childScope.attachTo = attachTo;
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
                popup.scope().$apply(function(scope) {
                  return scope.showPopup(element[0]);
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
