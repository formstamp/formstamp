(function() {
  angular.module('angular-w').directive('wPopup', [
    "$document", "$compile", function($document, $compile) {
      return {
        restrict: 'E',
        scope: {},
        replace: true,
        template: function(tElement, tAttrs) {
          var content;
          content = tElement.html();
          return "<div ng-show=\"isPopupVisible\">\n  " + content + "\n</div>";
        },
        compile: function(tElement, tAttrs) {
          var content, contentLinkFn;
          content = tElement.html().trim();
          tElement.empty();
          tElement.bind('click', function(event) {
            event.preventDefault();
            return event.stopPropagation();
          });
          contentLinkFn = $compile(angular.element(content));
          return function(scope, element) {
            var documentClickBind, linkedContent;
            scope.isPopupVisible = false;
            linkedContent = contentLinkFn(scope.$parent);
            element.append(linkedContent);
            documentClickBind = function(event) {
              if (scope.isPopupVisible && event.target !== scope.attachTo) {
                return scope.$apply(function() {
                  return scope.isPopupVisible = false;
                });
              }
            };
            scope.$watch('isPopupVisible', function(isPopupVisible) {
              if (isPopupVisible) {
                return $document.bind('click', documentClickBind);
              } else {
                return $document.unbind('click', documentClickBind);
              }
            });
            scope.showPopup = function(attachTo) {
              scope.isPopupVisible = true;
              return scope.attachTo = attachTo;
            };
            return scope.hidePopup = function() {
              return scope.isPopupVisible = false;
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
          var getPopup;
          getPopup = function() {
            var el, popup, _i, _len, _ref;
            _ref = $document.find("div");
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              el = _ref[_i];
              popup = angular.element(el);
              if (popup.attr('name') === attrs.wPopup) {
                return popup;
              }
            }
          };
          return element.on('focus', function() {
            return scope.$apply(function() {
              var popupScope;
              popupScope = getPopup().isolateScope();
              popupScope.showPopup(element[0]);
              return scope.hidePopup = popupScope.hidePopup;
            });
          });
        }
      };
    }
  ]);

}).call(this);
