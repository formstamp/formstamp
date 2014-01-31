(function() {
  angular.module('angular-w').directive('wPopup', [
    "$compile", function($compile) {
      return {
        restrict: 'E',
        scope: {},
        replace: true,
        template: function(tElement, tAttrs) {
          var content, template;
          content = tElement.html();
          console.log('content', content);
          console.log('tAttrs.name', tAttrs.name);
          template = "<div ng-show='isPopupVisible'>" + content + "</div>";
          console.log('template', template);
          console.log('tElement', tElement);
          return template;
        },
        compile: function(tElement, tAttrs) {
          var content;
          content = tElement.html();
          tElement.empty();
          return function(scope, element) {
            console.log('scope', scope);
            console.log('i am linked', element);
            scope.isPopupVisible = false;
            return scope.showPopup = function(attachTo) {
              var childScope, linkedContent;
              scope.isPopupVisible = true;
              console.log('attachTo', attachTo);
              console.log('content', content);
              childScope = scope.$new();
              linkedContent = content;
              return element.html(linkedContent);
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
            console.log('popup will show');
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
