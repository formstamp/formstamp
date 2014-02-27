(function() {
  angular.module("formstamp").directive("fsNullForm", function() {
    return {
      restrict: "A",
      controller: function($element) {
        var noop, nullFormCtrl;
        noop = function() {};
        nullFormCtrl = {
          $addControl: noop,
          $removeControl: noop,
          $setValidity: noop,
          $setDirty: noop,
          $setPristine: noop
        };
        return $element.data('$formController', nullFormCtrl);
      }
    };
  });

}).call(this);
