terraform {
  required_version = "~> 1.9.5"

  backend "local" {
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.7.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = "us-central1"
}

module "remote_state" {
  source         = "../../modules/remote-state"
  gcp_project_id = var.gcp_project_id
  bucket_name    = "book-fairy-terraform-state-mgmt"
}
