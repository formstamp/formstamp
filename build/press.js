(function() {
  var directiveFactory, keyCodes;

  keyCodes = {
    Tab: 9,
    ShiftTab: 9,
    Enter: 13,
    Esc: 27,
    Pgup: 33,
    Pgdown: 34,
    Up: 38,
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
              console.log(event.keyCode);
              if (event.keyCode === keyCode && event.shiftKey === shift) {
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
    var dirName, shift;
    dirName = 'w' + keyName;
    shift = keyName.indexOf('Shift') !== -1;
    return angular.module('angular-w').directive(dirName, directiveFactory(keyCode, dirName, shift));
  });

}).call(this);
