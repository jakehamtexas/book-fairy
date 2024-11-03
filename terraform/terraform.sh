#!/usr/bin/env bash

set -e -o pipefail

THIS_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

terraform() {
	nix run ".#terraform" -- "$@"
}

(
	# Terraform should always be run from ${root}/terraform
	#   i.e. THIS_DIR
	# Subdirectories should be managed with -chdir
	cd "$THIS_DIR"

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
		terraform "$@"
		;;
	*)
		terraform "$@" -var-file="$(realpath ./global.tfvars)"
		;;
	esac
)
