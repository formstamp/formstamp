app = require('./module')

unindentCode = (str) ->
  str = str ? ""
  str = str.replace(/^\n/, "")
  leadingSpaces = str.match(/^\s+/)

  if leadingSpaces
    re = new RegExp("^[ ]{#{leadingSpaces[0].length}}", 'gm')
    str.replace(re, '')
  else
    str


app.directive 'sample', ($sce)->
  # scope:
  #   src: '='
  restrict: 'A'
  controller: ($scope)->
    $scope.current = 'demo'
    $scope.$watch 'src', (v)->
      $scope.js = $sce.trustAsHtml(hljs.highlightAuto(v).value)
  replace: true
  link: (scope, el, args...)->
  template: ($el, attrs)->
    orig = $el.html()
    html = orig
    html = hljs.highlightAuto(html)
      .value
      .replace(/{{([^}]*)}}/g, "<b style='color:green;'>{{$1}}</b>")
      .replace(/(fs-[-a-zA-Z]*)/g, "<b class='important'>$1</b>")

    """
      <div class="fs-sample">
        <h4 class="pull-left">#{attrs.label || 'Example' }</h4>

        <div class="btn-group fstabs pull-right">
          <a class="btn btn-default" ng-class="{'active': current == 'demo'}" ng-click="current='demo'">Demo</a>
          <a class="btn btn-default" ng-class="{'active': current == 'html'}" ng-click="current='html'">HTML</a>
          <a class="btn btn-default" ng-class="{'active': current == 'js'}" ng-click="current='js'">JavaScript</a>
        </div>

        <div class='clearfix' style="height: 0;"></div>
        <div ng-show="current=='demo'">#{orig}</div>
        <div ng-show="current=='html'"><pre ng-non-bindalbe>#{html}</pre></div>
        <div ng-show="current=='js'"><pre ng-bind-html="js"></pre></div>
      </div>
    """
