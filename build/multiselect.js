(function() {
  angular.module('formstamp').filter('exclude', function() {
    return function(input, selected) {
      if (selected == null) {
        return input;
      }
      if (input == null) {
        return [];
      }
      return input.filter(function(item) {
        return selected.indexOf(item) < 0;
      });
    };
  });

  angular.module("formstamp").directive("fsMultiselect", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          items: '=',
          disabled: '=ngDisabled',
          freetext: '@',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        template: function(el, attributes) {
          var defaultItemTpl, itemTpl;
          if (attributes['freetext'] != null) {
            defaultItemTpl = "{{ item }}";
          } else {
            defaultItemTpl = "{{ item | json }}";
          }
          itemTpl = el.html() || defaultItemTpl;
          return "<div class='fs-multiselect fs-widget-root' ng-class='{ \"fs-with-selected-items\": selectedItems.length > 0 }'>\n  <div class='fs-multiselect-wrapper'>\n    <div class=\"fs-multiselect-selected-items\" ng-if=\"selectedItems.length > 0\">\n      <a ng-repeat='item in selectedItems' class=\"btn\" ng-click=\"unselectItem(item)\" ng-disabled=\"disabled\">\n        " + itemTpl + "\n        <span class=\"glyphicon glyphicon-remove\" ></span>\n      </a>\n    </div>\n\n    <input ng-keydown=\"onkeys($event)\"\n           fs-null-form\n           ng-disabled=\"disabled\"\n           fs-input\n           fs-hold-focus\n           fs-on-focus=\"active = true\"\n           fs-on-blur=\"active = false\"\n           fs-blur-when=\"!active\"\n           fs-down='listInterface.move(1)'\n           fs-up='listInterface.move(-1)'\n           fs-pgup='listInterface.move(-11)'\n           fs-pgdown='listInterface.move(11)'\n           fs-enter='selectItem(listInterface.selectedItem)'\n           fs-esc='active = false'\n           class=\"form-control\"\n           type=\"text\"\n           placeholder='Select something'\n           ng-model=\"search\" />\n\n    <div ng-if=\"active && dropdownItems.length > 0\" class=\"open\">\n      <div fs-list items=\"dropdownItems\">\n        " + itemTpl + "\n      </div>\n    </div>\n  </div>\n</div>";
        },
        controller: function($scope, $element, $attrs, $filter) {
          if ($scope.freetext) {
            $scope.dynamicItems = function() {
              if ($scope.search) {
                return [$scope.search];
              } else {
                return [];
              }
            };
          } else {
            $scope.dynamicItems = function() {
              return [];
            };
          }
          $scope.updateDropdownItems = function() {
            var allItems, excludeFilter, searchFilter;
            searchFilter = $filter('filter');
            excludeFilter = $filter('exclude');
            allItems = $scope.items.concat($scope.dynamicItems());
            return $scope.dropdownItems = searchFilter(excludeFilter(allItems, $scope.selectedItems), $scope.search);
          };
          $scope.selectItem = function(item) {
            if ((item != null) && indexOf($scope.selectedItems, item) === -1) {
              $scope.selectedItems = $scope.selectedItems.concat([item]);
            }
            return $scope.search = '';
          };
          $scope.unselectItem = function(item) {
            var index;
            index = indexOf($scope.selectedItems, item);
            if (index > -1) {
              return $scope.selectedItems.splice(index, 1);
            }
          };
          $scope.listInterface = {
            onSelect: function(selectedItem) {
              return $scope.selectItem(selectedItem);
            },
            move: function() {
              return console.log("not-implemented listInterface.move() function");
            }
          };
          $scope.dropdownItems = [];
          $scope.active = false;
          $scope.$watchCollection('selectedItems', function() {
            return $scope.updateDropdownItems();
          });
          $scope.$watchCollection('items', function() {
            return $scope.updateDropdownItems();
          });
          $scope.$watch('search', function() {
            return $scope.updateDropdownItems();
          });
          return $scope.updateDropdownItems();
        },
        link: function($scope, element, attrs, ngModelCtrl, transcludeFn) {
          var setViewValue;
          if (ngModelCtrl) {
            setViewValue = function(newValue, oldValue) {
              if (!angular.equals(newValue, oldValue)) {
                return ngModelCtrl.$setViewValue(newValue);
              }
            };
            $scope.$watch('selectedItems', setViewValue, true);
            return ngModelCtrl.$render = function() {
              return $scope.selectedItems = ngModelCtrl.$modelValue || [];
            };
          }
        }
      };
    }
  ]);

}).call(this);
