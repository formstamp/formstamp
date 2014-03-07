describe 'fsTime', ->
  $scope = null
  $compile = null

  beforeEach module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_

  it 'should expands', ->
    element = $compile('<div fs-time></div>')($scope)
    $scope.$apply()
    expect(element.children().length).not.toBe 0

  it 'should disable input on ngDisabled', ->
    element = $compile('<div fs-time ng-disabled="true"></div>')($scope)
    $scope.$apply()
    expect(element.find('input').prop('disabled')).toBeDefined()

  it 'should propagate classes to widget root', ->
    element = $compile('<div fs-time class="cool-class"></div>')($scope)
    $scope.$apply()
    expect(element.attr('class')).toMatch /cool-class/
