unindentCode = (str) ->
  str = str ? ""
  str = str.replace(/^\n/, "")
  leadingSpaces = str.match(/^\s+/)

  if leadingSpaces
    re = new RegExp("^[ ]{#{leadingSpaces[0].length}}", 'gm')
    str.replace(re, '')
  else
    str

widgets  = [
    { name: 'Form Builder', template: 'formbuilder' }
    { name: 'Select', template: 'select' }
    { name: 'MultiSelect', template: 'multiselect' }
    { name: 'Radio Group', template: 'radio' }
    { name: 'Checkbox Group', template: 'checkbox' }
    { name: 'Date/Time', template: 'datetime' }
    { name: 'List', template: 'list' }
    # { name: 'fsInput', template: 'input' }
]


app = angular.module 'formstamp-demo',
['formstamp', 'ngRoute', 'ngSanitize', 'ngAnimate'],
($routeProvider, $locationProvider) ->
  $routeProvider.when '/',
    controller: 'ReadmeCtrl'
    templateUrl: 'demo/templates/welcome.html'

  for w in widgets
    do (w)->
      templateName = if w.template? then w.template else w.name
      $routeProvider.when "/widgets/#{templateName}", templateUrl: "demo/templates/#{templateName}.html", controller: 'WidgetCtrl'

if window.testMode
  app.run ($animate) ->
    $animate.enabled(false)

app.filter 'prettify', ()->
  return (code)->
    if code
      hljs.highlightAuto(code).value

app.run ($rootScope, $location)->
  $rootScope.widgets = widgets
  $rootScope.$on "$routeChangeStart" ,
    (event, next, current) ->
      parts = $location.path().split('/')
      $rootScope.currentWidget = parts[parts.length - 1]

app.controller 'ReadmeCtrl', ($scope, $http)->
  $http.get('/README.md').success (data)->
    $scope.readme = markdown.toHTML(data)

app.controller 'WidgetCtrl', ($scope, $http)->
  # noop

app.directive 'sample', ()->
  restrict: 'E'
  scope:
    label: '@'
  controller: ($scope)->
    $scope.current = "demo"
  template: ($el, attrs)->
    el = $el[0]
    orig = el.innerHTML

    js = unindentCode($(el).find('script').remove().text())
    js = hljs.highlightAuto(js).value

    html = unindentCode(el.innerHTML)
    html = hljs.highlightAuto(html).value.replace(/{{([^}]*)}}/g, "<b style='color:green;'>{{$1}}</b>")
    html = html.replace(/(fs-[-a-zA-Z]*)/g, "<b style='color:#c00;'>$1</b>")


    """
      <div class="fsdemo-sample">
        <h4 class="pull-left">{{ label || "EXAMPLE" }}</h4>

        <div class="btn-group fstabs pull-right">
          <a class="btn btn-default" ng-class="{'active': current == 'demo'}" ng-click="current='demo'">Demo</a>
          <a class="btn btn-default" ng-class="{'active': current == 'html'}" ng-click="current='html'">HTML</a>
          <a class="btn btn-default" ng-class="{'active': current == 'js'}" ng-click="current='js'">JavaScript</a>
        </div>

        <div class='clearfix' style="height: 0;"></div>
        <div ng-show="current=='demo'">#{orig}</div>
        <div ng-show="current=='html'"><pre ng-non-bindable>#{html}</pre> </div>
        <div ng-show="current=='js'"><pre ng-non-bindable>#{js}</pre> </div>
      </div>
    """

app.directive "demoAudio", () ->
  restrict: "E",
  scope: { track: '=' },
  template: "<audio controls />",
  replace: true,
  link: ($scope, $element, $attrs) ->
    $scope.$watch 'track', (track) ->
      if track
        $element.attr('src', track.stream_url + "?client_id=8399f2e0577e0acb4eee4d65d6c6cce6")
        $element.get(0).play()
