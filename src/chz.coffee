comp = (a, b)->
  a.toLowerCase().indexOf(b.toLowerCase()) > -1

filter = (x, xs)->
  if x then xs.filter ((i)-> comp(i.name, x)) else xs

focuz = (el)->
  window.setTimeout((()-> el.focus()) , 0)

angular
.module("angular-w", [])
.directive "wFocus", ->
  link: (scope, element, attrs) ->
    scope.$watch attrs.wFocus, (fcs)->
      focuz(element[0]) if fcs

angular
.module("angular-w")
.directive "wChz", [->
  restrict: "A"
  scope:
    items: '='
  replace: true,
  template: """
  <div>
    <a class="btn btn-default"
       href="javascript:void(0)"
       ng-hide="active"
       ng-click="active=true">
       {{ (selectedItem || 'none') | json }}</a>
    <div class="open"
         ng-show="active" >
      <input ng-keydown="onkeys($event.keyCode)"
             w-focus="active"
             class="form-control"
             type="search"
             ng-model="search" />
      <ul class="dropdown-menu"
          role="menu"
          style="margin-left: 15px;">
       <li ng-repeat="item in shownItems"
           ng-class="{true: 'active'}[item == activeItem]">
             <a ng-click="selection(item)"
                href="javascript:void(0)" >{{ item.name }}</a></li></ul></div></div>
  """
  controller: ($scope, $element, $attrs) ->

    move = (d)->
      items = $scope.shownItems
      activeIndex = (items.indexOf($scope.activeItem) || 0) + d
      activeIndex = Math.min(Math.max(activeIndex,0), items.length - 1)
      $scope.activeItem = items[activeIndex]

    search = (q)->
      if $scope.prevSearch != q
        $scope.shownItems = filter(q, $scope.items)[0..10]
        $scope.activeItem = $scope.shownItems[0]
      $scope.prevSearch = q

    $scope.selection = (item)->
      $scope.selectedItem = item
      $scope.active = false

    $scope.onkeys = (key)->
       switch key
         when 40 then move(1)
         when 38 then move(-1)
         when 13 then $scope.selection($scope.activeItem)

    $scope.$watch 'search', search

    # run
    search('')
]
