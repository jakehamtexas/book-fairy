output "bucket_url" {
  value = module.bingo_app.bucket_url
}

output "deploy_wif_provider" {
  value = module.wif.wif_provider_name
}

output "deploy_sa" {
  value = module.wif.sa_email
}

