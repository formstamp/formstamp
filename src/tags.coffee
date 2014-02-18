angular
.module("angular-w")
.directive "wTags", ['$window', ($window) ->
    restrict: "A"
    scope:
      invalid: '='
      items: '='
      limit: '='
    require: '?ngModel'
    replace: true
    transclude: true
    templateUrl: "/templates/multi-select.html"
    controller: ($scope, $element, $attrs) ->

      search = (q) ->
        $scope.shownItems = filter(q, $scope.items).slice(0, $scope.limit)
        if $scope.shownItems.length == 0
          $scope.shownItems.push(q)
        $scope.activeItem = $scope.shownItems[0]
        $scope.prevSearch = q

      $scope.getItemLabel = (item)->
        item

      #TODO: why is this method's name a noun instead of a verb?
      $scope.selection = (item)->
        if item? and item.length > 0 and indexOf($scope.selectedItems, item) == -1
          $scope.selectedItems.push(item)
          $scope.search = ''
        $scope.hideDropDown()


      $scope.deselect = (item)->
        index = indexOf($scope.selectedItems, item)
        if index > -1
          $scope.selectedItems.splice(index, 1)

      $scope.reset = ->
        $scope.selectedItems = []
        $scope.focus = true
        search('')

      $scope.activeKeys = (event) ->
        if event.keyCode == 13
          $scope.active = true


      $scope.$watch 'search', search

      $scope.hideDropDown = ->
        $scope.active = false

      # run
      $scope.selectedItems = []
      search('')

    link: (scope, element, attrs, ngModelCtrl, transcludeFn) ->
      if ngModelCtrl
        setViewValue = (newValue, oldValue)->
          unless angular.equals(newValue, oldValue)
            ngModelCtrl.$setViewValue(scope.selectedItems)

        scope.$watch 'selectedItems', setViewValue, true

        ngModelCtrl.$render = ->
          scope.selectedItems = ngModelCtrl.$modelValue || []

        addValidations(attrs, ngModelCtrl)

      attrs.$observe 'disabled', (value) ->
        scope.disabled = value

      scope.$watch  'selectedItems', ->
        childScope = scope.$new()
        childScope.items = scope.selectedItems
        transcludeFn childScope, (clone) ->
          if clone.text().trim() isnt ""
            link = element[0].querySelector('a.w-multi-select-active')
            angular.element(link).empty().append(clone)

      # Hide drop down list on click elsewhere
      $window.addEventListener 'click', (e) ->
        parent = $(e.target).parents('div.w-multi-select')[0]
        if parent != element[0]
          scope.$apply ->
            scope.hideDropDown()
            scope.selection(scope.search)

      scope.onEnter = (event) ->
        scope.selection(scope.activeItem || scope.search)
        scope.focus=true
        event.preventDefault()

      scope.onPgup = (event) ->
        scope.move(-11)
        event.preventDefault()

      scope.onPgdown = (event) ->
        scope.move(11)
        event.preventDefault()

      scope.onTab = ->
        # scope.selection(scope.search || scope.activeItem)

      scope.onEsc = ->
        scope.hideDropDown()
        scope.focus=true

      getActiveIndex = ->
        indexOf(scope.shownItems, scope.activeItem) || 0

      scope.move = (d) ->
        items = scope.shownItems
        activeIndex = getActiveIndex() + d
        activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
        scope.activeItem = items[activeIndex]
        scroll()

      scroll = ->
        delayedScrollFn = ->
          ul = element.find('ul')[0]
          li = ul.querySelector('li.active')
          scrollToTarget(ul, li)
        setTimeout(delayedScrollFn, 0)
  ]
