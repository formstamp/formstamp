//TODO: current solution doesn't support direct access to routes other than /index
angular.module('angular-w-demo', ['angular-w', 'ngRoute', 'ngSanitize'], function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'demo/formstamp.html',
    controller: 'RootExampleController'
  });
  $routeProvider.when('/widgets', {
    templateUrl: 'demo/widgets.html'
  });
  $routeProvider.when('/formbuilder', {
    templateUrl: 'demo/formbuilder.html'
  });
  $locationProvider.html5Mode(true);
});
