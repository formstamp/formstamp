FormStamp
====

[![Build Status](https://travis-ci.org/formstamp/formstamp.png?branch=master)](https://travis-ci.org/formstamp/formstamp)

[![Gitter chat](https://badges.gitter.im/formstamp/formstamp.png)](https://gitter.im/formstamp/formstamp)

***This project is under development. Some API may be changed.***

FormStamp is a pure AngularJS widgets library designed for rich
front-end web applications. FormStamp core principles are:

* all widgets are written from scratch;
* maximum AngularJS compatibility (supports ngDisabled, ngModel and
  other standard directives);
* styled with Twitter Bootstrap;
* clean & minimalistic codebase.

[Live Demo](http://formstamp.github.io/)

Installation
------------

FormStamp can be installed via [Bower Package Manager](http://bower.io/):

    bower install angular-formstamp

Structure
------------

There are 3 levels of directives:

* Form Builder - orchestrates building of complex forms; provides
  simple DSL-like markup for describing forms and hides complex markup
  from you.
* Widget directives - most often used widgets.
* Low-level directives - common concerns for widgets construction, can
  be used to build your own custom widgets.

Form Builder
-----------

* `fsFormFor` - root form builder directive;
* `fsInput` - renders a row with input in form builder;
* `fsRow` - renders a custom row.

Widget Directives
---------

* `fsSelect` - select input with free text support (select/combo);
* `fsMultiselect` - multiple select input with free text support;
* `fsTime` - time input;
* `fsDate` - date input with `fsCalendar` inside dropdown;
* `fsDatetime` - widget composed from `fsTime` and `fsDate` to enter
  both date and time;
* `fsRadio` - a group of radiobuttons;
* `fsCheck` - a group of checkboxes.

Low-level Directives
---------

* `fsList` - renders a list of items and allows to move selection up and
  down (with custom templating for items);
* `fsNullForm` - hides input with ngModel binding from a parent form;
* `fsInput` - simplifies keyboard & focus events handling;
* `fsCalendar` - draws a calendar and allows to mark one day as selected.

TODO
----
  * support I18n

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

Build, start server and start watching changes using

    grunt serve              # server starts on port 17405 by default
    grunt serve --port 3000  # specify port

Now, point your browser to http://localhost:17405/ and you'll see
FormStamp's demo page.

NOTE: These commands add `nvm` command to `.bash_profile`. It may not
work if you are not using `bash` shell (like `zsh`). In this case you
have to manually configure profile file.

Running Tests
-------

Before run test suite:

    `npm bin`/webdriver-manager update

To run protractor tests you could use:

    grunt test:e2e:phantomjs
    grunt test:e2e:chrome
    grunt test:e2e:firefox

Alse you can provide option to protractor test to run specific test:

    grunt test:e2e:chrome --specs test/build/e2e/fsDateSpec.js

Then you can run unit tests with following command:

    `npm bin`/karma start test/karma.conf.js --single-run

License
-------

FormStamp is released under
[MIT License](https://raw.github.com/formstamp/formstamp/master/MIT-LICENSE).
