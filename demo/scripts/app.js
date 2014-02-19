angular.module('angular-w-demo', ['angular-w', 'ngRoute', 'ngAnimate'], function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: 'demo/widgets.html'
  });
});
