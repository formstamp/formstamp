require('../../src/coffee/time.coffee')

describe 'fsTime', ->
  $scope = null
  $compile = null

  beforeEach angular.mock.module('formstamp')

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

  it 'should update viewValue', ->
    $scope.value = '12:00'
    element = compile('<div fs-time ng-model="value"></div>')
    textValue = element.find('input').val()
    expect(textValue).toBe '12:00'

  it 'should update model', ->
    element = compile('<div fs-time ng-model="value"></div>')
    element.find('input').val('12:00').triggerHandler('input')
    expect($scope.value).toEqual '12:00'
