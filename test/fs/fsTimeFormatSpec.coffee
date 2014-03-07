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

    it 'should update scope model by input', ->
      input.val('12:00').triggerHandler('input')
      expect($scope.value.hours).toBe 12
      expect($scope.value.minutes).toBe 0

    it 'should set time to null if no time specified', ->
      expect($scope.value).toBe undefined

      input.val('').triggerHandler('input')
      expect($scope.value).toBe null

    it 'should expand time from 1224 to 12:24', ->
      input.val('1224').triggerHandler('input')
      expect($scope.value.hours).toBe 12
      expect($scope.value.minutes).toBe 24

    it 'sholudnt allow to enter invalid value', ->
      input.val('abc').triggerHandler('input')
      expect($scope.value).toBe null

      input.val('3').triggerHandler('input')
      expect($scope.value).toBe null

      input.val('26').triggerHandler('input')
      expect($scope.value.hours).toBe 2
      expect($scope.value.minutes).toBe null

      input.val('23:7').triggerHandler('input')
      expect($scope.value.hours).toBe 23
      expect($scope.value.minutes).toBe null

  describe 'updating view', ->
    it 'should update view by model', ->
      $scope.value =
        hours: 12
        minutes: 1
      input = $compile('<input fs-time-format ng-model="value" />')($scope)
      $scope.$apply()
      expect(input.val()).toBe '12:01'

    it 'should set view to empty string in model is empty', ->
      input = $compile('<input fs-time-format ng-model="value" />')($scope)
      $scope.$apply()
      expect(input.val()).toBe ''


