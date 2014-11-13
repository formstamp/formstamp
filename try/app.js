app  = angular.module('app', ['formstamp'])
app.run(function(){
  console.log('Configure app')
})

app.controller('FormBuilderCtrl', function($scope){
  $scope.samurai = { name: "Unnamed", districts: [] };

  $scope.learningStages = [
{id: 'S', label: 'Shu'},
{id: 'H', label: 'Ha'},
{id: 'R', label: 'Ri'}
];

$scope.weapons = [
{id: '1', label: 'Katana'},
{id: '2', label: 'Naginata'},
{id: '3', label: 'Yari'},
{id: '4', label: 'Horagai'},
{id: '5', label: 'Horimono'}
];

$scope.meals = [
{id: 'me', label: 'Meat'},
{id: 'mi', label: 'Milk'},
{id: 'or', label: 'Orange'},
{id: 'ri', label: 'Rice'}
];

$scope.otherFacts = [
'Uruwashii', 'Buke', 'Mononofu', 'Musha', 'Rōnin', 'Shi', 'Tsuwamono'
];

$scope.weaponStyles = ['Kenjutsu', 'Naginatajutsu', 'Sōjutsu'];

$scope.districts = [
'Kita District',
  'Tsugaru District',
  'Hei District',
  'Iwai District',
  'Akita District',
  'Tagawa District',
  'Murayama District',
  'Okitama District',
  'Aizu District',
  'Shirakawa District',
  'Ibaraki District',
  'Tsuga District',
  'Habu District',
  'Sōma District',
  'Katsushika District',
  'Saitama District',
  'Adachi District',
  'Toshima District',
  'Tama District',
  'Kanbara District',
  'Uonuma District',
  'Kubiki District',
  'Niikawa District',
  'Tsuru District',
  'Yamanashi District',
  'Yatsushiro District',
  'Koma District',
  'Saku District',
  'Takai District',
  'Minochi District',
  'Ina District',
  'Chikuma District',
  'Azumi District',
  'Ishizu District',
  'Shitara District',
  'Kamo District',
  'Kasugai District',
  'Muro District',
  'Azai District',
  'Kuwata District',
  'Ukena District',
  'Uwa District',
  'Matsuura District',
  'Sonogi District',
  'Takaki District',
  'Kunisaki District',
  'Amabe District',
  'Usuki District',
  'Naka District',
  'Ōsumi District',
  'Soo District',
  'Isa District'
  ];
  })

app.directive('customValidation', function() {
return {
  restrict: "A",
  require : 'ngModel',
  link : function($scope, element, attrs, ngModel) {
    console.log('customValidation')
    ngModel.$validators.ups = function(value) {
      console.log('customValidation', value)
      return value == 'formstamp';
    };
  }
}});

app.directive('customValidationFuture', function() {
return {
  restrict: "A",
  require : 'ngModel',
  link : function($scope, element, attrs, ngModel) {
    console.log('customValidationFuture')
    ngModel.$validators.future = function(value) {
      var now = new Date()
      console.log('future validation', value)
      return value && now < value;
    };
  }
}});
