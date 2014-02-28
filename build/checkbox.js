(function() {
  angular.module("formstamp").directive("fsCheckbox", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          disabled: '=ngDisabled',
          required: '=',
          errors: '=',
          items: '=',
          inline: '='
        },
        require: '?ngModel',
        template: function(el, attrs) {
          var itemTpl, template;
          itemTpl = el.html() || 'template me: {{item | json}}';
          return template = "<div class='fs-racheck' ng-class=\"{disabled: disabled, enabled: !disabled}\">\n  <div ng-repeat='item in items'>\n    <a class=\"fs-racheck-item\"\n       href='javascript:void(0)'\n       onclick=\"this.focus()\"\n       ng-disabled=\"disabled\"\n       ng-click=\"toggle(item)\"\n       fs-space='toggle(item)'>\n      <span class=\"fs-check-outer\"><span ng-show=\"isSelected(item)\" class=\"fs-check-inner\"></span></span>\n      " + itemTpl + "\n    </a>\n  </div>\n  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n</div>";
        },
        controller: function($scope, $element, $attrs) {
          $scope.toggle = function(item) {
            if ($scope.disabled) {
              return;
            }
            if (!$scope.isSelected(item)) {
              $scope.selectedItems.push(item);
            } else {
              $scope.selectedItems.splice(indexOf($scope.selectedItems, item), 1);
            }
            return false;
          };
          $scope.isSelected = function(item) {
            return indexOf($scope.selectedItems, item) > -1;
          };
          $scope.invalid = function() {
            return ($scope.errors != null) && $scope.errors.length > 0;
          };
          return $scope.selectedItems = [];
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          var setViewValue;
          if (ngModelCtrl) {
            setViewValue = function(newValue, oldValue) {
              if (!angular.equals(newValue, oldValue)) {
                return ngModelCtrl.$setViewValue(scope.selectedItems);
              }
            };
            scope.$watch('selectedItems', setViewValue, true);
            return ngModelCtrl.$render = function() {
              if (!scope.disabled) {
                return scope.selectedItems = ngModelCtrl.$viewValue || [];
              }
            };
          }
        }
      };
    }
  ]);

}).call(this);
