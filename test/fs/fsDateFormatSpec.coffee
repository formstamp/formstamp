describe 'fsDateFormat', ->
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

  beforeEach ->
    input = compile('<input type="text" fs-date-format ng-model="value" />')

  it 'should format date', ->
    $scope.value = date(day: 1, month: 1, year: 2012)
    $scope.$apply()
    expect(input.val()).toEqual '02/01/2012'

  it 'should parse date', ->
    input.val('03/02/2012').triggerHandler('input')
    expect($scope.value).toEqual date(day: 2, month: 2, year: 2012)

  it 'should set model to null if view is empty', ->
    expect($scope.value).toBe undefined
    input.val('').triggerHandler('input')
    expect($scope.value).toBe null

  it 'should set value to null if input is invalid', ->
    input.val('invalid date').triggerHandler('input')
    expect($scope.value).toBe null

    input.val('21/40/2033').triggerHandler('input')
    expect($scope.value).toBe null
