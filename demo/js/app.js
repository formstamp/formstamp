(function() {
  var app, widgets;

  widgets = [
    {
      name: 'form_for'
    }, {
      name: 'combo'
    }, {
      name: 'select'
    }, {
      name: 'multiselect'
    }, {
      name: 'tags'
    }, {
      name: 'radio'
    }, {
      name: 'checkbox'
    }, {
      name: 'list'
    }, {
      name: 'input'
    }
  ];

  app = angular.module('formstamp-demo', ['formstamp', 'ngRoute', 'ngSanitize'], function($routeProvider, $locationProvider) {
    var w, _i, _len, _results;
    $routeProvider.when('/', {
      templateUrl: 'demo/templates/welcome.html'
    });
    _results = [];
    for (_i = 0, _len = widgets.length; _i < _len; _i++) {
      w = widgets[_i];
      _results.push((function(w) {
        return $routeProvider.when("/widgets/" + w.name, {
          templateUrl: "demo/templates/" + w.name + ".html",
          controller: 'WidgetCtrl'
        });
      })(w));
    }
    return _results;
  });

  app.filter('prettify', function() {
    return function(code) {
      if (code) {
        return hljs.highlightAuto(code).value;
      }
    };
  });

  app.run(function($rootScope, $location) {
    $rootScope.widgets = widgets;
    return $rootScope.$on("$routeChangeStart", function(event, next, current) {
      var parts;
      parts = $location.path().split('/');
      return $rootScope.currentWidget = parts[parts.length - 1];
    });
  });

  app.controller('WidgetCtrl', function($scope, $location) {});

  app.directive('sample', function() {
    return {
      restrict: 'E',
      controller: function($scope) {
        return $scope.current = "demo";
      },
      template: function($el, attrs) {
        var el, html, js, orig;
        el = $el[0];
        orig = el.innerHTML;
        js = hljs.highlightAuto($.trim($(el).find('script').remove().text())).value;
        html = hljs.highlightAuto($.trim(el.innerHTML)).value.replace(/{{([^}]*)}}/g, "<b style='color:green;'>{{$1}}</b>");
        return "<div>\n  <div class=\"btn-group\">\n    <a class=\"btn btn-default\" ng-click=\"current='demo'\">Demo</a>\n    <a class=\"btn btn-default\" ng-click=\"current='html'\">HTML</a>\n    <a class=\"btn btn-default\" ng-click=\"current='js'\">JavaScript</a>\n  </div>\n  <hr/>\n  <div ng-show=\"current=='demo'\">" + orig + "</div>\n  <div ng-show=\"current=='html'\"><pre ng-non-bindable>" + html + "</pre> </div>\n  <div ng-show=\"current=='js'\"><pre ng-non-bindable>" + js + "</pre> </div>\n</div>";
      }
    };
  });

  app.directive("demoAudio", function() {
    return {
      restrict: "E",
      scope: {
        track: '='
      },
      template: "<audio controls />",
      replace: true,
      link: function($scope, $element, $attrs) {
        return $scope.$watch('track', function(track) {
          $element.attr('src', track.stream_url + "?client_id=8399f2e0577e0acb4eee4d65d6c6cce6");
          return $element.get(0).play();
        });
      }
    };
  });

}).call(this);
