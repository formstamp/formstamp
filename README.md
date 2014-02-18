Angular-w
====

Pure AngularJS widgets.

Description
----------

This library provides full pack of pure AngluarJS widgets.

Form builder
-----------
Form bulider builds angular-compatible forms using widgets
provided by this library. It supports errors and validations.

### Using
```
    <form w-form-for='samurai' ng-submit='send()'>
      <div w-field='name' label='Name' type='w-combo' items='names'></div>
      <div w-field='age' label='Age' type='w-chz'  items='ages'></div>

      <div w-submit-field>Save</div>
    </form>
```

### Errors
Objects errors are extracted from its model passed to wFormFor attribute.
It should next format:
```javascript
  {
    name: ..., /* this is custom field */
    age: ..., /* this is custom field */
    /* other custom attrs */,
    $error: { /* this is special field */
      name: ['Too bad!', 'Ugly!'],
      age: ['Too young!']
    }
  }
  

### Submiting
For form submitting use `w-submit`. It prevents for submiting if form is invalid.
Function call submit handler SHOULD! update model passed to `w-form-for`.

```

Example of handler: 
```javascript
  $scope.send = function() {
    $http.post('/').success(function(data) {
      $scope.samurai = data;
    });
  }
```

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
MultiSelect allows to select multiple items from a predefined list of options. Supported angular directives and options are similar to Select.

### Attributes
MultiSelect has the same set of attributes as Chosen.

### Combo
Combo provides basic combo behavior. It allows to select a value from a predefined list of options or to enter custom value.
Only primitive types are supported as options. Supports several angular directives: ng-model, ng-disabled, ng-required.

### Attributes
#### items
*Required*.
Array of items. `toString` will be called on item when retrieving it
from list.

#### limit
*Optional.*
Limits number of shown `items`. Default: `items.length`.

### Templating
Combo provides templating for selected object by passing html
template inside directive.  You can reference current object by
`item`.
```html
  <div w-combo>
    <b>{{item}}</b>
  </div>
```

### Tags
Provides basic combo-like input and allows to select
multiple values from provided values. It has support for ng-model,
ng-disabled, ng-required.

### Attributes
Multiselect has only items and limit attributes.

TODO
----
  * Form builder.
  * ng-options support.
  * Make demo github pages.
  * I18n.

### Chosen
 * Add ability for customizing Chosen style (added for list).
 * Different search algorithms.
 * Delegate id and name to input.
 * Fully remove jQuery.
 * Add select option, for providing selected value.
 * Support array of primitives.

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

Then build it at first time:

    `npm bin`/grunt build

Then start watching changes:

    `npm bin`/grunt watch

### Expressjs
To run demo:
    `node server.js`
You can specify port as a second first argument:
    `node server.js 3000`
Default port is 17405.

### Troubleshooting

#### Node Package Modules

If `The program 'npm' is currently not installed.`
Then try `nvm use 0.10`.
