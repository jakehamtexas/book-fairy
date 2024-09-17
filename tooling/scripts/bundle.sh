#!/usr/bin/env bash

set -e -o pipefail

# shellcheck source=./lib.sh
. "$(dirname "$0")/lib.sh"

args=()

if [ -n "$OUTDIR" ]; then
	args+=(--outdir "$(get_init_cwd)/$OUTDIR")
fi

if [ -n "$TSCONFIG" ]; then
	args+=(--outdir "$(get_init_cwd)/$TSCONFIG")
fi

yarn workspace tooling esbuild --bundle "$(get_init_cwd)/$1" "${args[@]}"
