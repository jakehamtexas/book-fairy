{
  description = "tools";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
  }:
    flake-utils.lib.eachDefaultSystem
    (
      system: let
        pkgs = import nixpkgs {
          inherit system;
          config.allowUnfree = true;
        };
      in {
        packages = {
          all = pkgs.symlinkJoin {
            name = "all";
            paths = [
              pkgs.doppler
              pkgs.mprocs
              pkgs.terraform
              pkgs.google-cloud-sdk
            ];
          };
        };

        packages.default = self.packages.${system}.all;
      }
    );
}
