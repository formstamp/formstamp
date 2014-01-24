ng-w
====

Pure angularjs widgets.

Development
-----------

### Nginx on Ubuntu

    apt-get install nginx
    echo 'server {listen 55555; root /path/to/ng-w;}' > /etc/nginx/sites-available/ng-w.conf
    ln -s /etc/nginx/sites-available/ng-w.conf /etc/nginx/sites-enabled/ng-w.conf
    service nginx restart
