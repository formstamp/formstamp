# TODO: test & export utils
# exports.comp = (a, b)->
#   "#{a}".toLowerCase()
#     .indexOf(b.toString().toLowerCase()) > -1

exports.filter = (x, xs, valueAttr) ->
  if x
    xs.filter (i) ->
      item = if valueAttr then i[valueAttr] else i
      comp(item, x)
  else xs

exports.indexOf = (array, elem) ->
  for index in [0..array.length-1]
    if angular.equals(array[index], elem)
      return index
  return -1

getComputedStyleFor = (elem, prop) ->
  parseInt window.getComputedStyle(elem, null).getPropertyValue(prop)

innerHeightOf = (elem) ->
  elem.clientHeight - getComputedStyleFor(elem, 'padding-top') - getComputedStyleFor(elem, 'padding-bottom')

exports.scrollToTarget = (container, target) ->
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


exports.addValidations = (attrs, ctrl) ->

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

exports.updateTime = (date, time)->
  if date?
    date.setHours(time.getHours())
    date.setMinutes(time.getMinutes())
  date

# added casts to support input of various string representation of dates
exports.updateDate = (date, newDate) ->
  switch
    when !date?
        # cast input value to 'Date' in each case separately -
        # i don't think there is more elegant solution here unfortunately
        newDate = new Date newDate
        newDate
    when !newDate?
        date = new Date date
        date
    else
      date = new Date date
      newDate = new Date newDate
      date.setHours(newDate.getHours())
      date.setMinutes(newDate.getMinutes())
      date.setSeconds(newDate.getSeconds())
      date

exports.parseDate = (dateString)->
  time = Date.parse(dateString)
  unless isNaN(time)
    parsedDate = new Date(time)
    new Date(parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate())

uid = ['0', '0', '0']
# copypaste from angularjs utils
exports.nextUid = ()->
  index = uid.length
  digit

  while index
    index -= 1
    digit = uid[index].charCodeAt(0)
    if digit == 57
      uid[index] = 'A'
      return uid.join('')
    if digit == 90
      uid[index] = '0'
    else
      uid[index] = String.fromCharCode(digit + 1)
      return uid.join('')
  uid.unshift('0')
  uid.join('')

exports.toTimeStr = (time) ->
  return '' unless time? && time.hours? && time.minutes?
  h = time.hours?.toString()
  h = "0#{h}" if h?.length < 2
  m = time.minutes?.toString()
  m = "0#{m}" if m?.length < 2
  "#{h}:#{m}"
