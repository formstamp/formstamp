angular.module('angular-w-demo', ['angular-w', 'ngRoute', 'ngSanitize'], function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'demo/widgets.html'
  });
});
