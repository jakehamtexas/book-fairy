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
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6.3"
    }
  }
}

# Create new storage bucket in the US multi-region
# and settings for main_page_suffix and not_found_page
resource "random_id" "bucket_suffix" {
  byte_length = 8
}

resource "google_storage_bucket" "static_website" {
  name                        = "bingo-static-website-bucket-${random_id.bucket_suffix.hex}"
  location                    = "US"
  storage_class               = "STANDARD"
  uniform_bucket_level_access = true
  website {
    main_page_suffix = "index.html"
    not_found_page   = "404.html"
  }
}

# Make bucket public by granting allUsers storage.objectViewer access
resource "google_storage_bucket_iam_member" "public_rule" {
  bucket = google_storage_bucket.static_website.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Upload a simple index.html page to the bucket
resource "google_storage_bucket_object" "indexpage" {
  name         = "index.html"
  content      = "<html><body>Hello World!</body></html>"
  content_type = "text/html"
  bucket       = google_storage_bucket.static_website.id
}

# Upload a simple 404 / error page to the bucket
resource "google_storage_bucket_object" "errorpage" {
  name         = "404.html"
  content      = "<html><body>404!</body></html>"
  content_type = "text/html"
  bucket       = google_storage_bucket.static_website.id
}

