mod = require('./module')

require('../styles/racheck.less')
u = require('./utils')

tpl = require('html!../templates/metaRadio.html')

mod.directive "fsRadio", ->
    restrict: "A"
    scope:
      required: '='
      disabled: '=ngDisabled'
      items: '='
      inline: '='
      keyAttr: '@'
      valueAttr: '@'
    require: '?ngModel'
    template: (el, attrs)->
      itemTpl = el.html() || '{{item.label}}'
      name = "fsRadio_#{u.nextUid()}"

      template = tpl
        .replace(/::name/g,name)
        .replace(/::itemTpl/g, itemTpl)

    link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
      if ngModelCtrl
        scope.$watch 'selectedItem', (newValue, oldValue)->
          unless newValue is oldValue
            ngModelCtrl.$setViewValue(scope.selectedItem)

        ngModelCtrl.$render = ->
          scope.selectedItem = ngModelCtrl.$modelValue
