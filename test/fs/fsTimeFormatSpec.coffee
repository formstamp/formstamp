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

    it 'should expand time from 1224 to 12:24', ->
      input.val('1224').triggerHandler('input')
      expect(input.val()).toEqual '12:24'

    it 'sholudnt allow to enter invalid value', ->
      input.val('abc').triggerHandler('input')
      expect($scope.value).toBe null

      input.val('3').triggerHandler('input')
      expect($scope.value).toBe '03:00'

      input.val('26').triggerHandler('input')
      expect($scope.value).toBe '02:00'

      input.val('23:7').triggerHandler('input')
      expect($scope.value).toBe '23:07'

      input.val('2').triggerHandler('input')
      expect($scope.value).toBe '02:00'

      input.val('23').triggerHandler('input')
      expect($scope.value).toBe '23:00'

      input.val('232').triggerHandler('input')
      expect($scope.value).toBe '23:02'

      input.val('2301').triggerHandler('input')
      expect($scope.value).toBe '23:01'

      input.val('2:1').triggerHandler('input')
      expect($scope.value).toBe '02:01'

      input.val('2:13').triggerHandler('input')
      expect($scope.value).toBe '02:13'

      input.val('2:13').triggerHandler('input')
      expect($scope.value).toBe '02:13'

      input.val(':13').triggerHandler('input')
      expect($scope.value).toBe '00:13'
