describe 'fsDatetime', ->
  $scope = null
  $compile = null

  beforeEach module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_

  compile = (elem) ->
    elem ||= '<div fs-datetime></div>'
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

  equalsDates = (first, second) ->
    expect(first.getDate()).toEqual second.getDate()
    expect(first.getMonth()).toEqual second.getMonth()
    expect(first.getFullYear()).toEqual second.getFullYear()

  equalsTimes = (first, second) ->
    expect(first.getHours()).toEqual second.getHours()
    expect(first.getMinutes()).toEqual second.getMinutes()

  equalsDatetimes = (first, second) ->
    equalsDates(first, second)
    equalsTimes(first, second)

  it 'should expand', ->
    element = compile()
    expect(element.children().length).not.toBe 0

  it 'should set date', ->
    element = compile('<div fs-datetime ng-model="value"></div>')
    element.find('.fs-date input').val('01/01/2012').triggerHandler('input')
    equalsDates($scope.value, date(day: 1, month: 0, year: 2012))

  it 'should set time', ->
    element = compile('<div fs-datetime ng-model="value"></div>')
    element.find('.fs-time input').val('12:02').triggerHandler('input')
    equalsTimes($scope.value, date(hours: 12, minutes: 2))

  it 'should set time and date', ->
    element = compile('<div fs-datetime ng-model="value"></div>')
    element.find('.fs-time input').val('12:02').triggerHandler('input')
    element.find('.fs-date input').val('01/01/2012').triggerHandler('input')
    equalsDatetimes($scope.value, date(day: 1, month: 0, year: 2012, hours: 12, minutes: 2))

    element.find('.fs-date input').val('01/02/2012').triggerHandler('input')
    equalsDatetimes($scope.value, date(day: 2, month: 0, year: 2012, hours: 12, minutes: 2))

    element.find('.fs-time input').val('23:06').triggerHandler('input')
    equalsDatetimes($scope.value, date(day: 2, month: 0, year: 2012, hours: 23, minutes: 6))

  it 'should update view', ->
    $scope.value = date(year: 2010, month: 1, day: 1, hours: 12, minutes: 3)
    element = compile('<div fs-datetime ng-model="value"></div>')
    expect(element.find('.fs-date input').val()).toBe '02/01/2010'
    expect(element.find('.fs-time input').val()).toBe '12:03'

    $scope.value = null
    $scope.$apply()
    expect(element.find('.fs-date input').val()).toBe 'Invalid date'
    expect(element.find('.fs-time input').val()).toBe ''

