mod = require('./module')

require('../templates/metaInput.html')
require('../templates/metaRow.html')
require('../templates/errors.html')

mod.directive 'fsErrors', ['$templateCache', ($templateCache) ->
  restrict: 'A'
  scope:
    model: '='
  replace: true
  template: $templateCache.get('templates/fs/errors.html')

  controller: ($scope) ->
    makeMessage = (idn) ->
      "Error happened: #{idn}"

    errorsWatcher = (newErrors) ->
      $scope.messages = (makeMessage(errorIdn) for errorIdn, occured of newErrors when occured)

    $scope.$watch 'model.$error', errorsWatcher, true
]

mod.directive 'fsFormFor', ['$templateCache', ($templateCache)->
  restrict: 'AE'
  template: (el, attrs) ->
    inputTpl = $templateCache.get('templates/fs/metaInput.html')
    rowTpl = $templateCache.get('templates/fs/metaRow.html')

    modelName = el.attr("model")
    action = el.attr("action")
    formAttributes = {
      name: 'form'
      class: 'form-horizontal'
      novalidate: ''
    }

    formAttributes[attr.name] = attr.value for attr in el.prop("attributes")

    inputReplacer = () ->
      input = angular.element(this)
      name = input.attr("name")
      type = input.attr("as")
      label = input.attr("label") || name

      attributes = {}
      attributes[attr.name] = attr.value for attr in input.prop("attributes")
      attributes['ng-model'] = "#{modelName}.#{name}"
      attributes['name'] = name
      delete attributes['as']

      if type.indexOf("fs-") == 0
        attributes[type] = true
        inputEl = angular.element("<div />", attributes)
        inputEl.html(input.html())
      else if type == 'textarea'
        attributes[type] = true
        attributes['class'] = 'form-control'
        inputEl = angular.element("<textarea />", attributes)
        inputEl.html(input.html())
      else
        attributes['type'] = type
        attributes['class'] = 'form-control'
        inputEl = angular.element("<input />", attributes)

      inputTpl
        .replace(/::name/g, name)
        .replace(/::label/g,label)
        .replace(/::content/, inputEl.get(0).outerHTML)

    rowReplacer = () ->
      row = angular.element(this)
      label = row.attr("label")
      rowTpl
        .replace(/::label/g,label)
        .replace(/::content/, row.get(0).outerHTML)

    html = el.find("fs-input")
      .replaceWith(inputReplacer)

    html = html.find("fs-row")
      .replaceWith(rowReplacer)
      .html()

    angular.element('<form>', formAttributes).html(html).outerHTML
]
