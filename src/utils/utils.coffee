comp = (a, b)->
  a.toString().toLowerCase()
    .indexOf(b.toString().toLowerCase()) > -1

filter = (x, xs, valueAttr) ->
  if x
    xs.filter (i) ->
      item = if valueAttr then i[valueAttr] else i
      comp(item, x)
  else xs

getComputedStyleFor = (elem, prop) ->
  parseInt window.getComputedStyle(elem, null).getPropertyValue(prop)

innerHeightOf = (elem) ->
  elem.clientHeight - getComputedStyleFor(elem, 'padding-top') - getComputedStyleFor(elem, 'padding-bottom')

indexOf = (array, elem) ->
  for index in [0..array.length-1]
    if angular.equals(array[index], elem)
      return index
  return -1
