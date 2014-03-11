FormStamp
====

[![Build Status](https://travis-ci.org/formstamp/formstamp.png?branch=master)](https://travis-ci.org/formstamp/formstamp)

FormStamp is a pure AngularJS widgets library designed for rich
front-end web applications. FormStamp core principles are:

* all widgets are written from scratch
* maximum AngularJS compatibility (support ngDisabled, ngModel and
  other standard directives)
* styled with Twitter Bootstrap
* clean & minimalistic codebase.

[Live Demo](http://formstamp.github.io/)

Installation
------------

FormStamp can be installed via [Bower Package Manager](http://bower.io/):

    bower install formstamp

Structure
------------

There are 3 levels of directives:

* Form Builder - orchestrates building of complex forms; provides
  simple DSL-like markup for describing forms and hides complex markup
  from you.
* Widget directives - most often used widgets
* Low-level directives - common concerns for widgets construction, can
  be used to build your own custom widgets

Form Builder
-----------

* `fsFromFor` - root form builder directive
* `fsInput` - renders row with input in form builder
* `fsRow` - renders custom row

Widget Directives
---------

* `fsSelect` - select input with freetext support (select/combo)
* `fsMultiselect` - multiple select input with freetext support
* `fsTime` - time input
* `fsDate` - date input with `fsCalendar` inside dropdown
* `fsDatetime` - widget composed from `fsTime` and `fsDate` to enter
  both date and time
* `fsRadio` - radio buttons group
* `fsCheck` - checkboxes group

Low-level Directives
---------

* `fsList` - renders list of items and allows to move selection up and
  down (with custom templating for items)
* `fsNullForm` - hides input with ngModel binding from parent form
* `fsInput` - simplifies keyboard & focus events handling
* `fsCalendar` - draws a calendar and allows to mark one day as selected

TODO
----
  * I18n support

Development Environment
-----------

Install node.js

    curl https://raw.github.com/creationix/nvm/master/install.sh | sh # install nvm
    nvm install 0.10

Clone FormStamp repository

    git clone git@github.com:formstamp/formstamp.git

Install bower dependencies and node.js packages

    cd formstamp
    nvm use 0.10
    npm install # server deps
    bower install # demo deps

Start grunt watcher and node.js server

    `npm bin`/grunt watch # Then start watching changes
    node server.js 17405 # Run server at port 17405

Now, point your browser to http://localhost:17405/ and you'll see
FormStamp's demo page.

NOTE: These commands add `nvm` command to `.bash_profile`. It may not
work if you are not using `bash` shell (like `zsh`). In this case you
have to manually configure profile file.

Running Tests
-------

To run test suite you should start local web server and
[PhantomJS](http://phantomjs.org/) server:

    cd formstamp
    node server.js
    `npm bin`/phantomjs --webdriver=4444

Next, compile CoffeeScript in test directory with command:

    `npm bin`/grunt coffee:e2e

Then you can run unit tests with following command:

    `npm bin`/karma start test/karma.conf.js --single-run

And E2E tests with:

     `npm bin`/protractor test/build/e2e/conf.js

License
-----------

FormStamp is released under
[MIT License](https://raw.github.com/formstamp/formstamp/master/MIT-LICENSE).
