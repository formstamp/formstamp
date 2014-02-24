widgets  = [
    {name: 'combo'},
    {name: 'select'},
    {name: 'multiselect'},
    {name: 'tags'},
    {name: 'radio'},
    {name: 'checkbox'}
]
app = angular.module 'angular-w-demo',
 ['angular-w', 'ngRoute', 'ngSanitize'],

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
       console.log(w.name)
       $routeProvider.when "/widgets/#{w.name}", templateUrl: "demo/templates/#{w.name}.html"

app.filter 'prettify', ()->
  return (code)->
    if code
      hljs.highlightAuto(code).value

app.run ($rootScope)->
  $rootScope.widgets = widgets

app.controller 'WidgetCtrl', ($routeParams)->
  console.log($routeParams)

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
