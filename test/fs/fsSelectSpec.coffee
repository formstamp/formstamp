describe 'fsSelect', ->
  $scope = null
  $compile = null

  beforeEach module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $scope.items = ['first', 'second', 'last']
    $compile = _$compile_

  compile = (elem) ->
    elem ||= '<div fs-select items="items" ng-model="value"></div>'
    element = $compile(elem)($scope)
    $scope.$apply()
    element

  it 'should expands', ->
    element = compile()
    expect(element.children().length).not.toBe 0

  it 'should disable input on ngDisabled', ->
    element = compile('<div fs-select items="items" ng-disabled="true"></div>')
    $scope.$apply()
    expect(element.find('input').prop('disabled')).toBeDefined()

  it 'should propagate classes to widget root', ->
    element = compile('<div fs-select items="items" class="someclass"></div>')
    $scope.$apply()
    expect(element.attr('class')).toMatch /someclass/

  it 'should update scope property', ->
    element = compile('<div fs-select ng-model="value" items="items"></div>')
    $scope.$apply()
    input = element.find('input')
    input.val($scope.items.first).triggerHandler('input')

    expect($scope.value).toBe $scope.items.first

  it 'should clear scope value when "x" button is pressed', ->
    element = compile('<div fs-select ng-model="value" items="items"></div>')
    $scope.$apply(-> $scope.value = $scope.items.first)
    expect($scope.value).toBe $scope.items.first

    element.find('.fs-select-clear-btn').click()
    expect($scope.value).toBe(null)

  it 'should set scope value exactly as it was in items array', ->
    $scope.items = [
      { id: 1, label: "first" },
      { id: 2, label: "second" }
    ]

    element = compile('<div fs-select ng-model="value" items="items">{{ item.label }}</div>')
    element.find('input').val('first').triggerHandler('input')
    expect($scope.value).toBe $scope.items.first

  it 'should apply custom template for item', ->
    element = compile('<div fs-select ng-model="value" items="items"><span class="bang"></span>{{ item }}</div>')
    $scope.$apply(-> $scope.value = $scope.items.first)
    expect(element.find(".fs-select-active .bang").length).toBe(1)
