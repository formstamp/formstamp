angular
.module("formstamp")
.directive "wSubmit", ['$parse', ($parse) ->
  restrict: "A"
  require: '?form'
  link: (scope, element, attr, controller) ->
    fn = $parse(attr.wSubmit)
    element.bind 'submit', (event) ->
      scope.$apply ->
        if !controller or controller.$valid
          fn(scope, {$event:event})
        else
          controller.$setDirty()
]
