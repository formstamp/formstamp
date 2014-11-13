date = (elems) ->
  res = new Date()
  res.setMilliseconds(0)
  res.setSeconds(elems.seconds || 0)
  res.setMinutes(elems.minutes || 0)
  res.setHours(elems.hours || 0)
  res.setDate(elems.day) if elems.day?
  res.setMonth(elems.month - 1) if elems.month?
  res.setFullYear(elems.year) if elems.year?
  res

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
    $scope.value = date(day: 1, month: 2, year: 2010)
    element = compile('<div fs-date ng-model="value"></div>')
    $scope.$apply()
    expect(element.find('input').val()).toEqual '2/1/10'

  it 'should use date format from attribute', ->
    $scope.value = date(day: 27, month: 10, year: 2010)
    element = compile('<div fs-date ng-model="value" format="yyyy/dd/mm"></div>')
    $scope.$apply()
    expect(element.find('input').val()).toEqual '10/26/10'
