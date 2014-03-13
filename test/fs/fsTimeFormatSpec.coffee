describe 'fsTimeFormat', ->
  $scope = null
  $compile = null
  input = null

  beforeEach module('formstamp')

  beforeEach inject ($rootScope, _$compile_) ->
    $scope = $rootScope.$new()
    $compile = _$compile_

  describe 'updating model', ->
    beforeEach ->
      input = $compile('<input fs-time-format ng-model="value" />')($scope)
      $scope.$apply()

    it 'should expand time from 1224 to 12:24 in input', ->
      input.val('1224').triggerHandler('input')
      expect(input.val()).toEqual '12:24'

    it 'sholudnt allow to enter invalid value', ->
      input.val('abc').triggerHandler('input')
      expect($scope.value).toBe null

      input.val('3').triggerHandler('input')
      expect($scope.value).toBe null

      input.val('2301').triggerHandler('input')
      expect($scope.value).toBe '23:01'
