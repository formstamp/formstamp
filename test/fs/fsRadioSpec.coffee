describe 'fsRadio', ->
  $scope = null
  $compile = null
  element = null

  beforeEach module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_

  beforeEach ->
    $scope.items = [{id: 1, label: 'one'}, {id: 2, label: 'two'}]
    element = $compile('<div fs-radio ng-model="value" items="items"></div>')($scope)
    $scope.$apply()

  it 'should expands', ->
    expect(element.children().length).not.toBe 0

