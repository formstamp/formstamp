ng-w
====

Pure angularjs widgets.

Description
----------

This library provides full pack of pure angluarjs widgets.
List of available widgets:
  * Chosen
  * Support more later

Widgets
-------

### Chosen
Provides basic select-like input. It allows to select
one value from provided values. It has support for ng-model,
ng-disabled, ng-required.

### Attributes
#### items
Array of objects: `{code: 'some-code', name: 'some-name'}`

#### limit
Limits number of elements in `items` that will be used.

#### keyFn
Function for retrieving key

#### valueFn
Function for retrieving value

### Templating
Chosen provides templating for selected value by passing html
template inside directive.  You can reference current item by
`item`. `item` has `code` and `name` properties.
```html
  <div w-chz>
    <b>{{item.name}}</b>: {{item.code}}
  </div>
```

#### Example usage
```html
  <div ng-controller='CountriesCtrl'>
    <form role="form" class='form-horizontal'> 
      <div class="form-group">
        <label class="col-sm-2 control-label">Chosen</label>
        <div class="col-sm-10">
          <div w-chz items="items" ng-model="value" ng-disabled='disabled1' ng-required='required'>
            <b>{{item.name}}</b>: {{item.code}}
          </div>
        </div>
      </div>
    </div>
  </div>
```

```javascript
  angular.module('countries').controller('CountriesCtrl', function($scope) {
      $scope.countries = [
        {name: 'Afghanistan', code: 'AF'},
        {name: 'Åland Islands', code: 'AX'},
        {name: 'Albania', code: 'AL'},
        {name: 'Algeria', code: 'DZ'},
        {name: 'American Samoa', code: 'AS'}];
  });
```

TODO
----
  * Form builder.
  * ng-options support.
### Chosen
 * Remove submit by enter on selecting element.
 * Add abilty for customizing Chosen style.
 * Differen search algorithms.

Installation for Development
-----------

### Node Version Manager

    curl https://raw.github.com/creationix/nvm/master/install.sh | sh

Then follow the instructions.

NOTE: This script adds `nvm` command to `.bash_profile`. It may not work if you are using not `bash` shell
(like `zsh`). In this case you have to manually configure profile file.

### Node.js

    nvm install 0.10

### Node Package Modules

    cd /path/to/ng-w
    npm install

### Grunt

    npm install grunt-cli

Then compile CoffeeScript first time:

    `npm bin`/grunt compile

Then start watching CoffeeScript:

    `npm bin`/grunt watch

### Nginx

Install the Nginx.

Then configure:

    sed -i 's|http {|http {\nserver {listen 55555; root /path/to/ng-w;}|' \
        /path/to/nginx/nginx.conf

Then restart nginx. Navigate your browser to http://localhost:55555/demo

### Troubleshooting

#### Node Package Modules

If `The program 'npm' is currently not installed.`
Then try `nvm use 0.10`.
