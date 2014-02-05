angular.module('angular-w').directive 'wDropdown', ['$window', ($window) ->
  restrict: 'A'
  replace: true
  scope:
    opened: '='
    items: '='
    selectedItem: '='
    valueAttr: '='
    onSearch: '='
    onClick: '='
    onEnter: '='
    onTab: '='
    onEsc: '='
    focusInput: '='
  templateUrl: '/templates/dropdown.html'
  link: (scope, element, attrs) ->

    getIndexFor = (item) ->
      (scope.items.indexOf(item) || 0)

    getComputedStyle = (elem, prop) ->
      parseInt $window.getComputedStyle(elem, null).getPropertyValue(prop)

    move = (d) ->
      items = scope.items
      activeIndex = getIndexFor(scope.activeItem) + d
      activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
      scope.activeItem = items[activeIndex]
      scrollIfNeeded(activeIndex)

    scrollIfNeeded = (activeIndex) ->
      ul = element.find('ul')[0]
      li = ul.querySelector('li.active')

      return unless ul and li

      ulHeight = ul.clientHeight - getComputedStyle(ul, 'padding-top') - getComputedStyle(ul, 'padding-bottom')
      viewport =
        top: ul.scrollTop
        bottom: ul.scrollTop + ulHeight

      li = ul.querySelector('li.active')
      liHeight = li.clientHeight - getComputedStyle(li, 'padding-top') - getComputedStyle(li, 'padding-bottom')
      item =
        top: activeIndex * liHeight
        bottom: (activeIndex + 1) * liHeight

      # Scroll down
      if item.bottom > viewport.bottom
        ul.scrollTop += item.bottom - viewport.bottom
      # Scroll up
      else if item.top < viewport.top
        ul.scrollTop -= viewport.top - item.top

    scope.click = (item) ->
      if scope.onClick
        scope.onClick(item)
        scope.activeItem = item

    scope.onkeys = (event)->
      switch event.keyCode
        when 40 then move(1)
        when 38 then move(-1)
        when 13
          scope.onEnter and scope.onEnter(scope.activeItem)
          event.preventDefault()
        when  9 then scope.onTab and scope.onTab(scope.activeItem)
        when 27 then scope.onEsc and scope.onEsc()
        when 34 then move(11)
        when 33 then move(-11)

    scope.$watch 'opened', (value) ->
      scope.activeItem = scope.selectedItem
      window.setTimeout((()-> scrollIfNeeded(getIndexFor(scope.selectedItem))) , 0) if value

    scope.$watch 'search', (q) ->
      scope.items = scope.onSearch(q)
      scope.activeItem = scope.items[0]
]
