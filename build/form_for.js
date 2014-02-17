(function() {
  angular.module('angular-w').directive('wFormFor', [
    '$window', function($window) {
      return {
        restrict: 'A',
        require: '?form',
        scope: {
          object: '=wFormFor'
        },
        compile: function(tElement, tAttrs) {
          tElement.attr('class', 'form-horizontal');
          tElement.attr('role', 'form');
          return function(scope, element, attrs, formController) {
            return $window.addEventListener('beforeunload', function() {
              if (formController.$dirty) {
                return 'You will lose unsaved changes unless you stay on this page';
              }
            });
          };
        },
        controller: function($scope, $element, $attrs) {
          this.getObject = function() {
            return $scope.object;
          };
          this.getObjectName = function() {
            return $attrs.wFormFor;
          };
        }
      };
    }
  ]);

}).call(this);
