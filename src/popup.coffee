angular
.module('angular-w').directive('wPopup', ["$compile", ($compile)->
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
    contentLinkFn = $compile(angular.element(content)[0])
    return (originalScope, element)->
      originalScope.isPopupVisible = false
      childScope = originalScope.$new()
      linkedContent = contentLinkFn(childScope)
      element.append(linkedContent)
      originalScope.$on '$destroy', ->
        linkedContent.remove();
        childScope.$destroy();
      originalScope.showPopup = (attachTo)->
        originalScope.isPopupVisible = true
]).directive('wPopup', ['$document', ($document)->
  restrict: 'A'
  link: (scope, element, attrs)->
    element.on 'focus', ->
      for el in $document.find("div")
        popup = angular.element(el)
        if popup.attr('name') == attrs.wPopup
          popup.isolateScope().$apply (scope)->
            scope.showPopup(element)
          break
])
