variable "gcp_project_id" {
  type = string
}

variable "repository_full_name" {
  type = string
}

variable "repository_owner_name" {
  type = string
}

variable "prod" {
  type    = bool
  default = false
}
