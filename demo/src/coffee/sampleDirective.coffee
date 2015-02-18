app = require('./module')

unindentCode = (str) ->
  str = str ? ""
  str = str.replace(/^\s*\n/g, "")
  leadingSpaces = str.match(/^\s+/)

  if leadingSpaces
    re = new RegExp("^[ ]{#{leadingSpaces[0].length}}", 'gm')
    str.replace(re, '')
  else
    str

app.directive 'sample', [() ->
  scope: {}
  restrict: 'A'
  controller: ['$scope', ($scope)->
    $scope.current = 'demo'
  ]

  template: ($el, attrs) ->
    rawHtml = $el.html()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    rawHtml = unindentCode(rawHtml)

    hlHtml = hljs.highlightAuto(rawHtml)
      .value
      .replace(/{{([^}]*)}}/g, "<b style='color:green;'>{{$1}}</b>")
      .replace(/(fs-[-a-zA-Z]*)/g, "<b class='important'>$1</b>")

    rawJs = $el.find("script").text()
    eval(rawJs)
    rawJs = unindentCode(rawJs)

    if !rawJs
      rawJs = '/* No code to display */'

    hlJs = hljs.highlightAuto(rawJs).value

    """
      <div class="fs-sample">
        <h4 class="pull-left">#{attrs.label || 'Example' }</h4>

        <div class="btn-group fstabs pull-right">
          <a class="btn btn-default" ng-class="{'active': current == 'demo'}" ng-click="current='demo'">Demo</a>
          <a class="btn btn-default" ng-class="{'active': current == 'html'}" ng-click="current='html'">HTML</a>
          <a class="btn btn-default" ng-class="{'active': current == 'js'}" ng-click="current='js'">JavaScript</a>
        </div>

        <div class='clearfix' style="height: 0;"></div>
        <div ng-show="current=='demo'">#{rawHtml}</div>
        <div ng-show="current=='html'"><pre ng-non-bindable>#{hlHtml}</pre></div>
        <div ng-show="current=='js'"><pre ng-non-bindable>#{hlJs}</pre></div>
      </div>
    """
]
