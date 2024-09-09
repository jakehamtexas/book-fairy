#!/usr/bin/env bash

set -e -o pipefail

path="${INIT_CWD:?}/tsconfig.build.json"

if ! [ -s "$path" ]; then
	echo "$path not found"
	exit 1
fi

yarn workspace tooling tsc -p "$path"
