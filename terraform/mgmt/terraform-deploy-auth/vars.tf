variable "gcp_project_id" {
  type = string
}

variable "prod_bucket_name" {
  type    = string
  default = "book-fairy-terraform-state"
}

variable "dev_bucket_name" {
  type    = string
  default = "book-fairy-terraform-state-dev"
}

variable "repository_full_name" {
  type = string
}

variable "repository_owner_name" {
  type = string
}
