describe 'fsDateFormat', ->
  si = require '../../src/coffee/smartInput'
  timeInput = si.timeInput

  it "test", ()->

    expect(timeInput('')).toEqual('')
    expect(timeInput('a')).toEqual('')
    expect(timeInput('0')).toEqual('0')
    expect(timeInput('2')).toEqual('2')
    expect(timeInput('9')).toEqual('09:')

    expect(timeInput('15')).toEqual('15:')
    expect(timeInput('23')).toEqual('23:')
    expect(timeInput('28')).toEqual('2')
    expect(timeInput('2a')).toEqual('2')

# describe 'fsTimeFormat', ->
#   require '../../src/coffee/timeFormat'
#   $scope = null
#   input  = null

#   beforeEach angular.mock.module('formstamp')

#   beforeEach inject ($rootScope, $compile) ->
#     $scope = $rootScope.$new()
#     input = $compile('<input fs-time-format ng-model="value"/>')($scope)
#     $scope.$apply()

#   it 'should expand time from 1224 to 12:24 in input', ->
#     input.val('1224').triggerHandler('input')
#     expect(input.val()).toEqual '12:24'
#     expect($scope.value).toEqual '12:24'

#   it 'sholudnt allow to enter invalid value', ->
#     input.val('abc').triggerHandler('input')
#     expect($scope.value).toBe ''

#     input.val('3').triggerHandler('input')
#     expect($scope.value).toBe ''

#     input.val('2301').triggerHandler('input')
#     expect($scope.value).toBe '23:01'
