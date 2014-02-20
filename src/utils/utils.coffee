comp = (a, b)->
  "#{a}".toLowerCase()
    .indexOf(b.toString().toLowerCase()) > -1

filter = (x, xs, valueAttr) ->
  if x
    xs.filter (i) ->
      item = if valueAttr then i[valueAttr] else i
      comp(item, x)
  else xs

indexOf = (array, elem) ->
  for index in [0..array.length-1]
    if angular.equals(array[index], elem)
      return index
  return -1

getComputedStyleFor = (elem, prop) ->
  parseInt window.getComputedStyle(elem, null).getPropertyValue(prop)

innerHeightOf = (elem) ->
  elem.clientHeight - getComputedStyleFor(elem, 'padding-top') - getComputedStyleFor(elem, 'padding-bottom')

scrollToTarget = (container, target) ->
  return unless container and target

  viewport =
    top: container.scrollTop
    bottom: container.scrollTop + innerHeightOf(container)

  item =
    top: target.offsetTop
    bottom: target.offsetTop + target.offsetHeight

  # Scroll down
  if item.bottom > viewport.bottom
    container.scrollTop += item.bottom - viewport.bottom
  # Scroll up
  else if item.top < viewport.top
    container.scrollTop -= viewport.top - item.top


addValidations = (attrs, ctrl) ->

  validate = (ctrl, validatorName, validity, value) ->
    ctrl.$setValidity(validatorName, validity)
    if validity then value else undefined

  # Min length validation
  if attrs.ngMinlength
    minlength = parseInt(attrs.ngMinlength)
    minLengthValidator = (value) ->
      validate(ctrl, 'minlength', ctrl.$isEmpty(value) || value.length >= minlength, value)
    ctrl.$formatters.push(minLengthValidator)
    ctrl.$parsers.push(minLengthValidator)

  # Max length validation
  if attrs.ngMaxlength
    maxlength = parseInt(attrs.ngMaxlength)
    maxLengthValidator = (value) ->
      validate(ctrl, 'maxlength', ctrl.$isEmpty(value) || value.length <= maxlength, value)
    ctrl.$formatters.push(maxLengthValidator)
    ctrl.$parsers.push(maxLengthValidator)

  # Pattern validation
  if attrs.ngPattern
    pattern = attrs.ngPattern

    validateRegex = (regexp, value) ->
      validate(ctrl, 'pattern', ctrl.$isEmpty(value) || regexp.test(value), value)
    match = pattern.match(/^\/(.*)\/([gim]*)$/)
    if match
      pattern = new RegExp(match[1], match[2])
      patternValidator = (value) ->
        validateRegex(pattern, value)
    else
      patternValidator = (value) ->
        patternObj = scope.$eval(pattern)

        if !patternObj || !patternObj.test
          throw minErr('ngPattern')('noregexp',
            'Expected {0} to be a RegExp but was {1}. Element: {2}', pattern,
            patternObj, startingTag(element))
        validateRegex(patternObj, value)

    ctrl.$formatters.push(patternValidator)
    ctrl.$parsers.push(patternValidator)
