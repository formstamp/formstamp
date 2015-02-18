require('../../bower_components/angular/angular.js')
require('../../bower_components/angular-route/angular-route.js')
require('../../bower_components/angular-sanitize/angular-sanitize.js')
require('../../bower_components/angular-animate/angular-animate.js')
require('../../../src/coffee/formstamp.coffee')

require('file?name=index.html!../index.html')

app = require('./module')
require('./sampleDirective')
require('./markdown')

require('../views/index.html')
require('../views/readme.html')

require('../views/form.html')
require('../views/select.html')
require('../views/multiselect.html')
require('../views/radio.html')
require('../views/check.html')
require('../views/datetime.html')
require('../views/list.html')
require('../views/validation.html')

require('../less/app.less')
require('../less/flags.css')
require('../less/sushi.css')

window.countries = require('./countries')

capitalize = (s)->
  s && s[0].toUpperCase() + s.slice(1)

buildSiteMap = (x)->
  x.href = "#/#{x.name}"
  x.templateUrl = "views/#{x.name}.html"
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
    {name: 'validation', label: 'Validation'}
  ].map(buildSiteMap)
  user: [
    {name: 'src', label: 'Edge', href: 'http://formstamp.github.io/edge'}
    {name: 'src', label: 'Source', icon: 'github', href: 'https://github.com/formstamp/formstamp'}
  ]
}

# Lazy Loading of controllers after app is bootstraped
# This general idea is based on excellent article by
# Ifeanyi Isitor: http://ify.io/lazy-loading-in-angularjs/
app.config ['$controllerProvider', ($controllerProvider) ->
  app._controller = app.controller
  app.controller = (name, c) ->
    $controllerProvider.register(name, c)
    this
]

app.config ['$routeProvider', ($routeProvider) ->
  rp = $routeProvider
    .when '/',
      templateUrl: 'views/readme.html'
      controller: 'ReadmeCtrl'

  mkRoute = (acc, x)->
    acc.when("/#{x.name}", x)

  rp = sitemap.main.reduce mkRoute, rp

  rp.otherwise
    templateUrl: '/views/404.html'
]

activate = (name)->
  sitemap.main.forEach (x)->
    if x.name == name
      x.active = true
    else
      delete x.active

app.run ['$rootScope', ($rootScope) ->
  $rootScope.brand = "Formstamp"
  $rootScope.sitemap = sitemap
  $rootScope.$on "$routeChangeStart", (event, next, current)->
    activate(next.name)
]

app.controller 'WelcomeCtrl', ()->

app.readme = require('../../../README.md')

app.controller 'ReadmeCtrl', ['$sce', '$scope', ($sce, $scope)->
  $scope.readme = $sce.trustAsHtml(app.readme)
]

app.controller 'ValidationCtrl', ['$sce', '$scope', ($sce, $scope)->
  $scope.readme = $sce.trustAsHtml(app.readme)
]
