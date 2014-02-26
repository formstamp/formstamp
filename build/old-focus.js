(function() {
  angular.module("formstamp").directive("fsOldFocus", function() {
    var focuz;
    focuz = function(el) {
      return window.setTimeout((function() {
        return el.focus();
      }), 0);
    };
    return {
      link: function(scope, element, attrs) {
        return scope.$watch(attrs.fsFocus, function(fcs) {
          if (fcs != null) {
            return focuz(element[0]);
          }
        });
      }
    };
  });

}).call(this);
