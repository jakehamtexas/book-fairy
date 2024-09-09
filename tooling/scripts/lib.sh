#!/usr/bin/env bash

has_no_args() {
	[ "$#" -eq 0 ]
}

first_arg_is_dash_dash() {
	[ "$1" == "--" ]
}

any_arg_is_dot() {
	for arg in "$@"; do
		if [ "$arg" == "." ]; then
			return 0
		fi
	done
}

get_init_cwd() {
	local cwd
	cwd="${INIT_CWD:?Must be run in a yarn script}"
	echo "$cwd"
}

get_project_cwd() {
	local cwd
	cwd="${PROJECT_CWD:?Must be run in a yarn script}"
	echo "$cwd"
}

get_workspace_relative_args() {
	local path_args=()
	if has_no_args "$@"; then
		path_args+=("$INIT_CWD")
	elif first_arg_is_dash_dash "$@"; then
		shift

		for arg in "$@"; do
			path_args+=("$arg")
		done
	elif any_arg_is_dot "$@"; then
		path_args+=("${INIT_CWD:?Must be run in a yarn script}")
	else
		for arg in "$@"; do
			path_args+=("$INIT_CWD/$arg")
		done
	fi

	for arg in "${path_args[@]}"; do
		PATH_ARGS+=("$arg")
	done

	export PATH_ARGS
}

cd_project_cwd() {
	cd "$(get_project_cwd)" || return 1
}

get_tooling_bin_path() {
	local bin
	bin="$(yarn workspace tooling bin "$1")"

	chmod +x "$bin"
	echo "$bin"
}

run_tooling_bin() {
	yarn workspace tooling run "$@"
}
