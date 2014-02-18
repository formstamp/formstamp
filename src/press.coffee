# it should be one directive
keyCodes =
  Tab:    9
  Enter:  13
  Esc:    27
  Pgup:   33
  Pgdown: 34
  Up:     38
  Down:   40

directiveFactory = (keyCode, dirName) ->
  ['$parse', ($parse) ->
    restrict: 'A'
    link: (scope, element, attr) ->
      fn = $parse(attr[dirName])
      element.on 'keydown', (event) ->
        if event.keyCode == keyCode
          scope.$apply ->
            fn(scope, $event: event)
  ]

angular.forEach keyCodes, (keyCode, keyName) ->
  dirName = 'w' + keyName
  angular.module('angular-w').directive(dirName, directiveFactory(keyCode, dirName))
