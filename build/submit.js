(function() {
  angular.module("formstamp").directive("fsSubmit", [
    '$parse', function($parse) {
      return {
        restrict: "A",
        require: '?form',
        link: function(scope, element, attr, controller) {
          var fn;
          fn = $parse(attr.fsSubmit);
          return element.bind('submit', function(event) {
            return scope.$apply(function() {
              if (!controller || controller.$valid) {
                return fn(scope, {
                  $event: event
                });
              } else {
                return controller.$setDirty();
              }
            });
          });
        }
      };
    }
  ]);

}).call(this);
