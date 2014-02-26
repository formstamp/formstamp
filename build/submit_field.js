(function() {
  angular.module('formstamp').directive('fsSubmitField', [
    function() {
      return {
        restrict: 'A',
        replace: true,
        transclude: true,
        templateUrl: '/templates/submit_field.html'
      };
    }
  ]);

}).call(this);
