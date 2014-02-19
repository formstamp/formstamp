angular.module('angular-w-demo')
.controller('RootController', function($scope) {
  $scope.data = [
    {
      "name": "Select",
      "dir_name": "w-chz",
      "description": "This input provides default select-like behavior.\nIt allows to select only one item from predefined list\nor none of them. Supports several angular directives: <code>ng-model</code>,\n<code>ng-disabled</code>, <code>ng-required</code>.\nIn <code>ng-model</code> it holds full object, not only value.\n",
      "alert": "<strong>Warning!</strong>\nYou should never use this and next directives on <code>input</code> tag.\nUse <code>div</code> instead.\n",
      "options": [
        {
          "name": "items",
          "required": true,
          "description": "Option used for setting items list on <code>w-chz</code>.\nValue in it should be a list of objects with two fields:\n<code>id</code> and <code>label</code>. They can be overriden by\n<code>key-attr</code> and <code>value-attr</code> options respiectively.\n",
          "example_html": "<form role='form' ng-controller='ChzItemsCtrl'>\n  <div class='form-group'>\n    <label>Select weapon:</label>\n    <div w-chz items='weapons'></div>\n  </div>\n</form>\n",
          "example_js": "angular.module('angular-w-demo')\n.controller('ChzItemsCtrl', function($scope) {\n  $scope.weapons = [\n    {id: 'katana', label: 'Long sword Katana'},\n    {id: 'yuml', label: 'Longbow Yuml'},\n    {id: 'yari', label: 'Spear Yari'}\n  ];\n}\n"
        },
        {
          "name": "limit",
          "required": false,
          "default": "items.length",
          "description": "If it is set - limits number of items will be used.\n",
          "example_html": "<form role='form' ng-controller='ChzLimitsCtrl'>\n  <div class='form-group'>\n    <label>Select number of weapons:</label>\n    <div w-chz items='numbers' ng-model='numberOfWeapons'></div>\n  </div>\n  <div class='form-group'>\n    <label>Select weapon:</label>\n    <div w-chz items='weapons' limit='numberOfWeapons.id'></div>\n  </div>\n</form>\n",
          "example_js": "angular.module('angular-w-demo')\n.controller('ChzLimitsCtrl', function($scope) {\n  $scope.numbers = [\n    {id: 1, label: 1},\n    {id: 2, label: 2},\n    {id: 3, label: 3}\n  ];\n  $scope.weapons = [\n    {id: 'katana', label: 'Long sword Katana'},\n    {id: 'yuml', label: 'Longbow Yuml'},\n    {id: 'yari', label: 'Spear Yari'}\n  ];\n}\n"
        },
        {
          "name": "key-attr and value-attr",
          "required": false,
          "default": "key-attr='id', value-attr='label'",
          "description": "Overrides default names of fields for id and label of item.\n",
          "example_html": "<form role='form' ng-controller='ChzKeyValuesCtrl'>\n  <div class='form-group'>\n    <label>Select city of Japan:</label>\n    <div w-chz items='cities'  ng-model='city'\n               key-attr='code' value-attr='name'>\n    </div>\n    Name: <b>{{city.name}}</b>\n    <br />\n    Code: <b>{{city.code}}</b>\n  </div>\n</form>\n",
          "example_js": "angular.module('angular-w-demo')\n.controller('ChzKeyValuesCtrl', function($scope) {\n  $scope.cities = [\n    {code: 'JP SPK', name: 'Sapporo'},\n    {code: 'JP SDJ', name: 'Sendai'},\n    {code: 'JP TYO', name: 'Tokyo'},\n    {code: 'JP NGO', name: 'Nagoya'}\n  ];\n}\n"
        },
        {
          "name": "templating",
          "required": false,
          "default": "item[valueAttr]",
          "description": "If some inner html is provided for directive tag,\nthen those html will be used for rendering selected value.\nSelected item is accessible from templating by <code>item</code>\nvariable. By default <code>item['label']</code> will be rendered or if\n<code>value-attr</code> is provided, then <code>item[value-attr]</code> will\nbe used.\n",
          "example_html": "<form role='form' ng-controller='ChzKeyValuesCtrl'>\n  <div class='form-group'>\n    <label>Select city of Japan:</label>\n    <div w-chz items='cities' key-attr='code' value-attr='name'>\n      <div ng-show='item'>\n        <b>{{item.name}}</b>: {{item.code}}\n      </div>\n      <div ng-hide='item'>\n        Please, select a city.\n      </div>\n    </div>\n  </div>\n</form>\n",
          "example_js": "angular.module('angular-w-demo')\n.controller('ChzKeyValuesCtrl', function($scope) {\n  $scope.cities = [\n    {code: 'JP SPK', name: 'Sapporo'},\n    {code: 'JP SDJ', name: 'Sendai'},\n    {code: 'JP TYO', name: 'Tokyo'},\n    {code: 'JP NGO', name: 'Nagoya'}\n  ];\n}\n"
        }
      ]
    },
    {
      "name": "Multiselect",
      "dir_name": "w-multi-select",
      "description": "MultiSelect allows to select multiple items from a predefined list of options.\nSupported angular directives and options are similar to Select.\n",
      "example_html": "<form role='form' ng-controller='MultiSelectCtrl'>\n  <div class='form-group'>\n    <label>Leisure Time:</label>\n    <div w-multi-select\n         ng-model='selectedGames'\n         items='games'>\n    </div>\n  </div>\n  <div>\n    You want to play\n    <ul>\n      <li ng-repeat='item in selectedGames'>\n        {{item.label}}\n      </li>\n    </ul>\n  </div>\n</form>\n",
      "example_js": "angular.module('angular-w-demo')\n.controller('MultiSelectCtrl', ['$scope', function($scope) {\n  $scope.games = [\n    {id: 0, label: 'Dragon Quest'},\n    {id: 1, label: 'Final Fantasy'},\n    {id: 2, label: 'Shin Megami Tensei'}\n  ];\n}]);\n"
    },
    {
      "name": "Combo",
      "dir_name": "w-combo",
      "description": "Combo provides basic combo behavior.\nIt allows to select a value from a predefined list or to enter custom value.\nOnly primitive types are supported as predefined values.\nSupports several angular directives: <code>ng-model</code>,\n<code>ng-disabled</code>, <code>ng-required</code>.\nAvailable options are <code>items</code> and <code>limit</code>.\n",
      "example_html": "<form role=\"form\" ng-controller='ComboCtrl'>\n  <div class=\"form-group\">\n    <label>Choose your element</label>\n    <div w-combo=\"true\"\n         items=\"items\"\n         ng-model=\"element\"></div>\n  </div>\n  Your element is: {{ element || 'none' }}\n</form>\n",
      "example_js": "angular.module('angular-w-demo')\n.controller('ComboCtrl', function($scope) {\n  $scope.items = [ 'earth', 'water', 'fire', 'wind', 'void' ];\n});\n"
    },
    {
      "name": "Tags",
      "dir_name": "w-tags",
      "description": "Tags allows to select multiple values from a predefined\nlist or to enter custom values. Only primitive types are\nsupported as predefined values. Supports several angular\ndirectives: <code>ng-model</code>, <code>ng-disabled</code>,\n<code>ng-required</code>. Available options are <code>items</code>\nand <code>limit</code>. Attributes: <code>items</code> and <code>limit</code>.\n",
      "example_html": "<form role=\"form\" ng-controller='TagsCtrl'>\n  <div class=\"form-group\">\n    <label>Choose your element</label>\n    <div w-tags=\"true\"\n         items=\"items\"\n         limit='20'\n         ng-model=\"elements\">\n    </div>\n    Your elements are:\n    <ul>\n      <li ng-repeat='element in elements'>{{element}}</li>\n    </ul>\n  </div>\n</form>\n",
      "example_js": "angular.module('angular-w-demo')\n.controller('TagsCtrl', function($scope) {\n  $scope.items = [ 'earth', 'water', 'fire', 'wind', 'void' ];\n});\n"
    },
    {
      "name": "Radio",
      "dir_name": "w-radio",
      "description": "Provides default radio-like behaviour. Supports several\nangular directives: <code>ng-model</code>, <code>ng-disabled</code>,\n<code>ng-required</code>. Available option is <code>items</code>.\n",
      "example_html": "<form role=\"form\" ng-controller='RadioCtrl'>\n  <div class=\"form-group\">\n    <label>Choose your katawari</label>\n    <div w-radio=\"true\"\n         items=\"items\"\n         ng-model=\"value\"></div>\n  </div>\n</form>\n",
      "example_js": "angular.module('angular-w-demo')\n.controller('RadioCtrl', function($scope) {\n  $scope.items = [\n    {id: 'S', label: 'Shijima'},\n    {id: 'M', label: 'Musubi'},\n    {id: 'Y', label: 'Yosuga'}\n  ];\n});\n"
    },
    {
      "name": "Checkbox",
      "dir_name": "w-checkbox",
      "description": "Provides default checkbox-like behaviour. Supports several\nangular directives: <code>ng-model</code>, <code>ng-disabled</code>,\n<code>ng-required</code>. Available option is <code>items</code>.\n",
      "example_html": "<form role=\"form\" ng-controller='CheckboxCtrl'>\n  <div class=\"form-group\">\n    <label>What would you like to drink?</label>\n    <div w-checkbox=\"true\"\n         items=\"items\"\n         limit='20'\n         ng-model=\"value\"></div>\n  </div>\n</form>\n",
      "example_js": "angular.module('angular-w-demo')\n.controller('CheckboxCtrl', function($scope) {\n  $scope.items = [\n    {id: 'S', label: 'Shijima'},\n    {id: 'M', label: 'Musubi'},\n    {id: 'Y', label: 'Yosuga'}\n  ];\n});\n"
    },
    {
      "name": "Datepicker",
      "dir_name": "w-datepicker",
      "description": "This is widget for selecting date.\n",
      "example_html": "<form role=\"form\">\n  <div class=\"form-group\">\n    <label>Birth date</label>\n    <div w-datepicker=\"true\"\n         ng-model=\"ronin.birthDate\">\n    </div>\n  </div>\n  He was born on {{ronin.birthDate | date}}\n</form>\n"
    }
  ]
});
