//TODO: current solution doesn't support direct access to routes other than /index
angular.module('angular-w-demo', ['angular-w', 'ngRoute', 'ngSanitize'], function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'demo/widgets.html'
  });
  $routeProvider.when('/index.html', {
    templateUrl: 'demo/widgets.html'
  });
  $routeProvider.when('/formbuilder.html', {
    templateUrl: 'demo/formbuilder.html'
  });
  $locationProvider.html5Mode(true);
});
