#!/bin/bash

set +e # break script on first error

# make sure script is run from correct place
if [ ! -d .git ]; then
    echo "ERROR: You should run this script from ROOT of formstamp GIT repo"
    echo "Example: cd formstamp && ./release.sh"
    exit 1
fi

# make sure formstamp.github.io repo exist
if [ ! -d ../bower-formstamp/.git ]; then
    CWD=`pwd`
    echo "ERROR: You should have bower-formstamp repo as a sibling directory of formstamp main repo. Run following command:"
    echo "cd `dirname $CWD` && git clone git@github.com:formstamp/bower-formstamp.git"
    exit 1
fi

source ~/.nvm/nvm.sh # make sure nvm command is available

# install dependencies
bower install

# force compilation of all assets
nvm use 0.10
`npm bin`/webpack

cd ../bower-formstamp
git checkout .
git pull -f origin master

cd ../formstamp
mkdir -p ../bower-formstamp/build
cp dist/formstamp.css ../bower-formstamp/
cp dist/formstamp.js  ../bower-formstamp/
cp bower.json          ../bower-formstamp/

cd ../bower-formstamp
git add .
git commit -a -m "release at `date` by `git config --get user.name`"
git push origin master

echo "-----------------------"
echo "Released successfully!"
echo "Don't forget to bump package version (make new tag in bower-formstamp repo & push it)"
