angular.module("angular-w").directive "wHoldFocus", ($timeout) ->
  widgetRoot = (el) ->
    currentEl = el

    while (currentEl && currentEl.className.indexOf("w-widget-root") < 0)
      currentEl = currentEl.parentNode

    return currentEl

  link: (scope, element, attrs) ->
    element.on 'focus', (event) ->
      scope.$apply(attrs["wHoldFocus"])

    element.on 'blur', (event) ->
      oldWidgetRoot = widgetRoot(event.srcElement)
      newWidgetRoot = widgetRoot(event.relatedTarget)

      if event.relatedTarget && newWidgetRoot != null && oldWidgetRoot == newWidgetRoot
        setTimeout((-> element[0].focus()), 0)
      else
        scope.$apply(attrs["wHoldFocusBlur"])
