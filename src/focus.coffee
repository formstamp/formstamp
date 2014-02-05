angular.module("angular-w").directive "wFocus", ->
  focuz = (el)->
    window.setTimeout((()-> el.focus()) , 0)

  link: (scope, element, attrs) ->
    scope.$watch attrs.wFocus, (fcs)->
      focuz(element[0]) if fcs
