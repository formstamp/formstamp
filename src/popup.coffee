angular
.module('angular-w').directive('wPopup', [()->
  restrict: 'E'
  replace: true
  transclude: true
  scope: {'name': '='}
  template: '<div ng-show="isPopupVisible" ng-transclude></div>'
  link: (scope, element)->
    scope.isPopupVisible = false
    scope.showPopup = (attachTo)->
      scope.isPopupVisible = true
    element.attr('name', scope.name)
]).directive('wPopup', ['$document', ($document)->
  restrict: 'A'
  link: (scope, element, attrs)->
    element.on 'focus', ->
      for el in $document.find("div")
        popup = angular.element(el)
        if popup.attr('name') == attrs.wPopup
          console.log('element', el)
          popup.isolateScope().$apply (scope)->
            scope.showPopup(element)
          break
])