#!/bin/sh

`npm bin`/webdriver-manager update --standalone

script/devserver.sh &
`npm bin`/webdriver-manager start &
`npm bin`/protractor test/protractor.conf.js
