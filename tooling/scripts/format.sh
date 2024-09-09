#!/usr/bin/env bash

set -e -o pipefail

# shellcheck source=./lib.sh
. "$(dirname "$0")/lib.sh"

config_path="$(get_project_cwd)/.prettierrc"
ignore_path="$(get_project_cwd)/.prettierignore"

main() {
	get_workspace_relative_args "$@"

	(
		cd_project_cwd
		"$(get_tooling_bin prettier)" \
			--config "$config_path" \
			--ignore-path "$ignore_path" \
			--check \
			"${PATH_ARGS[@]}"
	)
}

main "$@"
