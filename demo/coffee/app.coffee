widgets  = [
    {name: 'form_for'},
    {name: 'combo'},
    {name: 'select'},
    {name: 'multiselect'},
    {name: 'tags'},
    {name: 'radio'},
    {name: 'checkbox'}
    {name: 'list'}
]
app = angular.module 'formstamp-demo',
 ['formstamp', 'ngRoute', 'ngSanitize'],

 ($routeProvider, $locationProvider) ->
   $routeProvider
   .when('/', {
     templateUrl: 'demo/templates/welcome.html'
   })
   .when('/formbuilder', {
     templateUrl: 'demo/formbuilder.html'
   })

   for w in widgets
     do (w)->
       $routeProvider.when "/widgets/#{w.name}", templateUrl: "demo/templates/#{w.name}.html", controller: 'WidgetCtrl'

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

app.controller 'WidgetCtrl', ($scope, $location)->
  #

app.directive 'sample', ()->
  restrict: 'E'
  # transclude: true
  controller: ($scope)->
    $scope.current = "demo"
  template: (el)->
    orig = el.html()
    js = hljs.highlightAuto($.trim($(el).find('script').remove().text())).value
    html = hljs.highlightAuto($.trim(el.html())).value
    """
      <div>
        <div class="btn-group">
          <a class="btn btn-default" ng-click="current='demo'">Demo</a>
          <a class="btn btn-default" ng-click="current='html'">HTML</a>
          <a class="btn btn-default" ng-click="current='js'">JavaScript</a>
        </div>
        <hr/>
        <div ng-show="current=='demo'">#{orig}</div>
        <div ng-show="current=='html'"><pre>#{html}</pre> </div>
        <div ng-show="current=='js'"><pre>#{js}</pre> </div>
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

