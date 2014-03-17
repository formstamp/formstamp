TARBALL_NAME=sc.tar.gz
READY_FILE="connect-ready-$RANDOM"
wget https://saucelabs.com/downloads/sc-4.0-latest-linux.tar.gz -O $TARBALL_NAME
tar xvf $TARBALL_NAME
cd sc-4.0-linux

bin/sc \
  -u $SAUCE_USERNAME \
  -k $SAUCE_ACCESS_KEY \
  -f $READY_FILE \
  -i $TRAVIS_JOB_NUMBER > /dev/null &

while [ ! -f $READY_FILE ]; do
  sleep .5
done
