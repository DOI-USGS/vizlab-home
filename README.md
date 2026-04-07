# Water data visualizations

> _A newer version of the software may be available. See https://github.com/DOI-USGS/vizlab-home/releases to view all releases._

This repo uses Vue3 to build a portfolio website showcasing data visualization and graphical products made by the USGS Vizlab.

**The data visualization website can be viewed at [https://water.usgs.gov/vizlab](https://water.usgs.gov/vizlab).**

## Building the website locally

Clone the repo. In the directory, run `npm install` to install the required modules. Once the dependencies have been installed, run `npm run dev` to run locally from your browser.

To build the website locally you'll need `node.js` `v24` and `npm` `v11` or higher installed. To manage multiple versions of `npm`, you may [try using `nvm`](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e).

## Citation

Nell, C., Archer, A., Azadpour, E., Carr, A., Kwang, J., Martinez, A., Corson-Dosch, H. 2026. USGS Vizlab. U.S. Geological Survey website. Reston, VA. 
## Additional information

- We welcome contributions from the community. See the [guidelines for contributing](https://github.com/DOI-USGS/vizlab-home/) to this repository on GitHub.
- [Disclaimer](https://github.com/DOI-USGS/vizlab-home/blob/main/DISCLAIMER.md)
- [License](https://github.com/DOI-USGS/vizlab-home/blob/main/LICENSE.md)

## Adding new items

Each section on the portfolio is populated by a file in `src/assets/content`. The card-based content files all use an `items` array, but the exact fields differ a little by section.

The common card structure looks like:

```jsonc
{
  "items": [
    {
      "id": "streamflow-drought-forecasts",
      "title": "River DroughtCast",
      "released": "12/16/2025",
      "image": {
        "thumbnail": "streamflow-drought-forecasts_thumbnail.png",
        "alt": "A map of Florida showing the streamflow drought status at streamgage locations..."
      },
      "links": {
        "external": "https://water.usgs.gov/vizlab/streamflow-drought-forecasts",
        "code": "https://github.com/DOI-USGS/streamflow-drought-forecasts"
      },
      "archive": true
    }
  ]
}
```

**File-specific notes**
Not all sections use the same fields. Refer to the existing JSON files before adding a new entry. Thumbnails for stories, sketches, snapshots, and most series items should match the filenames/paths already used in `src/assets/content`.

- `stories.json`
  Interactive stories and web experiences. These cards use `links.external` for the main destination and may include `links.code` for the GitHub icon button.
- `blogs.json`
  Blog cards use the same top-level shape as stories, but typically only include `links.external`. `image.thumbnail` is usually a full URL to the blog thumbnail image, and `released` is shown on the card.
- `sketches.json`
  Illustration and infographic cards. Use `links.asset` for the hosted illustration filename and `links.external` when there is a public landing page. `tags` is optional but should be an array when present.
- `snapshots.json`
  Chart and map cards. These use the same general shape as `sketches.json`: `links.asset`, `links.external`, and optional `tags`.
- `series.json`
  Series cards use an outer `items` array. Each series object contains its own nested `items` array for releases. The newest release is shown on the card and older releases appear under “Past versions”. `intervals` adds the badge labels on the card. Example:

  ```jsonc
  {
    "items": [
      {
        "id": "flowTiles",
        "title": "Flow tiles",
        "description": "Monthly tile maps summarizing streamflow conditions by state.",
        "intervals": ["Monthly"],
        "items": [
          {
            "id": "flow_cartogram-aug-2025",
            "title": "August 2025",
            "released": "2025-08-01",
            "archive": true,
            "image": { 
              "thumbnail": "2025_08/flow_cartogram-aug-2025.png", 
              "alt": "..." },
            "links": {
              "external": "2025_08/flow_cartogram-aug-2025.png",
              "x": "1965102031225700461"
            }
          }
        ]
      }
    ]
  }
  ```

  Some series use relative asset paths such as `2025_08/...`, which the app resolves against the configured series bucket.
- `sections.json`
  Controls the section titles, summaries, ids, and special link/contact text for the homepage sections.
- `team.json`
  Controls the team section summary, aria text, and member list. It does not use the card `items` structure.

Whenever you add a new entry, make sure the referenced thumbnail (and any assets) exist in S3 and that `links.external` points to the public destination you want users to reach.

### Generating thumbnails

Thumbnails should be very small file sizes to avoid slowing down the site. You can generate thumbnails using the `create_thumbnails.sh` script. This script requires `ImageMagick` to be installed locally.

To use this script run: `chmod +x create_thumbnails.sh`
followed by: `./create_thumbnails.sh ./[input folder] ./[output folder]`.

This will take all image files in the [input folder] and save thumbnail versions of them in the [output folder], and append `_thumbnail` to the end of the file name. Upload these to the `thumbnails` folder on s3.

To adjust the thumbnail dimensions, edit this command at the end: `magick "$file" -resize 600x600\> -quality 80 "$out"`
