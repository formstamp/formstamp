angular
.module("formstamp")
.directive "fsTime", ['$compile', ($compile) ->
  restrict: "A"
  scope:
    disabled: '=ngDisabled'
    class: '@'
  require: '?ngModel'
  replace: true
  template: (el)->
    hours = (num for num in [0..23])
    minutes = ['00','15','30','45']
    res = []
    for h in hours
      zh = if h < 10 then "0#{h}" else h
      for m in minutes
        res.push "<option value='#{zh}:#{m}'/>"

    datalistId = "fsTimeDatalist_#{nextUid()}"
    timeoptions = res.join('')

    """
    <div class="fs-time fs-widget-root">
      <input
        fs-null-form
        ng-model="value"
        fs-time-format
        class="form-control"
        ng-disabled="disabled"
        list="#{datalistId}"
        type="text"/>
      <span class="glyphicon glyphicon-time"></span>
      <datalist id="#{datalistId}">
      #{timeoptions}
      </datalist>
    </div>
    """
  link: (scope, element, attrs, ngModelCtrl) ->

    if ngModelCtrl
      scope.$watch 'value', (newValue, oldValue) ->
        unless equalsTime(newValue, oldValue)
          updatedDate = updateDate(oldValue, newValue)
          ngModelCtrl.$setViewValue(updatedDate)

      ngModelCtrl.$render = ->
        scope.value = ngModelCtrl.$viewValue
]
