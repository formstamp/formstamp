angular
.module('formstamp').directive 'fsFormFor', ['$window', ($window)->
  restrict: 'AE'
  template: (el, attrs) ->
    modelName = el.attr("model")

    replacer = () ->
      input = $(this)
      name = input.attr "name"
      type = input.attr "as"
      attributes = ("#{attr.name}=\"#{attr.value}\"" for attr in input.prop("attributes")).join(' ')

      if type.indexOf("fs-") == 0
        inputFunc = (attrs) ->
          """
          <div #{type} #{attrs} ng-model="#{modelName}.#{name}" name="#{name}"></div>
          """
      else
        inputFunc = (attrs) ->
          """
          <input type="#{type}" #{attrs} class="form-control" ng-model="#{modelName}.#{name}" name="#{name}" />
          """

      """
      <div class="form-group" ng-class="{'has-error': (form.#{name}.$dirty && form.#{name}.$invalid)}">
        <label class="col-sm-2 control-label">#{name}</label>
        <div class="col-sm-10">
          <!-- < type="#{type}" #{type} ng-model="#{modelName}.#{name}" name="#{name}"></> -->
          #{inputFunc(attributes)}
        </div>
      </div>
      """

    html = el.find("fs-input").replaceWith(replacer).end().html()

    html = """
    <form name='form' class='form-horizontal' novalidate>
      #{html}
    </form>
    """

    console.log html
    html
]

