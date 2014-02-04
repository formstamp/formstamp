angular
.module('angular-w')
.directive('wPopup', ['$rootScope', "$compile", 'wPopupManager', ($rootScope, $compile, popupManager)->
  restrict: 'E'
  scope: {}
  compile: (tElement, tAttrs)->
    content = "<div>#{tElement.html().trim()}</div>"
    tElement.empty()
    popupLinkFn = $compile(angular.element(content))
    popupManager.add tAttrs.name, popupLinkFn
    $rootScope.popup = popupManager unless $rootScope.popup?

    return (scope, element, attrs)->
      element.remove()
]).factory('wPopupManager', ['$document', '$rootScope', ($document, $rootScope)->
  attachTo = undefined
  currentPopup = undefined
  documentClickBind = (event)->
    if event.target isnt attachTo
      $rootScope.$apply ->
        $rootScope.popup.hide()

  popups: {}
  add: (name, popup)->
    @popups[name] = popup
  show: (name, target)->
    popupLinkFn = @popups[name]
    return unless popupLinkFn
    attachTo = target
    attachToElement = angular.element(attachTo)
    attachToScope = attachToElement.scope()
    currentPopup = popupLinkFn(attachToScope)
    currentPopup.bind 'click', (event)->
      event.preventDefault()
      event.stopPropagation()
    attachToElement.after(currentPopup)
    $document.bind('click', documentClickBind)
    return
  hide: ->
    $document.unbind('click', documentClickBind)
    currentPopup?.remove()
    return
])
