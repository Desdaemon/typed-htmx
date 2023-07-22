#!/usr/bin/env bash
set -e

npm whoami
npm version ${1:-patch}
VERSION=$(cat package.json | jq -r '.version')
git tag -f v$VERSION
git push -u origin v$VERSION --tags -f
gh release create v$VERSION -t v$VERSION --generate-notes --draft --verify-tag
npm publish --dry-run
npm publish