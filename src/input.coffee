widgetRoot = (el) ->
  currentEl = el

  while (currentEl && currentEl.className? && currentEl.className.indexOf("fs-widget-root") < 0)
    currentEl = currentEl.parentNode

  return currentEl

angular
.module("formstamp")
.directive "fsInput", ['$window', '$timeout', ($window, $timeout) ->
    restrict: "A"
    link: (scope, element, attrs) ->
      focusElement = () -> setTimeout((-> element[0].focus()), 0)

      if attrs["fsFocusWhen"]?
        scope.$watch attrs["fsFocusWhen"], (newValue) ->
          focusElement() if newValue

      if attrs["fsBlurWhen"]?
        scope.$watch attrs["fsBlurWhen"], (newValue) ->
          focusElement() if newValue

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
]
