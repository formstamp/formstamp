describe 'fsTime', ->
  $scope = null
  $compile = null

  beforeEach module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_

  compile = (elem) ->
    elem ||= '<div fs-time></div>'
    element = $compile(elem)($scope)
    $scope.$apply()
    element

  it 'should expands', ->
    element = compile()
    expect(element.children().length).not.toBe 0

  it 'should disable input on ngDisabled', ->
    element = compile('<div fs-time ng-disabled="true"></div>')
    $scope.$apply()
    expect(element.find('input').prop('disabled')).toBeDefined()

  it 'should propagate classes to widget root', ->
    element = compile('<div fs-time class="cool-class"></div>')
    $scope.$apply()
    expect(element.attr('class')).toMatch /cool-class/

  it 'should update scope model by input', ->
    element = compile('<div fs-time ng-model="value"></div>')
    $scope.$apply()
    input = element.find('input')
    input.val('12:00').triggerHandler('input')

    expect($scope.value.getHours()).toBe 12
    expect($scope.value.getMinutes()).toBe 0

    input.val('').triggerHandler('input')
    expect($scope.value.getHours()).toBe 0
    expect($scope.value.getMinutes()).toBe 0
