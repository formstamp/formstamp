angular
.module('angular-w').directive('wPopup', [()->
  restrict: 'E'
  replace: true
  transclude: true
  scope: {'name': '='}
  template: '<div ng-show="isPopupVisible" ng-transclude></div>'
  link: (scope, element)->
    scope.isPopupVisible = false
    element.attr('name', scope.name)
]).directive('wPopup', ['$document', ($document)->
  restrict: 'A'
  link: (scope, element, attrs)->
    element.on 'focus', ->
      for el in $document.find("div")
        element = angular.element(el)
        if element.attr('name') == attrs.wPopup
          console.log('element', el)
          element.isolateScope().$apply (scope)->
            scope.isPopupVisible = true
            #scope.$apply()
          break
])