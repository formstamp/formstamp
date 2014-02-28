(function() {
  angular.module('formstamp').directive('fsErrors', function() {
    return {
      restrict: 'A',
      scope: {
        model: '='
      },
      replace: true,
      template: "<ul class='text-danger fs-errors' ng-show='model.$dirty && messages && messages.length > 0'>\n  <li ng-repeat='msg in messages'>{{ msg }}</li>\n</ul>",
      controller: function($scope) {
        var errorsWatcher, makeMessage;
        makeMessage = function(idn) {
          return "Error happened: " + idn;
        };
        errorsWatcher = function(newErrors) {
          var errorIdn, occured;
          return $scope.messages = (function() {
            var _results;
            _results = [];
            for (errorIdn in newErrors) {
              occured = newErrors[errorIdn];
              if (occured) {
                _results.push(makeMessage(errorIdn));
              }
            }
            return _results;
          })();
        };
        return $scope.$watch('model.$error', errorsWatcher, true);
      }
    };
  });

  angular.module('formstamp').directive('fsFormFor', function() {
    return {
      restrict: 'AE',
      template: function(el, attrs) {
        var html, inputReplacer, modelName, rowReplacer;
        modelName = el.attr("model");
        inputReplacer = function() {
          var attr, attributes, input, inputEl, label, name, type, _i, _len, _ref, _ref1;
          input = $(this);
          name = input.attr("name");
          type = input.attr("as");
          label = (_ref = input.attr("label")) != null ? _ref : name;
          attributes = {};
          _ref1 = input.prop("attributes");
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            attr = _ref1[_i];
            attributes[attr.name] = attr.value;
          }
          attributes['ng-model'] = "" + modelName + "." + name;
          attributes['name'] = name;
          delete attributes['as'];
          if (type.indexOf("fs-") === 0) {
            attributes[type] = true;
            inputEl = $("<div />", attributes);
            inputEl.html(input.html());
          } else {
            attributes['type'] = type;
            attributes['class'] = 'form-control';
            inputEl = $("<input />", attributes);
          }
          return "<div class=\"form-group\" ng-class=\"{'has-error': (form." + name + ".$dirty && form." + name + ".$invalid)}\">\n  <label class=\"col-sm-2 control-label\">" + label + "</label>\n  <div class=\"col-sm-10\">\n    " + (inputEl.get(0).outerHTML) + "\n    <div fs-errors model=\"form." + name + "\"></div>\n  </div>\n</div>";
        };
        rowReplacer = function() {
          var label, row;
          row = $(this);
          label = row.attr("label");
          return "<div class=\"form-group\">\n  <label class=\"col-sm-2 control-label\">" + label + "</label>\n  <div class=\"col-sm-10\">\n    " + (row.get(0).outerHTML) + "\n  </div>\n</div>";
        };
        html = el.find("fs-input").replaceWith(inputReplacer).end().find("fs-row").replaceWith(rowReplacer).end().html();
        return "<form name='form' class='form-horizontal' novalidate>\n  " + html + "\n</form>";
      }
    };
  });

}).call(this);
