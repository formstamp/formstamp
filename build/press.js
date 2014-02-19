(function() {
  var directiveFactory, keyCodes;

  keyCodes = {
    Tab: 9,
    ShiftTab: 9,
    Enter: 13,
    Esc: 27,
    Pgup: 33,
    Pgdown: 34,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Space: 32
  };

  directiveFactory = function(keyCode, dirName, shift) {
    return [
      '$parse', function($parse) {
        return {
          restrict: 'A',
          link: function(scope, element, attr) {
            var fn;
            fn = $parse(attr[dirName]);
            return element.on('keydown', function(event) {
              if (event.keyCode === keyCode && event.shiftKey === shift) {
                if (!scope.$apply(function() {
                  return fn(scope, {
                    $event: event
                  });
                })) {
                  return event.preventDefault();
                }
              }
            });
          }
        };
      }
    ];
  };

  angular.forEach(keyCodes, function(keyCode, keyName) {
    var dirName, shift;
    dirName = 'w' + keyName;
    shift = keyName.indexOf('Shift') !== -1;
    return angular.module('angular-w').directive(dirName, directiveFactory(keyCode, dirName, shift));
  });

}).call(this);
