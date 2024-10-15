terraform {
  required_version = "~> 1.9.5"

  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.7.0"
    }
  }
}

resource "google_project_service" "cloudresourcemanager" {
  project = var.gcp_project_id
  service = "cloudresourcemanager.googleapis.com"
}

resource "google_project_service" "gcs" {
  project = var.gcp_project_id
  service = "storage.googleapis.com"
}

resource "google_storage_bucket" "terraform_state_bucket" {
  name          = var.bucket_name
  location      = "US"
  force_destroy = true

  depends_on = [resource.google_project_service.cloudresourcemanager, resource.google_project_service.gcs]
}
