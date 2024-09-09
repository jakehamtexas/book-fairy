#!/usr/bin/env bash

set -e -o pipefail

# shellcheck source=./lib.sh
. "$(dirname "$0")/lib.sh"

symlink_exists() {
	test -L "$1"
}

dest_name() {
	echo "$(get_project_cwd)/$(basename "$1")"
}

mk_symlink() {
	ln -s "$1" "$2"
}

main() {
	while read -r config_file; do
		local dest
		dest="$(dest_name "$config_file")"
		if symlink_exists "$dest"; then
			continue
		fi

		mk_symlink "$config_file" "$dest"
	done <<<"$(cd "$(get_project_cwd)" && find tooling/config -type f)"
}

main
