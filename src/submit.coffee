angular
.module("formstamp")
.directive "fsSubmit", ['$parse', ($parse) ->
  restrict: "A"
  require: '?form'
  link: (scope, element, attr, controller) ->
    fn = $parse(attr.fsSubmit)
    element.bind 'submit', (event) ->
      scope.$apply ->
        if !controller or controller.$valid
          fn(scope, {$event:event})
        else
          controller.$setDirty()
]
