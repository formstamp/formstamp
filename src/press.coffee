# it should be one directive
keyCodes =
  Tab:      9
  ShiftTab: 9
  Enter:    13
  Esc:      27
  Pgup:     33
  Pgdown:   34
  Left:     37
  Up:       38
  Right:    39
  Down:     40
  Space:    32

directiveFactory = (keyCode, dirName, shift) ->
  ['$parse', ($parse) ->
    restrict: 'A'
    link: (scope, element, attr) ->
      fn = $parse(attr[dirName])
      element.on 'keydown', (event) ->
        if event.keyCode == keyCode and event.shiftKey == shift
          scope.$apply ->
            fn(scope, $event: event)
  ]

angular.forEach keyCodes, (keyCode, keyName) ->
  dirName = 'w' + keyName
  shift = keyName.indexOf('Shift') != -1
  angular.module('angular-w').directive(dirName, directiveFactory(keyCode, dirName, shift))
