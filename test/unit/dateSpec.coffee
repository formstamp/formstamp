date = (elems) ->
  m = Date.UTC(elems.year,
    elems.month - 1,
    elems.day)

  new Date(m)

describe 'fsDate', ->
  require '../../src/coffee/date'
  require '../../src/coffee/config'

  $scope = null
  $compile = null
  input = null

  beforeEach angular.mock.module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_

  compile = (elem) ->
    element = $compile(elem)($scope)
    $scope.$apply()
    element

  it 'should expand', ->
    element = compile('<div fs-date></div>')
    $scope.$apply()
    expect(element.children().length).not.toBe 0

  it 'should set view by model', ->
    $scope.value = date(day: 1, month: 2, year: 2012)
    console.log "!!!!", $scope.value
    element = compile('<div fs-date ng-model="value"></div>')
    $scope.$apply()
    expect(element.find('input').val()).toEqual '2/1/12'

  it 'should use date format from attribute', ->
    $scope.value = date(day: 27, month: 10, year: 2011)
    element = compile('<div fs-date ng-model="value" format="yyyy/dd/MM"></div>')
    $scope.$apply()
    expect(element.find('input').val()).toEqual '2011/27/10'
