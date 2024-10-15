#!/usr/bin/env bash

set -e -o pipefail

# shellcheck source=./lib.sh
. "$(dirname "$0")/lib.sh"

(
	# Terraform should always be run from ${root}/terraform
	# Subdirectories should be managed with -chdir
	cd_project_cwd
	cd terraform

	terraform="$(get_tooling_bin_path terraform)"

	command_type=
	for arg in "${@}"; do
		case "${arg}" in
		validate)
			command_type=VALIDATE
			break
			;;
		version)
			command_type=VERSION
			break
			;;
		*)
			command_type=
			;;
		esac
	done

	case "${command_type}" in
	VALIDATE | VERSION)
		"$terraform" "$@"
		;;
	*)
		echo "$PWD"
		"$terraform" "$@" -var-file="$(realpath ../tooling/config/global.tfvars)"
		;;
	esac
)
