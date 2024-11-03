{
  description = "root";

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
          config.allowUnfreePredicate = pkg: builtins.elem (nixpkgs.lib.getName pkg) ["terraform"];
        };
        placeholderScript = pkgs.writeScriptBin "placeholder-script" ''
          echo "This is a placeholder."
          echo "Maybe later, it will be something else."
          echo "But hopefully, it'll be after moving it to the filesystem."
          echo "Writing scripts inside flakes feels grody."
        '';
        ciInputs = [
          pkgs.google-cloud-sdk
          pkgs.terraform
          pkgs.doppler
          pkgs.gh
          pkgs.nodejs_22
          pkgs.corepack_22
        ];
      in {
        packages.default = pkgs.hello;
        devShells = {
          ci = pkgs.mkShell {
            buildInputs = ciInputs;
          };
          default = pkgs.mkShell {
            buildInputs =
              ciInputs
              ++ [
                placeholderScript
                pkgs.mprocs
              ];
          };
        };
      }
    );
}
