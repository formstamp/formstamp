(function() {
  var nextUid, uid;

  uid = ['0', '0', '0'];

  nextUid = function() {
    var digit, index;
    index = uid.length;
    digit;
    while (index) {
      index -= 1;
      digit = uid[index].charCodeAt(0);
      if (digit === 57) {
        uid[index] = 'A';
        return uid.join('');
      }
      if (digit === 90) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return uid.join('');
      }
    }
    uid.unshift('0');
    return uid.join('');
  };

  angular.module("formstamp").directive("fsRadio", [
    '$window', function($window) {
      return {
        restrict: "A",
        scope: {
          required: '=',
          disabled: '=ngDisabled',
          items: '=',
          inline: '=',
          keyAttr: '@',
          valueAttr: '@'
        },
        require: '?ngModel',
        template: function(el, attrs) {
          var itemTpl, name, template;
          itemTpl = el.html() || '{{item.label}}';
          name = nextUid();
          return template = "<div class='fs-racheck' ng-class=\"{disabled: disabled, enabled: !disabled}\">\n  <div class=\"fs-radio-label\"\n     ng-repeat=\"item in items\" >\n    <input\n     fs-null-form\n     type=\"radio\"\n     ng-model=\"$parent.selectedItem\"\n     name=\"" + name + "\"\n     ng-value=\"item\"\n     ng-disabled=\"disabled\"\n     id=\"{{item.id}}\"/>\n    <label for=\"{{item.id}}\">\n      " + itemTpl + "\n    </label>\n  </div>\n  <p ng-repeat='error in errors' class='text-danger'>{{error}}</p>\n</div>";
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          if (ngModelCtrl) {
            scope.$watch('selectedItem', function(newValue, oldValue) {
              if (newValue !== oldValue) {
                return ngModelCtrl.$setViewValue(scope.selectedItem);
              }
            });
            return ngModelCtrl.$render = function() {
              return scope.selectedItem = ngModelCtrl.$modelValue;
            };
          }
        }
      };
    }
  ]);

}).call(this);
