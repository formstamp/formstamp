mod = require('./module')

require('../templates/metaInput.html')
require('../templates/metaRow.html')
require('../templates/errors.html')

setAttrs = (el, attrs) ->
  for own attr, value of attrs
    el.attr(attr, value)

mod.directive 'fsErrors', ['$templateCache', ($templateCache) ->
  restrict: 'A'
  scope:
    model: '='
  replace: true
  template: $templateCache.get('templates/fs/errors.html')

  controller:['$scope', ($scope) ->
    makeMessage = (idn) ->
      "Error happened: #{idn}"

    errorsWatcher = (newErrors) ->
      $scope.messages = (makeMessage(errorIdn) for errorIdn, occured of newErrors when occured)

    $scope.$watch 'model.$error', errorsWatcher, true
  ]
]

isDirectChild = (form, el)->
  testel = el
  while testel
    if testel.tagName.toLowerCase() == 'fs-form-for'
      if testel.isSameNode(form)
        return true
      else
        return false
    testel = testel.parentNode
  return false

mod.directive 'fsFormFor', ['$templateCache', ($templateCache)->
  restrict: 'AE'
  replace: true
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

    inputReplacer = (el) ->
      input = angular.element(el)
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
        inputEl = angular.element("<div />")
        setAttrs(inputEl, attributes)
        inputEl.html(input.html())
      else if type == 'textarea'
        attributes[type] = true
        attributes['class'] = 'form-control'
        inputEl = angular.element("<textarea />")
        setAttrs(inputEl, attributes)
        inputEl.html(input.html())
      else
        attributes['type'] = type
        attributes['class'] = 'form-control'
        inputEl = angular.element("<input />")
        setAttrs(inputEl, attributes)

      inputTpl
        .replace(/::name/g, name)
        .replace(/::label/g,label)
        .replace(/::content/, inputEl[0].outerHTML)

    rowReplacer = (el) ->
      row = angular.element(el)
      label = row.attr("label")
      rowTpl
        .replace(/::label/g,label)
        .replace(/::content/, row.html())

    tplEl = el.clone()

    root = tplEl[0]
    for input in tplEl.find("fs-input") when isDirectChild(root,input)
      angular.element(input).replaceWith(inputReplacer(input))

    for row in tplEl.find("fs-row")
      angular.element(row).replaceWith(rowReplacer(row))

    form = angular.element('<form>')
    setAttrs(form, formAttributes)
    form.html(tplEl.html())
    form[0].outerHTML
]
