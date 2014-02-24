//TODO: current solution doesn't support direct access to routes other than /index
window.widgets = ['Select', 'MultiSelect', 'Combo', 'Tags', 'Radio', 'Checkbox', 'Datepicker'];

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
}).filter('highlight', function() {
  return function(text, lang) {
    if (lang)
      return hljs.highlight(lang, text).value;
    else
      return hljs.highlightAuto(text).value;
  }
}).directive('highlight', function($filter) {
  return {
    compile: function(tElement, tAttr) {
      var lang = tAttr.highlight;

      return function(scope, element, attr) {
        highlightFilter = $filter('highlight');

        var htmlDecode = function(input) {
          var e = document.createElement('div');
          e.innerHTML = input;
          return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        }
        var highlighted = highlightFilter(htmlDecode(element.html()), lang);
        element.html(highlighted, lang)
      }
    }
  }
});

