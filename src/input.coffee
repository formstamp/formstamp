widgetRoot = (el) ->
  currentEl = el

  while (currentEl && currentEl.className? && currentEl.className.indexOf("w-widget-root") < 0)
    currentEl = currentEl.parentNode

  return currentEl

angular
.module("formstamp")
.directive "wInput", ['$window', '$timeout', ($window, $timeout) ->
    restrict: "A"
    link: (scope, element, attrs) ->
      focusElement = () -> setTimeout((-> element[0].focus()), 0)

      if attrs["wFocusWhen"]?
        scope.$watch attrs["wFocusWhen"], (newValue) ->
          focusElement() if newValue

      if attrs["wBlurWhen"]?
        scope.$watch attrs["wBlurWhen"], (newValue) ->
          focusElement() if newValue

      if attrs["wOnFocus"]?
        element.on 'focus', (event) ->
          scope.$apply(attrs["wOnFocus"])

      if attrs["wOnBlur"]?
        element.on 'blur', (event) ->
          scope.$apply(attrs["wOnBlur"])

      if attrs["wHoldFocus"]?
        wRoot = $(element).parents(".w-widget-root").first()
        wRoot.on "mousedown", (event) ->
          if event.target != element.get(0)
            event.preventDefault()
            false
          else
            true
]
