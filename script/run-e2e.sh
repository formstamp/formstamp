#!/bin/sh

npm run-script webdriver-update
npm start &
npm run-script webdriver-start &
until $(wget -O /dev/null http://127.0.0.1:4444/wd/hub/); do sleep 1; done
npm run-script protractor
