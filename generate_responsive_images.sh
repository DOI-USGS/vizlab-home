#!/bin/bash

# to run:
# chmod +x generate_responsive_images.sh
# ./generate_responsive_images.sh

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null
then
    echo "ImageMagick is not installed or is too old. Install ImageMagick >= 7.0 to use this script."
    exit 1
fi

# Define the source and output directories
src_dir="src/assets/images/original_images"
output_dir="src/assets/images/responsive_images"

# Remove everything in the output directory (responsive images) if it exists
if [ -d "$output_dir" ]; then
  echo "Cleaning up existing files in ${output_dir}..."
  rm -rf "$output_dir"/*
fi

# Create the output directory if it doesn't exist
mkdir -p "$output_dir"

# Array of target widths for responsive images
declare -a widths=(320 640 1280 1920)

# Function to get file size in bytes
get_file_size() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
    # For macOS
    stat -f%z "$1"
  else
    # For Linux
    stat --printf="%s" "$1"
  fi
}

# Get original file width to set threshold on output sizes
get_image_width() {
  magick identify -format "%w" "$1"
}

# Find all image files in the src_dir (recursively)
find "$src_dir" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | while read input_image; do
  # Extract the relative path and file name from the input image
  relative_path=$(dirname "${input_image#"$src_dir/"}")
  base_name="${input_image##*/}"
  base_name="${base_name%.*}"
  extension="${input_image##*.}"

  # Create output directory
  mkdir -p "${output_dir}/${relative_path}"

  # Get the original image dimensions
  original_width=$(get_image_width "$input_image")
  echo "Original image width: $original_width px"

  # Original image size (in bytes)
  original_size=$(get_file_size "$input_image")

  # Largest resized image
  largest_image=""
  largest_size=0

  # Generate responsive images only if the width is less than or equal to the original width
  for width in "${widths[@]}"
  do
    if (( width <= original_width )); then
        target_width=$width 
    else

    # Use the original width if the target width is larger than the original width
      echo "Target size ${width}px exceeds the original image width. Using ${original_width}px instead."
      target_width=$original_width
    fi

    # Generate JPEG image using `magick`
    output_jpg="${output_dir}/${relative_path}/${base_name}-${target_width}.jpg"
    magick "$input_image" -resize "${target_width}x" "$output_jpg"
    echo "Created $output_jpg"

    # Generate WebP image using `magick`
    output_webp="${output_dir}/${relative_path}/${base_name}-${target_width}.webp"
    magick "$input_image" -resize "${target_width}x" "$output_webp"
    echo "Created $output_webp"

    # Get the sizes of the newly created images
    jpg_size=$(get_file_size "$output_jpg")
    webp_size=$(get_file_size "$output_webp")

    # Get the larger size between JPEG and WebP
    if (( jpg_size > webp_size )); then
      largest_size=$jpg_size
      largest_image="$output_jpg"
    else
      largest_size=$webp_size
      largest_image="$output_webp"
    fi
  done

  # Print the change in max image size
  echo "$input_image was $((original_size / 1024)) KB. The largest version of this image is now $((largest_size / 1024)) KB."

done

echo "All responsive images have been created in ${output_dir}."