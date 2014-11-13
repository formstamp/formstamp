describe 'fsDateFormat', ->
  si = require '../../src/coffee/smartInput'

  it "test #timeInput", ()->
    subject = si.timeInput

    expect(subject('')).toEqual('')
    expect(subject('a')).toEqual('')
    expect(subject('0')).toEqual('0')
    expect(subject('2')).toEqual('2')
    expect(subject('9')).toEqual('09:')

    expect(subject('15')).toEqual('15:')
    expect(subject('23')).toEqual('23:')
    expect(subject('28')).toEqual('2')
    expect(subject('2a')).toEqual('2')


  it "test #timeLastFix", ()->
    subject = si.timeLastFix

    expect(subject('10')).toEqual('10:00')
    expect(subject('10:')).toEqual('10:00')
    expect(subject('10:5')).toEqual('10:05')
    expect(subject('10:13')).toEqual('10:13')


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
