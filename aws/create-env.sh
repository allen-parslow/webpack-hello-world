#!/bin/bash

set -x
set -o errexit

aws cloudformation create-stack --stack-name $npm_package_name --template-body file://aws/codedeploy-formation.yml

