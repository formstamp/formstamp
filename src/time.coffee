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
    timeoptions = res.join('')

    """
    <div class="fs-time fs-widget-root">
      <input
        fs-null-form
        ng-model="value"
        class="form-control"
        ng-disabled="disabled"
        list="time"
        type="text"/>
      <span class="glyphicon glyphicon-time"></span>
      <datalist id="time">
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

    $scope.$watch 'value',(ev)->
      return unless $scope.value?
      value = ''
      for p in patterns
        res = $scope.value.match(p)
        if res
          value = res[0]
      value = value.replace(/^(\d\d)([^:]*)$/,"$1:$2") if value.length > 2
      $scope.value = value

  link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
    toTimeStr = (date)->
      return '' unless date?
      h = date.getHours().toString()
      h = "0#{h}" if h.length < 2
      m = date.getMinutes().toString()
      m = "0#{m}" if m.length < 2
      "#{h}:#{m}"

    updateTime = (date, timeStr)->
      if date? && date.length > 0
        console.log date
        parts = timeStr.split(':')
        date.setHours(parts[0]) if parts[0]?
        date.setMinutes(parts[1]) if parts[1]?
      date

    if ngModelCtrl
      scope.$watch 'value', (newValue, oldValue) ->
        if newValue isnt oldValue
          date = ngModelCtrl.$viewValue || (attrs['withDate'] && new Date())
          ngModelCtrl.$setViewValue(updateTime(date, newValue))

      ngModelCtrl.$render = ->
        scope.value = toTimeStr(ngModelCtrl.$viewValue)
]
