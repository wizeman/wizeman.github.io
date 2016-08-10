#!/bin/bash

set -euo pipefail

rsync -av --exclude='.git/' /data/ data

htmlproofer --check-external-hash --check-html data
mv data/Gruntfile.js .
echo '{ "extends": "eslint:recommended" }' > .eslintrc.json
grunt
