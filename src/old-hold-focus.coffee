angular.module("angular-w").directive "wOldHoldFocus", ($timeout) ->
  widgetRoot = (el) ->
    currentEl = el

    while (currentEl && currentEl.className? && currentEl.className.indexOf("w-widget-root") < 0)
      currentEl = currentEl.parentNode

    return currentEl

  link: (scope, element, attrs) ->
    focusElement = () -> setTimeout((-> element[0].focus()), 0)

    if attrs["wHoldFocusWhen"]?
      scope.$watch attrs["wHoldFocusWhen"], (newValue) ->
        focusElement() if newValue

    element.on 'focus', (event) ->
      scope.$apply(attrs["wHoldFocus"])

    element.on 'blur', (event) ->
      oldWidgetRoot = widgetRoot(event.srcElement || event.target)
      newWidgetRoot = widgetRoot(event.relatedTarget)

      if event.relatedTarget && newWidgetRoot != null && oldWidgetRoot == newWidgetRoot
        focusElement()
      else
        scope.$apply(attrs["wHoldFocusBlur"])
