//TODO: current solution doesn't support direct access to routes other than /index
window.widgets = ['Select', 'MultiSelect', 'Combo', 'Tags', 'Radio', 'Checkbox']

angular.module('angular-w-demo', ['angular-w', 'ngRoute', 'ngSanitize'], function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'demo/formstamp.html',
    controller: 'RootExampleController'
  });
  angular.forEach(window.widgets, function(widget) {
    $routeProvider.when('/widgets/' + widget.toLowerCase(), {
      templateUrl: '/demo/widgets/' + widget.toLowerCase() + '.html'
    });
  });
  $routeProvider.when('/formbuilder', {
    templateUrl: 'demo/formbuilder.html'
  });
  $locationProvider.html5Mode(true);
}).run( function($rootScope) {
  $rootScope.widgets = window.widgets;
});
