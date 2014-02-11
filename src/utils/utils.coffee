comp = (a, b)->
  a.toString().toLowerCase()
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

