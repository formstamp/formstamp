(function() {
  var difference, hash_key;

  hash_key = function(item) {
    return angular.toJson(item);
  };

  difference = function(a, b) {
    var b_element, hash, _i, _len;
    if (!(b && a)) {
      return a;
    }
    hash = {};
    for (_i = 0, _len = b.length; _i < _len; _i++) {
      b_element = b[_i];
      hash[hash_key(b_element)] = true;
    }
    return a.filter((function(a_element) {
      return !hash[hash_key(a_element)];
    }));
  };

  angular.module('formstamp').filter('exclude', function() {
    return function(input, selected) {
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
          invalid: '=',
          items: '=',
          keyAttr: '@',
          valueAttr: '@',
          disabled: '@',
          freetext: '@',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        transclude: true,
        templateUrl: "/templates/multiselect.html",
        controller: function($scope, $element, $attrs, $filter) {
          var keyAttr, valueAttr;
          if ($scope.freetext) {
            $scope.getItemLabel = function(item) {
              return item;
            };
            $scope.getItemValue = function(item) {
              return item;
            };
            $scope.dynamicItems = function() {
              if ($scope.search) {
                return [$scope.search];
              } else {
                return [];
              }
            };
          } else {
            valueAttr = function() {
              return $scope.valueAttr || "label";
            };
            keyAttr = function() {
              return $scope.valueAttr || "id";
            };
            $scope.getItemLabel = function(item) {
              return item && item[valueAttr()];
            };
            $scope.getItemValue = function(item) {
              return item && item[keyAttr()];
            };
            $scope.dynamicItems = function() {
              return [];
            };
          }
          $scope.dropdownItems = function() {
            var allItems, excludeFilter, searchFilter;
            searchFilter = $filter('filter');
            excludeFilter = $filter('exclude');
            allItems = $scope.items.concat($scope.dynamicItems());
            return searchFilter(excludeFilter(allItems, $scope.selectedItems), $scope.search);
          };
          $scope.selectItem = function(item) {
            if ((item != null) && indexOf($scope.selectedItems, item) === -1) {
              $scope.selectedItems.push(item);
            }
            $scope.search = "";
            return $scope.highlightIndex = 0;
          };
          $scope.unselectItem = function(item) {
            var index;
            index = indexOf($scope.selectedItems, item);
            if (index > -1) {
              return $scope.selectedItems.splice(index, 1);
            }
          };
          $scope.move = function(d) {
            var filteredItems;
            filteredItems = $scope.dropdownItems();
            $scope.highlightIndex += d;
            if ($scope.highlightIndex === -1) {
              $scope.highlightIndex = filteredItems.length - 1;
            }
            if ($scope.highlightIndex >= filteredItems.length) {
              return $scope.highlightIndex = 0;
            }
          };
          $scope.getHighlightedItem = function() {};
          $scope.onEnter = function(event) {
            var highlightedItem;
            highlightedItem = $scope.dropdownItems()[$scope.highlightIndex];
            $scope.selectItem($scope.highlightedItem);
            return false;
          };
          $scope.onPgup = function(event) {
            $scope.move(-11);
            return false;
          };
          $scope.onPgdown = function(event) {
            $scope.move(11);
            return false;
          };
          $scope.$watch('search', function() {
            return $scope.highlightIndex = 0;
          });
          $scope.selectedItems = [];
          $scope.active = false;
          return $scope.highlightIndex = 0;
        },
        link: function($scope, element, attrs, ngModelCtrl, transcludeFn) {
          var setViewValue;
          if (ngModelCtrl) {
            setViewValue = function(newValue, oldValue) {
              if (!angular.equals(newValue, oldValue)) {
                return ngModelCtrl.$setViewValue($scope.selectedItems);
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
