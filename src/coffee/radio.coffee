mod = require('./module')

require('../styles/racheck.less')

mod.directive "fsRadio", ['$window', ($window) ->
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
      name = "fsRadio_#{nextUid()}"

      template = """
<div class='fs-widget-root fs-radio fs-racheck' ng-class="{disabled: disabled, enabled: !disabled}">
  <div class="fs-radio-item"
     ng-repeat="item in items" >
    <input
     fs-null-form
     type="radio"
     ng-model="$parent.selectedItem"
     name="#{name}"
     ng-value="item"
     ng-disabled="disabled"
     id="#{name}_{{$index}}" />

    <label for="#{name}_{{$index}}">
      <span class='fs-radio-btn'><span></span></span>

      #{itemTpl}
    </label>
  </div>
</div>
      """
    link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
      if ngModelCtrl
        scope.$watch 'selectedItem', (newValue, oldValue)->
          unless newValue is oldValue
            ngModelCtrl.$setViewValue(scope.selectedItem)

        ngModelCtrl.$render = ->
          scope.selectedItem = ngModelCtrl.$modelValue
]
