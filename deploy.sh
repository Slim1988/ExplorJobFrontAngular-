#!/bin/bash

ENV=${1:-"dev"}

if [ $ENV = "prod" ]
then
    git checkout -f master
else
    git checkout -f develop
fi

cp -f deployment/$ENV/* /etc/nginx/sites-enabled && service nginx restart

npm install && npm run build:$ENV
