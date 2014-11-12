describe 'fsRadio', ->
  require '../../src/coffee/radio'
  $scope = null
  $compile = null
  element = null

  beforeEach angular.mock.module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_

  beforeEach ->
    $scope.items = [{id: 1, label: 'one'}, {id: 2, label: 'two'}]
    element = $compile('<div fs-radio ng-model="value" items="items"></div>')($scope)
    $scope.$apply()

  it 'should expands', ->
    expect(element.children().length).not.toBe 0

  it 'should render items', ->
    expect(element.find('.fs-radio-item').length).toBe 2

    $scope.items.push({id: 3, label: 'three' })
    $scope.$apply()
    expect(element.find('.fs-radio-item').length).toBe 3

  it 'should render template', ->
    element = $compile('<div fs-radio ng-model="value" items="items">Cutsom Template</div>')($scope)
    $scope.$apply()
    expect(element.find('.fs-radio-item label').first().text().trim()).toBe 'Cutsom Template'

  xit 'should set view by model', ->
    $scope.value = {id: 1, label: 'one'}
    $scope.$apply()
    expect(element.find('.fs-radio-item input').first().prop('checked')).toBe true

  it 'should set model by view', ->
    element.find('.fs-radio-item input').first().prop('checked', true).click()
    $scope.$apply()
    expect($scope.value.id).toEqual 1
    expect($scope.value.label).toEqual 'one'



