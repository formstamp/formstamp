angular
.module('angular-w')
.directive('wPopup', ["$document", "$compile", ($document, $compile)->
  restrict: 'E'
  scope: {}
  replace: true
  template: (tElement, tAttrs)->
    content = tElement.html()
    """
    <div ng-show='isPopupVisible'>
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
      originalScope.isPopupVisible = false
      childScope = originalScope.$new()
      linkedContent = contentLinkFn(childScope)
      element.append(linkedContent)
      documentClickBind = (event)->
        if originalScope.isPopupVisible and
           event.target isnt originalScope.attachTo
          originalScope.$apply ->
            originalScope.isPopupVisible = false
      originalScope.$watch 'isPopupVisible', (isPopupVisible)->
        if isPopupVisible
          # updatePosition();
          $document.bind('click', documentClickBind)
        else
          $document.unbind('click', documentClickBind)
      originalScope.$on '$destroy', ->
        linkedContent.remove();
        childScope.$destroy();
      originalScope.showPopup = (attachTo)->
        originalScope.isPopupVisible = true
        #FIXME: Copy element to scope is a evil.
        originalScope.attachTo = attachTo
]).directive('wPopup', ['$document', ($document)->
  restrict: 'A'
  link: (scope, element, attrs)->
    element.on 'focus', ->
      for el in $document.find("div")
        popup = angular.element(el)
        if popup.attr('name') == attrs.wPopup
          popup.isolateScope().$apply (scope)->
            scope.showPopup(element[0])
          break
])
