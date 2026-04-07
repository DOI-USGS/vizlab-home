#!/usr/bin/env bash

# this can be used to make thumbnails from image files
# it takes an input directory, resizes and compresses the images, 
# and saves to a new folder with _thumbnail added to the filename

# to use run in terminal:
# chmod +x create_thumbnails.sh
# ./create_thumbnails.sh ./[input folder] ./[output folder]

set -euo pipefail

if ! command -v magick >/dev/null && ! command -v convert >/dev/null; then
  echo "This script requires ImageMagick (magick/convert). Please install it first." >&2
  exit 1
fi

if [[ $# -ne 2 ]]; then
  echo "Usage: $0 <source_dir> <dest_dir>" >&2
  exit 1
fi

src_dir=$1
dest_dir=$2

if [[ ! -d $src_dir ]]; then
  echo "Source directory '$src_dir' does not exist." >&2
  exit 1
fi

mkdir -p "$dest_dir"

shopt -s nullglob
for file in "$src_dir"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
  filename=$(basename "$file")
  ext="${filename##*.}"
  name="${filename%.*}"
  out="$dest_dir/${name}_thumbnail.${ext}"

  if command -v magick >/dev/null; then
    magick "$file" -resize 400x400\> -quality 80 "$out"
  else
    convert "$file" -resize 400x400\> -quality 80 "$out"
  fi
  echo "Created $out"
done
