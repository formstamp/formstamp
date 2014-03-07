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

  controller: ($scope, $element, $attrs, $filter, $timeout) ->
    patterns = [
      /^[012]/
      /^([0-1][0-9]|2[0-3]):?/
      /^([0-1][0-9]|2[0-3]):?[0-5]/
      /^([0-1][0-9]|2[0-3]):?([0-5][0-9])/
    ]

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    toTimeStr = (date)->
      return '' unless date?
      h = date.getHours().toString()
      h = "0#{h}" if h.length < 2
      m = date.getMinutes().toString()
      m = "0#{m}" if m.length < 2
      "#{h}:#{m}"

    if ngModelCtrl
      scope.$watch 'value', (newValue, oldValue) ->
        if toTimeStr(newValue) isnt toTimeStr(oldValue)
          date = ngModelCtrl.$viewValue || (attrs['withDate'] && new Date())
          ngModelCtrl.$setViewValue(updateDate(newValue, date))

      ngModelCtrl.$render = ->
        scope.value = ngModelCtrl.$viewValue
]
