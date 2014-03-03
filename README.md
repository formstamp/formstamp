FORM STAMP
====

Pure AngularJS widgets set:

* designed with only front-end in mind (ununabtrusive)
* styled with Twitter Bootstrap
* and written with clean & minimalistic code.

[Live Demo](http://formstamp.github.io/)

Structure
------------

There are 3 levels of directives:

* Low level directives - common concerns for widgets construction, can be used for building you own widgets
* Form Directives - minimalistic set (20/80) of input directives
* Form Builder - orchestrates form workflow: markup boilerplate, errors etc.

Low level directives
---------

* `fs-list` - render list by template & move operations
* `fs-null-form` - hide internal widget ngModels from top level formController
* `fs-input` - simplify keyboard events bindings on text input

Form input directives
---------

* `fs-select` - select input
* `fs-select` freetext - combobox input
* `fs-multiselect` - multi select
* `fs-multiselect` freetext - tags input
* `fs-time` - time input
* `fs-calendar` - time input
* `fs-date` - time input
* `fs-datetime` - time input
* `fs-radio` - radio buttons group
* `fs-check` - checkboxes group


Form builder
-----------

* `from-for` - form builder, no markup & errors boilerplate
* `fs-input` - render row with input in form builder
* `fs-row` - render custom row

TODO
----
  * I18n

Installation for Development
-----------

### Node.js

    curl https://raw.github.com/creationix/nvm/master/install.sh | sh # install nvm
    nvm install 0.10
    cd /path/to/formstamp
    nvm use 0.10
    npm install # server deps
    bower install # demo deps
    `npm bin`/grunt watch # Then start watching changes
    node server.js 3000 # Run server default port 17405


NOTE: This script adds `nvm` command to `.bash_profile`. It may not work if you are not using `bash` shell
(like `zsh`). In this case you have to manually configure profile file.

