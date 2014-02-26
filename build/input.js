(function() {
  var widgetRoot;

  widgetRoot = function(el) {
    var currentEl;
    currentEl = el;
    while (currentEl && (currentEl.className != null) && currentEl.className.indexOf("fs-widget-root") < 0) {
      currentEl = currentEl.parentNode;
    }
    return currentEl;
  };

  angular.module("formstamp").directive("fsInput", [
    '$window', '$timeout', function($window, $timeout) {
      return {
        restrict: "A",
        link: function(scope, element, attrs) {
          var focusElement, fsRoot;
          focusElement = function() {
            return setTimeout((function() {
              return element[0].focus();
            }), 0);
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
                return focusElement();
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
            return fsRoot.on("mousedown", function(event) {
              if (event.target !== element.get(0)) {
                event.preventDefault();
                return false;
              } else {
                return true;
              }
            });
          }
        }
      };
    }
  ]);

}).call(this);
