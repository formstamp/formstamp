mod = require('./module')

inputTpl = require('html!../templates/metaInput.html')
rowTpl = require('html!../templates/metaRow.html')

mod.directive 'fsErrors', ->
  restrict: 'A'
  scope:
    model: '='
  replace: true
  template: require('html!../templates/errors.html')

  controller: ($scope) ->
    makeMessage = (idn) ->
      "Error happened: #{idn}"

    errorsWatcher = (newErrors) ->
      $scope.messages = (makeMessage(errorIdn) for errorIdn, occured of newErrors when occured)

    $scope.$watch 'model.$error', errorsWatcher, true

mod.directive 'fsFormFor', ()->
  restrict: 'AE'
  template: (el, attrs) ->
    modelName = el.attr("model")
    action = el.attr("action")
    formAttributes = {
      name: 'form'
      class: 'form-horizontal'
      novalidate: ''
    }
    formAttributes[attr.name] = attr.value for attr in el.prop("attributes")

    inputReplacer = () ->
      input = $(this)
      name = input.attr("name")
      type = input.attr("as")
      label = input.attr("label") ? name # TODO: labelize name

      attributes = {}
      attributes[attr.name] = attr.value for attr in input.prop("attributes")
      attributes['ng-model'] = "#{modelName}.#{name}"
      attributes['name'] = name
      delete attributes['as']

      if type.indexOf("fs-") == 0
        attributes[type] = true
        inputEl = $("<div />", attributes)
        inputEl.html(input.html())
      else if type == 'textarea'
        attributes[type] = true
        attributes['class'] = 'form-control'
        inputEl = $("<textarea />", attributes)
        inputEl.html(input.html())
      else
        attributes['type'] = type
        attributes['class'] = 'form-control'
        inputEl = $("<input />", attributes)

      inputTpl
        .replace(/::name/g, name)
        .replace(/::label/g,label)
        .replace(/::content/, inputEl.get(0).outerHTML)

    rowReplacer = () ->
      row = $(this)
      label = row.attr("label")
      rowTpl
        .replace(/::label/g,label)
        .replace(/::content/, row.get(0).outerHTML)

    html = el.find("fs-input")
      .replaceWith(inputReplacer)
      .end()
      .find("fs-row")
      .replaceWith(rowReplacer)
      .end().html()

    $('<form>', formAttributes).html(html)[0].outerHTML
