angular.module('angular-w-demo').controller('RootExampleController', function($scope) {
  $scope.samurai = {};
  $scope.names = ['Akaike', 'Fukushima', 'Imagawa', 'Ishida', 'Matsushita'];
  $scope.genders = [
    { id: 'M',
      label: 'Male' },
    { id: 'F',
      label: 'Female' },
    { id: 'O',
      label: 'Other' }
  ];
  $scope.provinces = [
    { label: 'Chishima', id: 'Ch' },
    { label: 'Hidaka', id: 'Hi' },
    { label: 'Iburi', id: 'Ib' },
    { label: 'Ishikari', id: 'Is' },
    { label: 'Kitami', id: 'Ki' },
    { label: 'Kushiro', id: 'Ku' },
    { label: 'Nemuro', id: 'Ne' },
    { label: 'Oshima', id: 'Os' },
    { label: 'Shiribeshi', id: 'Sh' },
    { label: 'Teshio', id: 'Te' },
    { label: 'Tokachi', id: 'To' }
  ];
  $scope.weapons = [
    { label: 'Katana', id: 'Katana' },
    { label: 'Wakizashi', id: 'Wakizashi' },
    { label: 'Yumi', id: 'Yumi' },
    { label: 'Yari', id: 'Yari' },
    { label: 'Naginata', id: 'Naginata' },
    { label: 'Nadachi', id: 'Nadachi' },
    { label: 'Kanaho', id: 'Kanaho' }
  ];
  $scope.martialArts = [
    { label: 'Battōjutsu', id: 'Ba' },
    { label: 'Bōjutsu', id: 'Bo' },
    { label: 'Hojōjutsu', id: 'Ho' },
    { label: 'Iaijutsu', id: 'Ia' },
    { label: 'Jōjutsu', id: 'Jo' },
    { label: 'Jujutsu', id: 'Ju' },
    { label: 'Juttejutsu', id: 'Jut' },
    { label: 'Kenjutsu', id: 'Ken' },
    { label: 'Kyūjutsu', id: 'Ky' },
    { label: 'Naginatajutsu', id: 'Na' },
    { label: 'Ninjutsu', id: 'Ni' },
    { label: 'Shurikenjutsu', id: 'Sh' },
    { label: 'Sōjutsu', id: 'So' },
    { label: 'Aikido', id: 'Ai' },
    { label: 'Daitō-ryū', id: 'Da' },
    { label: 'Aiki-jūjutsu', id: 'Aik' },
    { label: 'Iaido', id: 'Iai' },
    { label: 'Judo', id: 'Jud' },
    { label: 'Karate', id: 'Ka' },
    { label: 'Kendo', id: 'Ke' },
    { label: 'Kyūdō', id: 'K' },
    { label: 'Nippon', id: 'Ni' },
    { label: 'Kempo', id: 'Kem' },
    { label: 'Shorinji', id: 'Sho' }
  ];
  $scope.teachers = [
    'Akechi Mitsuhide',
    'Date Masamune',
    'Hattori Hanzō',
    'Hōjō Ujimasa',
    'Honda Tadakatsu',
    'Kusunoki Masashige',
    'Minamoto no Yoshitsune',
    'Minamoto no Yoshiie',
    'Miyamoto Musashi',
    'Oda Nobunaga',
    'Saigō Takamori',
    'Saitō Hajime',
    'Sakamoto Ryōma',
    'Sanada Yukimura',
    'Sasaki Kojirō',
    'Shimazu Takahisa',
    'Shimazu Yoshihiro',
    'Takeda Shingen',
    'Tokugawa Ieyasu',
    'Tomoe Gozen',
    'Toyotomi Hideyoshi',
    'Uesugi Kenshin',
    'Yagyū Jūbei Mitsuyoshi',
    'Yagyū Munenori',
    'Yamamoto Tsunetomo',
    'Yamaoka Tesshū'
  ];

  $scope.send = function() {
    $scope.samurai.$error = {}
    if ($scope.samurai.gender.id != 'M')
      $scope.samurai.$error.gender = ['Should be a man!']
  }
})

