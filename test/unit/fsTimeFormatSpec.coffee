ddescribe 'fsTimeFormat', ->
  $scope = null
  input  = null

  beforeEach angular.mock.module('formstamp')

  beforeEach inject ($rootScope, $compile) ->
    $scope = $rootScope.$new()
    input = $compile('<input fs-time-format ng-model="value"/>')($scope)
    console.log(input)
    $scope.$apply()

  it 'should expand time from 1224 to 12:24 in input', ->
    input.val('1224').triggerHandler('input')
    expect(input.val()).toEqual '12:24'
    expect($scope.value).toEqual '12:24'

  it 'sholudnt allow to enter invalid value', ->
    input.val('abc').triggerHandler('input')
    expect($scope.value).toBe ''

    input.val('3').triggerHandler('input')
    expect($scope.value).toBe ''

    input.val('2301').triggerHandler('input')
    expect($scope.value).toBe '23:01'
