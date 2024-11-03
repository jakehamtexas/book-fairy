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

  backend "gcs" {
    prefix = "terraform/state"
  }
}

provider "google" {
  project = var.gcp_project_id
  region  = "us-central1"
}

data "github_repository" "repo" {
  full_name = var.repository_full_name
}

data "github_user" "user" {
  username = var.repository_owner_name
}

locals {
  environments = tomap({
    dev = {
      bucket_name = var.dev_bucket_name
    }
    prod = {
      bucket_name = var.prod_bucket_name
    }
  })
  terraform_wif_provider = tomap({
    admin = {
      key                              = "admin"
      main_only                        = true
      service_account_display_name     = "Terraform Admin Agent"
      github_env_wif_provider_var_name = "ADMIN_TF_WIF_PROVIDER"
      github_env_sa_var_name           = "ADMIN_TF_SA"
      pool_id                          = "admin-tf"
      provider_id                      = "gh-admin-tf"
      provider_name                    = "GitHub - Terraform Admin"
      provider_description             = "GitHub Actions identity pool provider for Terraform Admin Agent"
      attribute_condition              = <<-EOT
        attribute.repository_owner_id == "${data.github_user.user.id}" &&
        attribute.repository_id == "${data.github_repository.repo.repo_id}" &&
        attribute.ref == "refs/heads/main" &&
        attribute.ref_type == "branch"
        EOT
      iam_bindings = {
        project_id = var.gcp_project_id
        roles = [
          "roles/admin"
        ]
      }
    }
    readonly = {
      key                              = "readonly"
      main_only                        = false
      service_account_display_name     = "Terraform Read Only Agent"
      github_env_wif_provider_var_name = "READONLY_TF_WIF_PROVIDER"
      github_env_sa_var_name           = "READONLY_TF_SA"
      pool_id                          = "readonly-tf"
      provider_id                      = "gh-readonly-tf"
      provider_name                    = "GitHub - Terraform Read Only"
      provider_description             = "GitHub Actions identity pool provider for Terraform Read Only Agent"
      attribute_condition              = <<-EOT
        attribute.repository_owner_id == "${data.github_user.user.id}" &&
        attribute.repository_id == "${data.github_repository.repo.repo_id}"
        EOT
      iam_bindings = {
        project_id = var.gcp_project_id
        roles = [
          "roles/viewer"
        ]
      }
    }

  })
}

module "wif" {
  source                = "../../modules/wif-pool"
  for_each              = local.terraform_wif_provider
  gcp_project_id        = var.gcp_project_id
  pool_id               = each.value.pool_id
  provider_id           = each.value.provider_id
  provider_description  = each.value.provider_description
  display_name          = each.value.service_account_display_name
  repository_full_name  = var.repository_full_name
  repository_owner_name = var.repository_owner_name
  main_only             = each.value.main_only
}

resource "github_actions_environment_variable" "sa_env_var" {
  for_each = tomap({
    for pair in setproduct(keys(local.terraform_wif_provider), keys(local.environments)) : "${pair[0]}-${pair[1]}" => {
      environment   = pair[1]
      variable_name = local.terraform_wif_provider[pair[0]].github_env_sa_var_name
      value         = module.wif[pair[0]].sa_email
    }
  })
  repository    = data.github_repository.repo.name
  environment   = each.value.environment
  variable_name = each.value.variable_name
  value         = each.value.value
}

resource "github_repository_environment" "repo_environment" {
  for_each            = local.environments
  environment         = each.key
  repository          = data.github_repository.repo.name
  prevent_self_review = false
}

resource "github_actions_environment_variable" "wif_provider_env_var" {
  for_each = tomap({
    for pair in setproduct(keys(local.terraform_wif_provider), keys(local.environments)) : "${pair[0]}-${pair[1]}" => {
      environment   = pair[1]
      variable_name = local.terraform_wif_provider[pair[0]].github_env_wif_provider_var_name
      value         = module.wif[pair[0]].wif_provider_name
    }
  })
  repository    = data.github_repository.repo.name
  environment   = each.value.environment
  variable_name = each.value.variable_name
  value         = each.value.value
}

locals {
  iam_bindings = flatten([
    for provider in local.terraform_wif_provider : [
      for role in provider.iam_bindings.roles : {
        resource_key = provider.key
        pool_id      = provider.pool_id
        role         = role
        project_id   = provider.iam_bindings.project_id
      }
  ]])
}

resource "google_service_account_iam_binding" "sa_iam_binding" {
  for_each = tomap({
    for provider_role in local.iam_bindings : "${provider_role.pool_id}-${provider_role.role}" => {
      resource_key = provider_role.resource_key
      role         = provider_role.role
      project_id   = provider_role.project_id
    }
  })

  service_account_id = module.wif[each.value.resource_key].sa_id
  role               = each.value.role

  members = [
    "serviceAccount:${module.wif[each.value.resource_key].sa_email}"
  ]
}

data "google_iam_policy" "policy" {
  for_each = module.wif
  binding {
    role = each.key == "admin" ? "roles/storage.objectAdmin" : "roles/storage.objectViewer"
    members = [
      "serviceAccount:${each.value.sa_email}"
    ]
  }
}

data "google_storage_bucket" "bucket" {
  for_each = local.environments
  name     = each.value.bucket_name
  project  = var.gcp_project_id
}

resource "google_storage_bucket_iam_policy" "policy" {
  for_each = tomap({ for pair in setproduct(keys(module.wif), keys(local.environments)) : "${pair[0]}-${pair[1]}" => {
    policy_data = data.google_iam_policy.policy[pair[0]].policy_data
    bucket_name = data.google_storage_bucket.bucket[pair[1]].name
  } })
  bucket      = each.value.bucket_name
  policy_data = each.value.policy_data
}
