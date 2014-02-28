(function() {
  angular.module('formstamp').directive('fsFormFor', [
    '$window', function($window) {
      return {
        restrict: 'AE',
        template: function(el, attrs) {
          var html, modelName, replacer;
          modelName = el.attr("model");
          replacer = function() {
            var attr, attributes, input, inputFunc, name, type;
            input = $(this);
            name = input.attr("name");
            type = input.attr("as");
            attributes = ((function() {
              var _i, _len, _ref, _results;
              _ref = input.prop("attributes");
              _results = [];
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                attr = _ref[_i];
                _results.push("" + attr.name + "=\"" + attr.value + "\"");
              }
              return _results;
            })()).join(' ');
            if (type.indexOf("fs-") === 0) {
              inputFunc = function(attrs) {
                return "<div " + type + " " + attrs + " ng-model=\"" + modelName + "." + name + "\" name=\"" + name + "\"></div>";
              };
            } else {
              inputFunc = function(attrs) {
                return "<input type=\"" + type + "\" " + attrs + " class=\"form-control\" ng-model=\"" + modelName + "." + name + "\" name=\"" + name + "\" />";
              };
            }
            return "<div class=\"form-group\" ng-class=\"{'has-error': (form." + name + ".$dirty && form." + name + ".$invalid)}\">\n  <label class=\"col-sm-2 control-label\">" + name + "</label>\n  <div class=\"col-sm-10\">\n    <!-- < type=\"" + type + "\" " + type + " ng-model=\"" + modelName + "." + name + "\" name=\"" + name + "\"></> -->\n    " + (inputFunc(attributes)) + "\n  </div>\n</div>";
          };
          html = el.find("fs-input").replaceWith(replacer).end().html();
          html = "<form name='form' class='form-horizontal' novalidate>\n  " + html + "\n</form>";
          console.log(html);
          return html;
        }
      };
    }
  ]);

}).call(this);
