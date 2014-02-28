(function() {
  angular.module("formstamp").directive("fsTime", [
    '$compile', function($compile) {
      return {
        restrict: "A",
        scope: {
          disabled: '=ngDisabled',
          "class": '@'
        },
        require: '?ngModel',
        replace: true,
        template: function(el) {
          var h, hours, m, minutes, num, res, timeoptions, zh, _i, _j, _len, _len1;
          hours = (function() {
            var _i, _results;
            _results = [];
            for (num = _i = 0; _i <= 23; num = ++_i) {
              _results.push(num);
            }
            return _results;
          })();
          minutes = ['00', '15', '30', '45'];
          res = [];
          for (_i = 0, _len = hours.length; _i < _len; _i++) {
            h = hours[_i];
            zh = h < 10 ? "0" + h : h;
            for (_j = 0, _len1 = minutes.length; _j < _len1; _j++) {
              m = minutes[_j];
              res.push("<option value='" + zh + ":" + m + "'/>");
            }
          }
          timeoptions = res.join('');
          return "<div class=\"fs-time fs-widget-root\">\n  <input\n    fs-null-form\n    ng-model=\"value\"\n    class=\"form-control\"\n    ng-disabled=\"disabled\"\n    list=\"time\"\n    type=\"text\"/>\n  <span class=\"glyphicon glyphicon-time\"></span>\n  <datalist id=\"time\">\n  " + timeoptions + "\n  </datalist>\n</div>";
        },
        controller: function($scope, $element, $attrs, $filter, $timeout) {
          var patterns;
          patterns = [/^[012]/, /^([0-1][0-9]|2[0-3]):?/, /^([0-1][0-9]|2[0-3]):?[0-5]/, /^([0-1][0-9]|2[0-3]):?([0-5][0-9])/];
          return $scope.$watch('value', function(ev) {
            var p, res, value, _i, _len;
            if ($scope.value == null) {
              return;
            }
            value = '';
            for (_i = 0, _len = patterns.length; _i < _len; _i++) {
              p = patterns[_i];
              res = $scope.value.match(p);
              if (res) {
                value = res[0];
              }
            }
            if (value.length > 2) {
              value = value.replace(/^(\d\d)([^:]*)$/, "$1:$2");
            }
            return $scope.value = value;
          });
        },
        link: function(scope, element, attrs, ngModelCtrl, transcludeFn) {
          var toTimeStr, updateTime;
          toTimeStr = function(date) {
            var h, m;
            if (date == null) {
              return '';
            }
            h = date.getHours().toString();
            if (h.length < 2) {
              h = "0" + h;
            }
            m = date.getMinutes().toString();
            if (m.length < 2) {
              m = "0" + m;
            }
            return "" + h + ":" + m;
          };
          updateTime = function(date, timeStr) {
            var parts;
            if ((date != null) && date.length > 0) {
              console.log(date);
              parts = timeStr.split(':');
              if (parts[0] != null) {
                date.setHours(parts[0]);
              }
              if (parts[1] != null) {
                date.setMinutes(parts[1]);
              }
            }
            return date;
          };
          if (ngModelCtrl) {
            scope.$watch('value', function(newValue, oldValue) {
              var date;
              if (newValue !== oldValue) {
                date = ngModelCtrl.$viewValue || (attrs['withDate'] && new Date());
                return ngModelCtrl.$setViewValue(updateTime(date, newValue));
              }
            });
            return ngModelCtrl.$render = function() {
              return scope.value = toTimeStr(ngModelCtrl.$viewValue);
            };
          }
        }
      };
    }
  ]);

}).call(this);
