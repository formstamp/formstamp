angular
.module('angular-w')
.directive('wPopup', ["$document", "$compile", ($document, $compile)->
  restrict: 'E'
  scope: {}
  replace: true
  template: (tElement, tAttrs)->
    content = tElement.html()
    """
    <div ng-show="isPopupVisible">
      #{content}
    </div>
    """
  compile: (tElement, tAttrs)->
    content = tElement.html().trim()
    tElement.empty()
    tElement.bind 'click', (event)->
      event.preventDefault()
      event.stopPropagation()
    contentLinkFn = $compile(angular.element(content))
    return (scope, element)->
      scope.isPopupVisible = false
      linkedContent = contentLinkFn(scope.$parent)
      element.append(linkedContent)
      documentClickBind = (event)->
        if scope.isPopupVisible and
        event.target isnt scope.attachTo
          scope.$apply ->
            scope.isPopupVisible = false
      scope.$watch 'isPopupVisible', (isPopupVisible)->
        if isPopupVisible
          # updatePosition();
          $document.bind('click', documentClickBind)
        else
          $document.unbind('click', documentClickBind)
      scope.showPopup = (attachTo)->
        scope.isPopupVisible = true
        #FIXME: Copy element to scope is a evil.
        scope.attachTo = attachTo
      scope.hidePopup = ->
        console.log('hide popup')
        scope.isPopupVisible = false
]).directive('wPopup', ['$document', ($document)->
  restrict: 'A'
  scope: {}
  link: (scope, element, attrs)->
    getPopup = ->
      for el in $document.find("div")
        popup = angular.element(el)
        if popup.attr('name') == attrs.wPopup
          return popup

    popupCommand = (command, args...)->
      popupScope = getPopup().isolateScope()
      popupScope[command].apply(popupScope, args)

    scope.showPopup = (attachTo)->
      popupCommand('showPopup', attachTo)

    scope.hidePopup = ->
      popupCommand('hidePopup')

    element.on 'focus', ->
      scope.$apply ->
        scope.showPopup(element[0])

])
