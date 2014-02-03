angular
.module('angular-w')
.directive('wPopup', ["$document", "$compile", ($document, $compile)->
  restrict: 'E'
  replace: true
  template: (tElement, tAttrs)->
    content = tElement.html()
    """
    <div>
      #{content}
    </div>
    """
  compile: (tElement, tAttrs)->
    content = tElement.html().trim()
    tElement.empty()
    tElement.bind 'click', (event)->
      event.preventDefault()
      event.stopPropagation()
    contentLinkFn = $compile(angular.element(content)[0])
    return (originalScope, element)->
      childScope = originalScope.$new()
      childScope.isPopupVisible = false
      linkedContent = contentLinkFn(childScope)
      element.append(linkedContent)
      documentClickBind = (event)->
        if childScope.isPopupVisible and
           event.target isnt childScope.attachTo
          originalScope.$apply ->
            childScope.isPopupVisible = false
      childScope.$watch 'isPopupVisible', (isPopupVisible)->
        if isPopupVisible
          # updatePosition();
          $document.bind('click', documentClickBind)
          element.css("display", "")
        else
          $document.unbind('click', documentClickBind)
          element.css("display", "none")
      originalScope.$on '$destroy', ->
        linkedContent.remove();
        childScope.$destroy();
      originalScope.showPopup = (attachTo)->
        childScope.isPopupVisible = true
        #FIXME: Copy element to scope is a evil.
        childScope.attachTo = attachTo
]).directive('wPopup', ['$document', ($document)->
  restrict: 'A'
  link: (scope, element, attrs)->
    element.on 'focus', ->
      for el in $document.find("div")
        popup = angular.element(el)
        if popup.attr('name') == attrs.wPopup
          # popup.isolateScope().$apply (scope)->
          popup.scope().$apply (scope)->
            scope.showPopup(element[0])
          break
])
