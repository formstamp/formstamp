describe 'fsList', ->
  $scope = null
  $compile = null
  input = null

  beforeEach module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $scope.items = [
      { label: "first item" },
      { label: "second item" },
      { label: "third item" }
    ]

    $scope.listInterface = {
      onSelect: ->
    }

    $compile = _$compile_

  compile = (elem) ->
    element = $compile(elem)($scope)
    $scope.$apply()
    element

  it 'should expands', ->
    element = compile('<div fs-list items="items"></div>')
    expect(element.children().length).not.toBe 0

  it 'should propagate CSS class', ->
    element = compile('<div fs-list items="items" class="foobar"></div>')
    expect(element[0].getAttribute('class')).toMatch(/foobar/)

  it 'should render items', ->
    element = compile('<div fs-list items="items"></div>')
    expect(element.find('li').length).toBe $scope.items.length

  it 'should create move() function in scope listInterface attribute', ->
    element = compile('<div fs-list items="items"></div>')
    expect(typeof($scope.listInterface.move)).toBe 'function'

  it 'should call listInterface.onSelect when selection is changed', ->
    selectedItem = null

    $scope.listInterface.onSelect = (item)->
      selectedItem = item

    element = compile('<div fs-list items="items"></div>')
    innerScope = $scope.$$childHead
    $scope.$apply -> innerScope.highlightItem($scope.items[1])
    expect(selectedItem).toEqual($scope.items[1])
    expect($scope.listInterface.selectedItem).toEqual(selectedItem)
