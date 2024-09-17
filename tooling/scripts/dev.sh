#!/usr/bin/env bash
set -e -o pipefail

path="${INIT_CWD:?}/tsconfig.json"

if ! [ -s "$path" ]; then
	echo "$path not found"
	exit 1
fi

yarn workspace tooling tsx "${INIT_CWD:?}/$1" --tsconfig "$path"
