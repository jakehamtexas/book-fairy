terraform {
  required_version = "~> 1.9.5"

  backend "gcs" {
    prefix = "terraform/bingo-app"
  }

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.7.0"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = "us-central1"
}

provider "github" {}

module "bingo_app" {
  source                = "../../modules/bingo-app"
  repository_full_name  = var.repository_full_name
  repository_owner_name = var.repository_owner_name
  gcp_project_id        = var.gcp_project_id
}

module "wif" {
  source                = "../../modules/wif-pool"
  gcp_project_id        = var.gcp_project_id
  pool_id               = "deploy-prd-bingo"
  provider_id           = "gh-deploy-prd-bingo"
  provider_description  = "GitHub Actions identity pool provider for prd-bingo Deploy Agent"
  display_name          = "GitHub - Deploy prd-bingo"
  repository_full_name  = var.repository_full_name
  repository_owner_name = var.repository_owner_name
}

resource "google_service_account_iam_member" "sa_iam_member" {
  service_account_id = module.wif.sa_id
  role               = "roles/storage.admin"

  member = "serviceAccount:${module.wif.sa_email}"
}
