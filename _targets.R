library(targets)
library(tidyverse)

options(tidyverse.quiet = TRUE)
tar_option_set(packages = c('aws.s3', 'magick', 'tools'))

source("data-src/s3_upload.R")

list(
  # Download images to 'in/CC23' from
  # https://doimspp.sharepoint.com/:f:/r/sites/IIDDStaff/Shared%20Documents/Function%20-%20Vizlab/Social%20media/30DayChartChallenge/chart-challenge-23/UPLOAD_IMAGES_HERE?csf=1&web=1&e=MAdFsZ
  tar_target(
    cc23_image_basenames,
    list.files('in/CC23')
  ),
  tar_target(
    cc23_images,
    file.path('in/CC23', cc23_image_basenames),
    pattern = map(cc23_image_basenames),
    format = 'file'
  ),
  
  # SKIP SCALING FOR NOW
  # ALSO SKIP EXPORTING AS PNG, SINCE SOME GIFS
  # # compress images via rescaling size and reduce dpi (density) output
  # # export as png
  # tar_target(
  #   image_scaled_png,{
  #     out_file <- sprintf('tmp/%s', basename(cc23_images))
  #     image_read(cc23_images) |>
  #       image_scale("x300") |>
  #       image_write(out_file, density = 92)
  #     return(out_file)
  #   },
  #   pattern = map(cc23_images),
  #   format = 'file'
  # ),
  
  # export as webp to optimize browser delivery
  tar_target(
    image_scaled_webp,{
      file_name <- tools::file_path_sans_ext(basename(cc23_images))
      out_file <- sprintf('tmp/%s.webp', file_name)
      image_read(cc23_images) |>
        image_scale("x400") |>
        image_write(out_file, density = 300, compression = "WebP")
      return(out_file)
    },
    pattern = map(cc23_images),
    format = 'file'
  ),
  # Build list of png and webp version for each image
  tar_target(
    image_list,
    c(cc23_images, image_scaled_webp),
    format = 'file',
    pattern = map(cc23_images, image_scaled_webp)
  ),
  # store compressed images in s3
  tar_target(
    image_upload_s3, {
      # upload png and webp files for each image
      purrr::map_dfr(image_list, function(image_file) {
        file_name <- basename(image_file)
        file_s3 <- sprintf('visualizations/charts/%s', file_name)
        s3_upload(filepath_s3 = file_s3,
                  on_exists = "replace",
                  filepath_local = image_file)
      })
    },
    pattern = map(image_list)
  ),
  tar_target(
    upload_log_csv,{
      file_out <- 'out/upload_log.csv'
      image_upload_s3 %>%
        write_csv(file_out)
      return(file_out)
    },
    format = "file"
  )
)