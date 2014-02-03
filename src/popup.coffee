angular
.module('angular-w')
.directive('wPopup', ["$document", "$compile", ($document, $compile)->
  restrict: 'E'
  scope: {}
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
          element.css("display", "")
        else
          $document.unbind('click', documentClickBind)
          element.css("display", "none")
      scope.showPopup = (attachTo)->
        scope.isPopupVisible = true
        #FIXME: Copy element to scope is a evil.
        scope.attachTo = attachTo
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
