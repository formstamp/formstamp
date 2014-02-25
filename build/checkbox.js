(function() {
  angular.module("formstamp").directive("wCheckbox", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          errors: '=',
          items: '=',
          limit: '=',
          inline: '=',
          keyAttr: '@',
          valueAttr: '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/checkbox.html",
        controller: function($scope, $element, $attrs) {
          $scope.toggle = function(item) {
            if (!$scope.isSelected(item)) {
              return $scope.selectedItems.push(item);
            } else {
              return $scope.selectedItems.splice(indexOf($scope.selectedItems, item), 1);
            }
          };
          $scope.toggleOnSpace = function(event, item) {
            $scope.toggle(item);
            return event.preventDefault();
          };
          $scope.hasItem = function(item) {
            return indexOf($scope.selectedItems, item) > -1;
          };
          $scope.isSelected = function(item) {
            return indexOf($scope.selectedItems, item) > -1;
          };
          $scope.invalid = function() {
            return ($scope.errors != null) && $scope.errors.length > 0;
          };
          $scope.selectedItems = [];
          return $scope.shownItems = $scope.items;
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            var setViewValue;
            if (ngModelCtrl) {
              setViewValue = function(newValue, oldValue) {
                if (!angular.equals(newValue, oldValue)) {
                  return ngModelCtrl.$setViewValue(scope.selectedItems);
                }
              };
              scope.$watch('selectedItems', setViewValue, true);
              ngModelCtrl.$render = function() {
                if (!scope.disabled) {
                  return scope.selectedItems = ngModelCtrl.$viewValue || [];
                }
              };
            }
            attrs.$observe('disabled', function(value) {
              return scope.disabled = value;
            });
            return attrs.$observe('required', function(value) {
              return scope.required = value;
            });
          };
        }
      };
    }
  ]);

}).call(this);
