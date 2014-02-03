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
        scope.isPopupVisible = false
]).directive('wPopup', ['$document', ($document)->
  restrict: 'A'
  link: (scope, element, attrs)->
    getPopup = ->
      for el in $document.find("div")
        popup = angular.element(el)
        if popup.attr('name') == attrs.wPopup
          return popup
    element.on 'focus', ->
      scope.$apply ->
        popupScope = getPopup().isolateScope()
        popupScope.showPopup(element[0])
        scope.hidePopup = popupScope.hidePopup
])
