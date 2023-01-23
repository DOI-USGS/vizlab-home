# 1) log in to gs-chs-wma-prod on saml2aws with adfs-wma-developer role 
# 2) place file in either visualizations/charts or visualizations/thumbnails
# according to where it needs to be placed on s3
local_file <- 'visualizations/thumbnails/water_cycle_blog_thumbnail.png'
s3_file <- local_file
config_file <- 'lib/cfg/s3_config_viz.yml'
s3_config <- yaml::yaml.load_file(config_file)
aws.signature::use_credentials(profile = s3_config$profile)
aws.s3::put_object(file = local_file, object = s3_file, bucket = s3_config$bucket)
