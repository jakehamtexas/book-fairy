#!/usr/bin/env bash

set -e -o pipefail

# shellcheck source=./lib.sh
. "$(dirname "$0")/lib.sh"

config_path="$(get_project_cwd)/eslint.config.js"

main() {
	get_workspace_relative_args "$@"

	(
		cd_project_cwd
		"$(yarn workspace tooling bin eslint)" -c "$config_path" "${PATH_ARGS[@]}"
	)
}

main "$@"
