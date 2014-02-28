angular
.module("formstamp")
.directive "fsNullForm", ->
  restrict: "A"
  controller: ($element)->
    noop = ->
    nullFormCtrl =
      $addControl: noop # ()-> console.log('fsNullForm', $element, '$addControl', arguments)
      $removeControl: noop
      $setValidity: noop
      $setDirty: noop
      $setPristine: noop

    $element.data('$formController', nullFormCtrl)
