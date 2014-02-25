(function() {
  angular.module("formstamp").directive("fsOldHoldFocus", function($timeout) {
    var widgetRoot;
    widgetRoot = function(el) {
      var currentEl;
      currentEl = el;
      while (currentEl && (currentEl.className != null) && currentEl.className.indexOf("fs-widget-root") < 0) {
        currentEl = currentEl.parentNode;
      }
      return currentEl;
    };
    return {
      link: function(scope, element, attrs) {
        var focusElement;
        focusElement = function() {
          return setTimeout((function() {
            return element[0].focus();
          }), 0);
        };
        if (attrs["fsHoldFocusWhen"] != null) {
          scope.$watch(attrs["fsHoldFocusWhen"], function(newValue) {
            if (newValue) {
              return focusElement();
            }
          });
        }
        element.on('focus', function(event) {
          return scope.$apply(attrs["fsHoldFocus"]);
        });
        return element.on('blur', function(event) {
          var newWidgetRoot, oldWidgetRoot;
          oldWidgetRoot = widgetRoot(event.srcElement || event.target);
          newWidgetRoot = widgetRoot(event.relatedTarget);
          if (event.relatedTarget && newWidgetRoot !== null && oldWidgetRoot === newWidgetRoot) {
            return focusElement();
          } else {
            return scope.$apply(attrs["fsHoldFocusBlur"]);
          }
        });
      }
    };
  });

}).call(this);
