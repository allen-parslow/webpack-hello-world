#!/usr/bin/env bash
# start docker container

set -e

sudo docker run -d --name __APP_NAME__ -p 80:80 __APP_NAME__
