ng-w
====

Pure angularjs widgets.

Installation for Development
-----------

### Node Version Manager

    curl https://raw.github.com/creationix/nvm/master/install.sh | sh

Then follow the instructions.

### Node.js

    nvm install 0.10

### Node Package Modules

    cd /path/to/ng-w
    npm install

### Grunt

    npm install grunt-cli

Then start watching CoffeeScript:

    `npm bin`/grunt watch

### Nginx

Install the Nginx.

Then configure:

    sed -i 's|http {|http {\nserver {listen 55555; root /path/to/ng-w;}|' \
        /path/to/nginx/nginx.conf

Then restart nginx. Navigate your browser to http://localhost:55555/demo

### Troubleshooting

#### Node Package Modules

If `The program 'npm' is currently not installed.`
Then try `nvm use 0.10`.
