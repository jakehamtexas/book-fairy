#!/usr/bin/env bash

set -e -o pipefail

# shellcheck source=./lib.sh
. "$(dirname "$0")/lib.sh"

(
	cd_init_cwd
	mprocs="$(get_tooling_bin_path mprocs)"
	"$mprocs" "$@"
)
