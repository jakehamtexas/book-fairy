terraform {
  required_version = "~> 1.9.5"

  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6.0"
    }
    google = {
      source  = "hashicorp/google"
      version = "6.7.0"
    }
  }
}

resource "google_project_service" "service" {
  project = var.gcp_project_id
  service = "iamcredentials.googleapis.com"
}


data "github_repository" "repo" {
  full_name = var.repository_full_name
}

data "github_user" "user" {
  username = var.repository_owner_name
}

resource "google_iam_workload_identity_pool" "pool" {
  workload_identity_pool_id = var.pool_id
}

resource "google_iam_workload_identity_pool_provider" "pool_provider" {
  workload_identity_pool_id          = var.pool_id
  workload_identity_pool_provider_id = var.provider_id
  display_name                       = var.display_name
  description                        = var.provider_description
  disabled                           = false
  attribute_condition                = "attribute.repository_owner_id == \"${data.github_user.user.id}\" && attribute.repository_id == \"${data.github_repository.repo.repo_id}\"${var.main_only ? " && attribute.ref == \"refs/heads/main\" && attribute.ref_type == \"branch\"" : ""}"
  attribute_mapping = {
    "google.subject"                = "assertion.sub"
    "attribute.actor"               = "assertion.actor"
    "attribute.aud"                 = "assertion.aud"
    "attribute.repository_id"       = "assertion.repository_id"
    "attribute.repository_owner_id" = "assertion.repository_owner_id"
    "attribute.ref"                 = "assertion.ref"
    "attribute.ref_type"            = "assertion.ref_type"
  }
  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account" "sa" {
  depends_on   = [google_project_service.service]
  account_id   = var.pool_id
  display_name = var.display_name
}

resource "google_service_account_iam_binding" "pool_iam_binding" {
  depends_on         = [google_project_service.service]
  service_account_id = google_service_account.sa.name
  role               = "roles/iam.workloadIdentityUser"

  members = [
    "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.pool.name}/*"
  ]
}
