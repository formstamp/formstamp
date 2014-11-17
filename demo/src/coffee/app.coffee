require('../../bower_components/angular/angular.js')
require('../../bower_components/angular-route/angular-route.js')
require('../../bower_components/angular-sanitize/angular-sanitize.js')
require('../../bower_components/angular-animate/angular-animate.js')
require('../../../src/coffee/formstamp.coffee')

app = require('./module')
require('./sampleDirective')
require('./markdown')

require('../views/index.html')
require('../views/readme.html')

require('./form')
require('../views/form.html')

require('./select')
require('../views/select.html')

require('./multiselect')
require('../views/multiselect.html')

require('./radio')
require('../views/radio.html')

require('./check')
require('../views/check.html')

require('./datetime')
require('../views/datetime.html')

require('./list')
require('../views/list.html')

require('../less/app.less')
require('../less/flags.css')

capitalize = (s)->
  s && s[0].toUpperCase() + s.slice(1)

buildSiteMap = (x)->
  x.href = "#/#{x.name}"
  x.templateUrl = "views/#{x.name}.html"
  x.controller = "#{capitalize(x.name)}Ctrl"
  x

sitemap = {
  main: [
    {name: 'form', label: 'Form'}
    {name: 'select', label: 'Select'}
    {name: 'multiselect', label: 'MultiSelect'}
    {name: 'radio', label: 'Radio'}
    {name: 'check', label: 'Checkbox'}
    {name: 'datetime', label: 'Date/Time'}
    {name: 'list', label: 'List'}
  ].map(buildSiteMap)
}

app.config ($routeProvider) ->
  rp = $routeProvider
    .when '/',
      templateUrl: 'views/readme.html'
      controller: 'ReadmeCtrl'

  mkRoute = (acc, x)->
    acc.when("/#{x.name}", x)

  rp = sitemap.main.reduce mkRoute, rp

  rp.otherwise
    templateUrl: '/views/404.html'

activate = (name)->
  sitemap.main.forEach (x)->
    if x.name == name
      x.active = true
    else
      delete x.active

app.run ($rootScope) ->
  $rootScope.brand = "Formstamp"
  $rootScope.sitemap = sitemap
  $rootScope.$on  "$routeChangeStart", (event, next, current)->
    activate(next.name)


app.controller 'WelcomeCtrl', ()->

app.readme = require('../../../README.md')

app.controller 'ReadmeCtrl', ($sce, $scope)->
  console.log($sce.trustAsHtml(app.readme))
  $scope.readme = $sce.trustAsHtml(app.readme)

