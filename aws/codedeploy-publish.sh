#!/bin/bash

set -x
set -o errexit

timestamp=$(date +%Y-%m-%d_%H.%M.%S)
s3bucket=$1
artifact="${npm_package_name}_v${npm_package_version}__$timestamp"

echo "Publishing $artifact"
ls -lth
[ -d 'build/dist/bundle/' ] && rm -r build/dist/bundle/ || :
mkdir -p build/dist/bundle/ || true
cp aws/deploy/* build/dist/bundle/
sed -i "s/__APP_NAME__/$npm_package_name/g" build/dist/bundle/*.sh
sed -i "s/__APP_NAME__/$npm_package_name/g" build/dist/bundle/*.yml
cat build/dist/bundle/*.sh

cp Dockerfile build/
sudo docker build -t $npm_package_name build/

sudo docker save $npm_package_name > build/dist/bundle/$npm_package_name.tar
cd build/dist/bundle/
ls -lth

echo "Pushing ${npm_package_name} to s3://$s3bucket/$artifact.zip"
aws deploy push --application-name "${npm_package_name}" --description "$artifact" \
        --ignore-hidden-files --s3-location "s3://$s3bucket/$artifact.zip" --source .
aws deploy list-application-revisions --application-name ${npm_package_name} | grep key | sort