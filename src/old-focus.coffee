angular.module("formstamp").directive "fsOldFocus", ->
  focuz = (el)->
    window.setTimeout((()-> el.focus()) , 0)

  link: (scope, element, attrs) ->
    scope.$watch attrs.fsFocus, (fcs)->
      focuz(element[0]) if fcs?
