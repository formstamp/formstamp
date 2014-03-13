angular
.module("formstamp")
.directive "fsTime", ['$compile', '$filter', ($compile, $filter) ->
  restrict: "A"
  scope:
    disabled: '=ngDisabled'
    class: '@'
  require: '?ngModel'
  replace: true
  template: (el)->

    """
    <div class="fs-time fs-widget-root">
      <input
        fs-null-form
        fs-time-format
        ng-model="value"
        class="form-control"
        ng-disabled="disabled"
        type="text"/>
      <span class="glyphicon glyphicon-time"></span>
      <div fs-list items="dropdownItems">
        {{item}}
      </div>
    </div>
    """
  link: (scope, element, attrs, ngModelCtrl) ->
    hours = (num for num in [0..23])
    minutes = ['00','15','30','45']
    items = []
    for h in hours
      zh = if h < 10 then "0#{h}" else h
      for m in minutes
        items.push "#{zh}:#{m}"

    updateDropdown = () ->
      scope.dropdownItems = $filter('filter')(items, scope.value)
    scope.$watch 'value', (q)-> updateDropdown()

    if ngModelCtrl
      watchFn = (newValue, oldValue) ->
        unless angular.equals(newValue, oldValue)
          ngModelCtrl.$setViewValue(newValue)
      scope.$watch 'value', watchFn

      ngModelCtrl.$render = ->
        scope.value = ngModelCtrl.$viewValue
]
