#!/usr/bin/env bash

set -e -o pipefail

# shellcheck source=./lib.sh
. "$(dirname "$0")/lib.sh"

config_path="$(get_project_cwd)/jest.config.js"

main() {
	get_workspace_relative_args "$@"
	run_tooling_bin jest \
		--config "$config_path" \
		--selectProjects "${PROJECT:?Must specify jest project name}" \
		--roots "$(get_init_cwd)" \
		"${PATH_ARGS[@]}"

}

main "$@"
