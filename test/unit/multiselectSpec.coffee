describe 'fsMultiselect', ->
  require '../../src/coffee/multiselect'
  $scope = null
  $compile = null

  beforeEach angular.mock.module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $scope.items = ['first', 'second', 'last']
    $compile = _$compile_

  compile = (elem) ->
    elem ||= '<div fs-multiselect items="items" ng-model="value"></div>'
    element = $compile(elem)($scope)
    $scope.$apply()
    element

  it 'should expand directive', ->
    element = compile()
    expect(element.children().length).not.toBe 0

  it 'should disable input on ngDisabled', ->
    element = compile('<div fs-multiselect items="items" ng-disabled="true"></div>')
    $scope.$apply()
    expect(element.find('input').prop('disabled')).toBeDefined()

  it 'should propagate classes to widget root', ->
    element = compile('<div fs-multiselect items="items" class="someclass"></div>')
    $scope.$apply()
    expect(element.attr('class')).toMatch /someclass/
