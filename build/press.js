(function() {
  var directiveFactory, keyCodes;

  keyCodes = {
    Tab: 9,
    Enter: 13,
    Esc: 27,
    Pgup: 33,
    Pgdown: 34,
    Up: 38,
    Down: 40
  };

  directiveFactory = function(keyCode, dirName) {
    return [
      '$parse', function($parse) {
        return {
          restrict: 'A',
          link: function(scope, element, attr) {
            var fn;
            fn = $parse(attr[dirName]);
            return element.on('keydown', function(event) {
              if (event.keyCode === keyCode) {
                return scope.$apply(function() {
                  return fn(scope, {
                    $event: event
                  });
                });
              }
            });
          }
        };
      }
    ];
  };

  angular.forEach(keyCodes, function(keyCode, keyName) {
    var dirName;
    dirName = 'w' + keyName;
    return angular.module('angular-w').directive(dirName, directiveFactory(keyCode, dirName));
  });

}).call(this);
