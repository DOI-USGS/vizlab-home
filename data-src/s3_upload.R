s3_upload <- function(filepath_s3,
                      filepath_local,
                      on_exists = c("replace", "stop"),
                      verbose = FALSE,
                      config_file = "lib/cfg/s3_config_viz.yml") {

  # Access bucket
  s3_config <- yaml::yaml.load_file(config_file)
  aws.signature::use_credentials(profile = s3_config$profile)

  # Check to see if the file already exists and use `on_exists`
  # argument to determine what the user wants to do
  bucket_contents <- aws.s3::get_bucket_df(bucket = s3_config$bucket)
  exists_on_s3 <- filepath_s3 %in% bucket_contents$Key
  match.arg(on_exists)

  if (exists_on_s3 && on_exists == "stop") {
    stop("File already exists and on_exists==stop")
  } else {
    if (verbose) message("Uploading ", filepath_local, " to S3, overwriting = ", exists_on_s3)

    status <- aws.s3::put_object(file = filepath_local,
                                 object = filepath_s3,
                                 bucket = s3_config$bucket)
  }

  # Construct a filepath and timestamp of when it was last updated
  tibble(
    local_filepath = filepath_local,
    s3_filepath = filepath_s3,
    timestamp = Sys.time()
    )
}
