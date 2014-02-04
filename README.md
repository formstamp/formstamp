Angular-w
====

Pure AngularJS widgets.

Description
----------

This library provides full pack of pure AngluarJS widgets.
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
**Required.**
Array of objects: `{code: 'some-code', name: 'some-name'}`.

#### limit
*Optional.*
Limits number of shown `items`. Default: `items.length`.

#### key-attr
*Optional.*
Attribute for retrieving html id from item. Default: 'id'.

#### value-attr
*Optional.*
Attribute for retrieving html label from item. Default: 'label'.

### Templating
Chosen provides templating for selected object by passing html
template inside directive.  You can reference current object by
`item` and access all object's attributes.
```html
  <div w-chz>
    <b>{{item.name}}</b>: {{item.code}}
  </div>
```

### Customizing styles
For style customization library provides class
for user extention. For styling list define css
class `.w-chz .w-chz-items-list` with your own properties.

#### Example usage
```html
  <div ng-controller='CountriesCtrl'>
    <form role="form" class='form-horizontal'> 
      <div class="form-group">
        <label class="col-sm-2 control-label">Chosen</label>
        <div class="col-sm-10">
          <div w-chz
               items="countries"
               limit='30'
               key-attr='code'
               value-attr='name'
               ng-model="value"
               ng-disabled='disabled'
               ng-required='required'>
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
### MultiSelect
Provides basic select-like input. And allows to select
multiple values from provided values. It has support for ng-model,
ng-disabled, ng-required.

### Attributes
Multiselect has same attributes as a Chosen. Also
it has some additional options.

Internals
---------
### Dropdown
Provides basic dropdown. It consits of list
of items and event callbacks on them.

### Attributes
#### opened
*Required*
Idicates whether dropdown is open or not.
If `true` it is open, if `false` it is closed.

#### items
*Required*
List of objects to display in dropdown.

#### value-attr
*Required*
This attribute contains name of field that
will be displayed in dropdown.

#### on-select
*Optional*
This hander will be called if the item
was selected from list. Selected item 
will be passed to the handler. Selecting is mean:
  * clicking on item in list;
  * pressing enter on selected item;
  * pressing tab on selected item.

#### on-click
*Optional*
This hander will be called if item
was selected from list by clicking on it.
Selected item will be passed to the handler.
If `on-click` and `on-select` used simultaneously
then only `on-click` will be called.

#### on-enter
*Optional*
This hander will be called if item
was selected from list pressing `enter`.
Selected item will be passed to the handler.
If `on-enter` and `on-select` used simultaneously
then only `on-enter` will be called.

#### on-tab
*Optional*
This hander will be called if item
was selected from list pressing `tab`.
Selected item will be passed to the handler.
If `on-tab` and `on-select` used simultaneously
then only `on-tab` will be called.

TODO
----
  * Form builder.
  * ng-options support.
  * Make demo github pages.
  * I18n.

### Chosen
 * Add ability for customizing Chosen style (added for list).
 * Different search algorithms.
 * Fully remove jQuery.

### MultiSelect
 * Same as in Chosen.
 * Add options for limiting number (min, max)  of selected values.

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

Then compile CoffeeScript & LESS first time:

    `npm bin`/grunt less coffee

Then start watching changes in less & coffee files:

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
