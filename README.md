FormStamp
====

[![Build Status](https://travis-ci.org/formstamp/formstamp.png?branch=master)](https://travis-ci.org/formstamp/formstamp)

[![Gitter chat](https://badges.gitter.im/formstamp/formstamp.png)](https://gitter.im/formstamp/formstamp)


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


Development Environment
-----------

Install node.js

    curl https://raw.github.com/creationix/nvm/master/install.sh | sh # install nvm
    nvm install 0.10

Clone FormStamp repository

    git clone git@github.com:formstamp/formstamp.git

Install bower dependencies and node.js packages

```sh
  cd formstamp
  nvm use 0.10
  npm install
```

Build, start demo server and start watching changes using

```sh

npm start

# open browser @ localhost:8080/index.html

```

Now, point your browser to http://localhost:8080/ and you'll see
FormStamp's demo page.

NOTE: These commands add `nvm` command to `.bash_profile`. It may not
work if you are not using `bash` shell (like `zsh`). In this case you
have to manually configure profile file.

Running Tests
-------

Run unit tests:

```sh

npm test

```

To run protractor tests you could use:

```sh

npm run-script e2e

```

To build bower package in dist/ run:

```sh
npm run-script build
```

License
-------

FormStamp is released under
[MIT License](https://raw.github.com/formstamp/formstamp/master/MIT-LICENSE).
