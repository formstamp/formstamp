(function() {
  angular.module("angular-w").directive("wCheckbox", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
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
            if ($scope.selectedItems.indexOf(item) === -1) {
              return $scope.selectedItems.push(item);
            } else {
              return $scope.selectedItems.splice($scope.selectedItems.indexOf(item), 1);
            }
          };
          $scope.selectedItems = [];
          return $scope.shownItems = $scope.items;
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            if (ngModelCtrl) {
              scope.$watch('selectedItem', function() {
                ngModelCtrl.$setViewValue(scope.selectedItem);
                return scope.activeItem = scope.selectedItem;
              });
              ngModelCtrl.$render = function() {
                if (!scope.disabled) {
                  return scope.selectedItem = ngModelCtrl.$modelValue;
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
