#!/bin/sh

npm run-script webdriver-update
webpack-dev-server --content-base . --config webpack.config.js &
npm run-script webdriver-start &
until $(wget -O /dev/null http://127.0.0.1:4444/wd/hub/); do sleep 1; done
`npm bin`/protractor test/protractor.conf.js
