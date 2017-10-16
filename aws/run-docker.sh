#!/bin/bash

set -x
set -o errexit

cp Dockerfile build/

sudo docker build -t $npm_package_name build/
sudo docker run -p 8080:80 $npm_package_name