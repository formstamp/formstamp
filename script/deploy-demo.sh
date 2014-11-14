#!/bin/bash

set +e # break script on first error

SUBDIR=$1

# make sure script is run from correct place
if [ ! -d .git ]; then
    echo "ERROR: You should run this script from ROOT of formstamp GIT repo"
    echo "Example: cd formstamp && script/deploy-demo.sh"
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
nvm use 0.10

# install dependencies
npm install
`npm bin`/bower install
`npm bin`/webpack

cd ../formstamp.github.io
git checkout .
git pull -f origin master

cd ../formstamp

cp demo/build/* ../formstamp.github.io/$SUBDIR/
cp demo/index.html ../formstamp.github.io/$SUBDIR/

cd ../formstamp.github.io
git add .
git commit -a -m "release at `date` by `git config --get user.name`"
git push origin master

echo "-----------------------"
echo "Demo deployed successfully!"
