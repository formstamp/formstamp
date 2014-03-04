#!/bin/bash

# formstamp.github.io deploy script
# run it from repository root
set +e # break script on first error

# make sure script is run from correct place
if [ ! -d .git ]; then
    echo "ERROR: You should run this script from ROOT of formstamp GIT repo"
    echo "Example: demo/deploy.sh"
    exit 1
fi

# make sure formstamp.github.io repo exist
if [ ! -d ../formstamp.github.io/.git ]; then
    CWD=`pwd`
    echo "ERROR: You should have formstamp.github.io repo as a sibling directory of formstamp main repo. Run following command:"
    echo "cd `dirname $CWD` && git clone git@github.com:formstamp/formstamp.github.io.git"
    exit 1
fi

source ~/.nvm/nvm.sh # make sure nvm command is available

# install dependencies
bower install

# force compilation of all assets
nvm use 0.10
`npm bin`/grunt build

cd ../formstamp.github.io
git checkout .
git pull -f origin master

cd ../formstamp
cp -r bower_components ../formstamp.github.io/
cp -r build ../formstamp.github.io/
cp -r demo ../formstamp.github.io/
cp index.html ../formstamp.github.io/
cp README.md ../formstamp.github.io/

cd ../formstamp.github.io
git add .
git commit -a -m "deploy at `date` by `git config --get user.name`"
git push origin master
