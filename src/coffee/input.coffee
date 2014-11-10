angular
.module("formstamp")
.directive "fsInput", ['$parse', ($parse) ->
  restrict: "A"
  link: (scope, element, attrs) ->
    focusElement = () -> setTimeout((-> element[0].focus()), 0)
    blurElement = () -> setTimeout((-> element[0].blur()), 0)

    keyCodes =
      Tab:       9
      ShiftTab:  9
      Enter:     13
      Esc:       27
      PgUp:      33
      PgDown:    34
      Left:      37
      Up:        38
      Right:     39
      Down:      40
      Space:     32
      Backspace: 8

    if attrs["fsFocusWhen"]?
      scope.$watch attrs["fsFocusWhen"], (newValue) ->
        focusElement() if newValue

    if attrs["fsBlurWhen"]?
      scope.$watch attrs["fsBlurWhen"], (newValue) ->
        blurElement() if newValue

    if attrs["fsOnFocus"]?
      element.on 'focus', (event) ->
        scope.$apply(attrs["fsOnFocus"])

    if attrs["fsOnBlur"]?
      element.on 'blur', (event) ->
        scope.$apply(attrs["fsOnBlur"])

    if attrs["fsHoldFocus"]?
      fsRoot = $(element).parents(".fs-widget-root").first()

      fsRoot.on "mousedown", (event) ->
        if event.target != element.get(0)
          event.preventDefault()
          false
        else
          true

    # process key bindings, if any
    # TODO: single event listener with dispatching
    angular.forEach keyCodes, (keyCode, keyName) ->
      attrName = 'fs' + keyName
      if attrs[attrName]?
        shift = keyName.indexOf('Shift') != -1
        callbackExpr = $parse(attrs[attrName])
        element.on 'keydown', (event) ->
          if event.keyCode == keyCode and event.shiftKey == shift
            event.preventDefault() unless scope.$apply(-> callbackExpr(scope, $event: event))

]
