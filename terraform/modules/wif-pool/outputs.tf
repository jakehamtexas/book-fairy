output "sa_email" {
  value = google_service_account.sa.email
}

output "sa_id" {
  value = google_service_account.sa.name
}

output "wif_pool_name" {
  value = google_iam_workload_identity_pool.pool.name
}

output "wif_provider_name" {
  value = google_iam_workload_identity_pool_provider.pool_provider.name
}
