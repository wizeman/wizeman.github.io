#!/bin/sh

set -euo pipefail

path="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)/"

docker pull ubuntu:latest
docker build -t io.github.wizeman - < "$path/Dockerfile"
docker images --filter dangling=true -aq --no-trunc | xargs -r docker rmi
docker run --restart=no --rm=true -v "$path:/data:ro" io.github.wizeman /data/test-runner.sh
