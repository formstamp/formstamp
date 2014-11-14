app = require('./module')

md= require('marked')

app.directive 'markdown', ()->
  restrict: 'A'
  replace: true
  template: (el)->
    "<div>#{md(el.html())}</div>"
