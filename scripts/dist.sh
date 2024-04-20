#!/usr/bin/env bash

set -euxo pipefail
rm -rf ./dist
tsc -b
tsc -p tsconfig.esm.json
echo '{"type":"module"}' > ./dist/esm/package.json
