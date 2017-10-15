#!/usr/bin/env bash
# kill docker container
set -e

sudo docker rm -f __APP_NAME__ || echo "No previous deployment to stop"
