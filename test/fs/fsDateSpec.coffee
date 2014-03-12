describe 'fsDate', ->
  $scope = null
  $compile = null
  input = null

  beforeEach module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_

  compile = (elem) ->
    element = $compile(elem)($scope)
    $scope.$apply()
    element

  date = (elems) ->
    res = new Date()
    res.setMilliseconds(0)
    res.setSeconds(elems.seconds || 0)
    res.setMinutes(elems.minutes || 0)
    res.setHours(elems.hours || 0)
    res.setDate(elems.day) if elems.day?
    res.setMonth(elems.month) if elems.month?
    res.setFullYear(elems.year) if elems.year?
    res

  it 'should expands', ->
    element = compile('<div fs-date></div>')
    expect(element.children().length).not.toBe 0

  it 'should set view by model', ->
    $scope.value = date(day: 1, month: 2, year: 2010)
    element = compile('<div fs-date ng-model="value"></div>')
    expect(element.find('input').val()).toEqual '3/1/10'
