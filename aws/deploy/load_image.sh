#!/usr/bin/env bash
# load docker image from archive

set -e

sudo docker load -i /tmp/__APP_NAME__.tar
