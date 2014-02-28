widgets  = [
    { name: 'form_for' }
    { name: 'combo' }
    { name: 'select' }
    { name: 'multiselect' }
    { name: 'tags' }
    { name: 'radio' }
    { name: 'checkbox' }
    { name: 'list' }
    { name: 'input' }
    { name: 'date/time', template: 'datetime' }
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
  scope: {}
  controller: ($scope)->
    $scope.current = "demo"
  template: ($el, attrs)->
    el = $el[0]
    orig = el.innerHTML
    js = hljs.highlightAuto($.trim($(el).find('script').remove().text())).value
    html = hljs.highlightAuto($.trim(el.innerHTML)).value.replace(/{{([^}]*)}}/g, "<b style='color:green;'>{{$1}}</b>")
    html = html.replace(/(fs-[-a-zA-Z]*)/g, "<b style='color:red;'>$1</b>")

    """
      <div class="fsdemo-sample well">
        <div class="pull-right example-label">EXAMPLE</div>
        <div class="btn-group clearfix">
          <a class="btn btn-default" ng-click="current='demo'">Demo</a>
          <a class="btn btn-default" ng-click="current='html'">HTML</a>
          <a class="btn btn-default" ng-click="current='js'">JavaScript</a>
        </div>
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
      $element.attr('src', track.stream_url + "?client_id=8399f2e0577e0acb4eee4d65d6c6cce6")
      $element.get(0).play()
