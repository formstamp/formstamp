angular
.module('formstamp').directive 'fsErrors', ->
  restrict: 'A'
  scope:
    model: '='
  replace: true
  template: """
    <ul class='text-danger fs-errors' ng-show='model.$dirty && messages && messages.length > 0'>
      <li ng-repeat='msg in messages'>{{ msg }}</li>
    </ul>
  """

  controller: ($scope) ->
    makeMessage = (idn) ->
      "Error happened: #{idn}"

    errorsWatcher = (newErrors) ->
      $scope.messages = (makeMessage(errorIdn) for errorIdn, occured of newErrors when occured)

    $scope.$watch 'model.$error', errorsWatcher, true

angular
.module('formstamp').directive 'fsFormFor', ()->
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
      else
        attributes['type'] = type
        attributes['class'] = 'form-control'
        inputEl = $("<input />", attributes)

      """
      <div class="form-group" ng-class="{'has-error': (form.#{name}.$dirty && form.#{name}.$invalid)}">
        <label class="col-sm-2 control-label">#{label}</label>
        <div class="col-sm-10">
          #{inputEl.get(0).outerHTML}
          <div fs-errors model="form.#{name}"></div>
        </div>
      </div>
      """

    rowReplacer = () ->
      row = $(this)
      label = row.attr("label")

      """
      <div class="form-group">
        <label class="col-sm-2 control-label">#{label}</label>
        <div class="col-sm-10">
          #{row.get(0).outerHTML}
        </div>
      </div>
      """

    html = el.find("fs-input")
      .replaceWith(inputReplacer)
      .end()
      .find("fs-row")
      .replaceWith(rowReplacer)
      .end().html()

    $('<form>', formAttributes).html(html)[0].outerHTML
