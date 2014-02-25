angular
.module('formstamp')
.directive('fsPopup', ['$rootScope', "$compile", 'fsPopupManager', ($rootScope, $compile, popupManager)->
  restrict: 'E'
  compile: (tElement, tAttrs)->
    content = "#{tElement.html().trim()}"
    tElement.remove()
    popupManager.add tAttrs.name, content
]).factory('fsPopupManager', ['$document', '$compile', '$rootScope', ($document, $compile, $rootScope)->
  attachTo = undefined
  currentPopup = undefined
  documentClickBind = (event)->
    if event.target isnt attachTo
      $rootScope.$apply ->
        $rootScope.popup.hide()

  popupManager =
    popups: {}
    add: (name, popup)->
      @popups[name] = popup
    show: (name, target)->
      @hide()
      popupContent = @popups[name]
      return unless popupContent?
      attachTo = target
      attachToElement = angular.element(attachTo)
      attachToScope = attachToElement.scope()
      popupElement = angular.element("<div>#{popupContent}</div>")
      currentPopup = $compile(popupElement)(attachToScope)
      currentPopup.bind 'click', (event)->
        event.preventDefault()
        event.stopPropagation()
      attachToElement.after(currentPopup)
      $document.bind('click', documentClickBind)
      return
    hide: ->
      $document.unbind('click', documentClickBind)
      currentPopup?.remove()
      currentPopup = attachTo = undefined
      return
  $rootScope.popup = popupManager
])
