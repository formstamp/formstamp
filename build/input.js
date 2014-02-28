(function() {
  angular.module("formstamp").directive("fsInput", [
    '$parse', function($parse) {
      return {
        restrict: "A",
        link: function(scope, element, attrs) {
          var blurElement, focusElement, fsRoot, keyCodes;
          focusElement = function() {
            return setTimeout((function() {
              return element[0].focus();
            }), 0);
          };
          blurElement = function() {
            return setTimeout((function() {
              return element[0].blur();
            }), 0);
          };
          keyCodes = {
            Tab: 9,
            ShiftTab: 9,
            Enter: 13,
            Esc: 27,
            PgUp: 33,
            PgDown: 34,
            Left: 37,
            Up: 38,
            Right: 39,
            Down: 40,
            Space: 32
          };
          if (attrs["fsFocusWhen"] != null) {
            scope.$watch(attrs["fsFocusWhen"], function(newValue) {
              if (newValue) {
                return focusElement();
              }
            });
          }
          if (attrs["fsBlurWhen"] != null) {
            scope.$watch(attrs["fsBlurWhen"], function(newValue) {
              if (newValue) {
                return blurElement();
              }
            });
          }
          if (attrs["fsOnFocus"] != null) {
            element.on('focus', function(event) {
              return scope.$apply(attrs["fsOnFocus"]);
            });
          }
          if (attrs["fsOnBlur"] != null) {
            element.on('blur', function(event) {
              return scope.$apply(attrs["fsOnBlur"]);
            });
          }
          if (attrs["fsHoldFocus"] != null) {
            fsRoot = $(element).parents(".fs-widget-root").first();
            fsRoot.on("mousedown", function(event) {
              if (event.target !== element.get(0)) {
                event.preventDefault();
                return false;
              } else {
                return true;
              }
            });
          }
          return angular.forEach(keyCodes, function(keyCode, keyName) {
            var attrName, callbackExpr, shift;
            attrName = 'fs' + keyName;
            if (attrs[attrName] != null) {
              shift = keyName.indexOf('Shift') !== -1;
              callbackExpr = $parse(attrs[attrName]);
              return element.on('keydown', function(event) {
                if (event.keyCode === keyCode && event.shiftKey === shift) {
                  if (!scope.$apply(function() {
                    return callbackExpr(scope, {
                      $event: event
                    });
                  })) {
                    return event.preventDefault();
                  }
                }
              });
            }
          });
        }
      };
    }
  ]);

}).call(this);
