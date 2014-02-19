angular.module('angular-w-demo', ['angular-w', 'ngRoute', 'ngSanitize'], function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'demo/widgets.html'
  });
  $routeProvider.when('/index.html', {
    templateUrl: 'demo/widgets.html'
  });
  $locationProvider.html5Mode(true);
});
