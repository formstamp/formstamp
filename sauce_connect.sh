CONNECT_URL="http://saucelabs.com/downloads/Sauce-Connect-latest.zip"
CONNECT_DIR="/tmp/sauce-connect-$RANDOM"
CONNECT_DOWNLOAD="Sauce_Connect.zip"
READY_FILE="connect-ready-$RANDOM"

# Get Connect and start it
mkdir -p $CONNECT_DIR
cd $CONNECT_DIR
curl $CONNECT_URL > $CONNECT_DOWNLOAD
unzip $CONNECT_DOWNLOAD
rm $CONNECT_DOWNLOAD
java -jar Sauce-Connect.jar --readyfile $READY_FILE \
  --tunnel-identifier $TRAVIS_JOB_NUMBER \
  $SAUCE_USERNAME $SAUCE_ACCESS_KEY &

# Wait for Connect to be ready before exiting
while [ ! -f $READY_FILE ]; do
  sleep .5
done
