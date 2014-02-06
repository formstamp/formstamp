angular
.module("angular-w")
.directive "wRadio", ['$window', ($window) ->
    restrict: "A"
    scope:
      items: '='
      limit: '='
      inline: '='
      keyAttr: '@'
      valueAttr: '@'
    require: '?ngModel'
    replace: true
    transclude: true
    templateUrl: "/templates/radio.html"
    controller: ($scope, $element, $attrs) ->

      $scope.selection = (item)->
        $scope.selectedItem = item unless $scope.disabled

      $scope.shownItems = $scope.items

      # run

    compile: (tElement, tAttrs) ->
      tAttrs.keyAttr ||= 'id'
      tAttrs.valueAttr ||= 'label'

      # Link function
      (scope, element, attrs, ngModelCtrl, transcludeFn) ->

        if ngModelCtrl
          scope.$watch 'selectedItem', ->
            ngModelCtrl.$setViewValue(scope.selectedItem)
            scope.activeItem = scope.selectedItem

          ngModelCtrl.$render = ->
            unless scope.disabled
              scope.selectedItem = ngModelCtrl.$modelValue

        attrs.$observe 'disabled', (value) ->
          scope.disabled = value

        attrs.$observe 'required', (value) ->
          scope.required = value

        scope.$watch 'selectedItem', ->
          childScope = scope.$new()
          childScope.item = scope.selectedItem
          transcludeFn childScope, (clone) ->
            if clone.text().trim() isnt ""
              link = element[0].querySelector('a.w-chz-active')
              angular.element(link).empty().append(clone)

        # Hide drop down list on click elsewhere
        $window.addEventListener 'click', (e) ->
          parent = $(e.target).parents('div.w-chz')[0]
          if parent != element[0]
            scope.$apply(scope.hideDropDown)
  ]
