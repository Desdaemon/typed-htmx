#!/usr/bin/env bash
set -e

npm whoami
npm version ${1:-patch}
VERSION=$(cat package.json | jq -r '.version')
git tag v$VERSION
git push origin v$VERSION
gh release create v$VERSION -t v$VERSION --generate-notes --draft --verify-tag
npm publish --dry-run
npm publish