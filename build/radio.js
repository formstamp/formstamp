(function() {
  angular.module("angular-w").directive("wRadio", [
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
        templateUrl: "/templates/radio.html",
        controller: function($scope, $element, $attrs) {
          $scope.toggle = function(item) {
            if (item !== $scope.selectedItem) {
              return $scope.selection(item);
            } else {
              return $scope.selectedItem = null;
            }
          };
          $scope.selection = function(item) {
            return $scope.selectedItem = item;
          };
          $scope.isSelected = function(item) {
            return angular.equals(item, $scope.selectedItem);
          };
          $scope.invalid = function() {
            return ($scope.errors != null) && $scope.errors.length > 0;
          };
          return $scope.shownItems = $scope.items;
        },
        compile: function(tElement, tAttrs) {
          tAttrs.keyAttr || (tAttrs.keyAttr = 'id');
          tAttrs.valueAttr || (tAttrs.valueAttr = 'label');
          return function(scope, element, attrs, ngModelCtrl, transcludeFn) {
            var getSelectedIndex;
            if (ngModelCtrl) {
              scope.$watch('selectedItem', function(newValue, oldValue) {
                if (newValue !== oldValue) {
                  return ngModelCtrl.$setViewValue(scope.selectedItem);
                }
              });
              ngModelCtrl.$render = function() {
                return scope.selectedItem = ngModelCtrl.$modelValue;
              };
            }
            attrs.$observe('disabled', function(value) {
              return scope.disabled = value;
            });
            attrs.$observe('required', function(value) {
              return scope.required = value;
            });
            getSelectedIndex = function() {
              return indexOf(scope.shownItems, scope.selectedItem);
            };
            scope.selectedIndex = 0;
            return scope.move = function(event, d) {
              scope.selectedIndex = scope.selectedIndex + d;
              if (scope.selectedIndex < 0) {
                scope.selectedIndex = 0;
              } else if (scope.selectedIndex > scope.shownItems.length - 1) {
                scope.selectedIndex = scope.shownItems.length - 1;
              } else {
                console.log(scope.selectedIndex);
                event.preventDefault();
              }
              return scope.selectedItem = scope.shownItems[scope.selectedIndex];
            };
          };
        }
      };
    }
  ]);

}).call(this);
