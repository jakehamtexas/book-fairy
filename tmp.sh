#!/usr/bin/env bash

set -euo pipefail

OWNER='jakehamtexas'
REPO_NAME='book-fairy'
gh api -H "Accept: application/vnd.github+json" "repos/$OWNER/$REPO_NAME" | jq
