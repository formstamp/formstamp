#!/bin/bash

set +e # break script on first error

# make sure script is run from correct place
if [ ! -d .git ]; then
    echo "ERROR: You should run this script from ROOT of formstamp GIT repo"
    echo "Example: cd formstamp && ./release.sh"
    exit 1
fi

# Clone bower-formstamp if run on Travis
if [ "$TRAVIS" = true ]; then
    touch ~/.ssh/travis_deploy_source_deploy_key
    openssl aes-256-cbc -K $encrypted_14f255a438f4_key -iv $encrypted_14f255a438f4_iv -in script/travis_deploy_bower_formstamp.enc -out ~/.ssh/travis_deploy_bower_formstamp -d
    echo "Decrypted private key"
    chmod 600 ~/.ssh/travis_deploy_bower_formstamp
    echo -e "Host github.com\n  IdentityFile ~/.ssh/travis_deploy_bower_formstamp" > ~/.ssh/config

    cd .. && git clone --depth=50 --branch=master git@github.com:formstamp/bower-formstamp.git && cd formstamp
fi

# make sure bower-formstamp repo exist
if [ ! -d ../bower-formstamp/.git ]; then
    CWD=`pwd`
    echo "ERROR: You should have bower-formstamp repo as a sibling directory of formstamp main repo. Run following command:"
    echo "cd `dirname $CWD` && git clone git@github.com:formstamp/bower-formstamp.git"
    exit 1
fi

source ~/.nvm/nvm.sh # make sure nvm command is available
nvm use 0.10

# install dependencies
`npm bin`/bower install

# force compilation of all assets
`npm bin`/webpack

cd ../bower-formstamp
git checkout .
git pull -f origin master

cd ../formstamp
mkdir -p ../bower-formstamp/build
cp dist/formstamp.css ../bower-formstamp/
cp dist/formstamp.js  ../bower-formstamp/
cp bower.json         ../bower-formstamp/
cp README.md          ../bower-formstamp/
cp CHANGELOG.md       ../bower-formstamp/

cd ../bower-formstamp
if [ -n "$TRAVIS_TAG" ]; then
    sed -i.bak "s/AUTO_VERSION/$TRAVIS_TAG/g" bower.json && rm bower.json.bak
else
    read -p "Enter new bower-formstamp version: " LOCAL_VERSION
    sed -i.bak "s/AUTO_VERSION/$LOCAL_VERSION/g" bower.json && rm bower.json.bak
fi

git add .
git commit -a -m "release at `date` by `git config --get user.name`"
git push origin master

echo "-----------------------"
if [ -n "$TRAVIS_TAG" ]; then
    echo "Released version $TRAVIS_TAG successfully!"
else
    echo "Released version $LOCAL_VERSION successfully!"
fi
# echo "Don't forget to bump package version (make new tag in bower-formstamp repo & push it)"
