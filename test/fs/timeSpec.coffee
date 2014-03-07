'use strict'

describe 'fsTime', ->
  $scope = null
  $compile = null
  element = null

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_
    element = $compile('<div></div>')($scope)

  it 'should expands', ->
    element.append($compile('<div fs-time></div>')($scope))
    $scope.$apply()
    expect(element.children().length).not.toBe(0)

