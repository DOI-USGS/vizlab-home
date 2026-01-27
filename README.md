# Water data visualizations

> _A newer version of the software may be available. See https://github.com/DOI-USGS/vizlab-home/releases to view all releases._

This repo uses Vue3 to build a portfolio website showcasing data visualization and graphical products made by the USGS Vizlab.

**The data visualization website can be viewed at [https://water.usgs.gov/vizlab](https://water.usgs.gov/vizlab).**

## Building the website locally

Clone the repo. In the directory, run `npm install` to install the required modules. Once the dependencies have been installed, run `npm run dev` to run locally from your browser.

To build the website locally you'll need `node.js` `v24` and `npm` `v11` or higher installed. To manage multiple versions of `npm`, you may [try using `nvm`](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e).

## Citation

Nell, C. Azadpour, E., Corson-Dosch, H. 2026. USGS Vizlab. U.S. Geological Survey software release. Reston, VA. [https://doi.org/{doi_of official_software_release}](https://doi.org/{doi_of_official_software_release})

## Additional information

- We welcome contributions from the community. See the [guidelines for contributing](https://github.com/DOI-USGS/vizlab-home/) to this repository on GitHub.
- [Disclaimer](https://github.com/DOI-USGS/vizlab-home/blob/main/DISCLAIMER.md)
- [License](https://github.com/DOI-USGS/vizlab-home/blob/main/LICENSE.md)

## Adding new items

Each section on the portfolio is populated by a similarly named file in `src/assets/content`. All of the content JSON files share a common structure so cards render consistently. The general structure looks like:

```
{
  "items": [
    {
      "id": "streamflow-drought-forecasts", // unique id
      "title": "Streamflow drought assessment and forecasting tool", // label that appears on card
      "released": "12/16/2025",
      "image": {
        "thumbnail": "streamflow-drought-forecasts_thumbnail.webp", // filename in the `thumbnail` directory in the water-visualizations-prod-website s3 bucket
        "alt": "A map of Florida showing the streamflow drought status at streamgage locations…" // alt for the thumbnail
      },
      "links": {
        "external": "https://water.usgs.gov/vizlab/streamflow-drought-forecasts", // opens in new window when card is clicked
        "asset": "" // image filename in s3 for standalone files
      },
      "archive": "true" // hide from portfolio
    }
  ]
}
```

**File-specific notes**
Not all of the sections require exactly the same data to populate the cards. Refer to the json files to see what is used for the different type.

- `viz-list.json` – interactive websites. These use the same card style as blogs with a link to the code on github.
- `blogs.json` – `released` date is shown on card. These use the same card style as viz-list with the date shown on the card.
- `sketches.json` – use `links.asset` to open direct ifiles from s3. optional `tags` that can be filtered on. right now, only includes "water use", "water cycle", and "flood" from the `illustrations` directory in the wma-prod > water-visualizations-prod-website s3 bucket. These use the same card style as snapshots.
- `snapshots.json` – use `links.asset` to open direct ifiles from the `charts` directory in the wma-prod > water-visualizations-prod-website s3 bucket. optional `tags` that can be filtered on. right now, only includes "maps". These use the same card style as sketches.
- `series-list.json` – contains a `collections` array, where each collection represents a series card. The most recent item within is displayed on the card. Other items are linked in collapsable menu. Can archive entire series or items within. `intervals` adds badges to the series card. See the example below for series:

  ```jsonc
  {
    "collections": [
      {
        "id": "flowTiles",
        // appears on the series card
        "title": "Flow tiles",
        "description": "Monthly tile maps summarizing streamflow conditions by state.",
        "intervals": ["Monthly"],// generated each month

        // all past versions
        "items": [
          {
            "id": "flow_cartogram-aug-2025",
            "title": "August 2025",
            "released": "2025-08-01",
            "archive": , // add true to filter out
            "image": { "thumbnail": "2025_08/flow_cartogram-aug-2025.png", "alt": "..." },
            "links": {
              "external": "2025_08/flow_cartogram-aug-2025.png",
              "x": "https://x.com/USGS_Water/status/1965102031225700461"
            }
          }
        ]
      }
    ]
  }
  ```

  Flow Tiles and River Conditions use relative paths (e.g., `2025_08/...`) that the app resolves against their S3 folders. Hurricanes and groundwater typically use absolute URLs.

- `charts.json` – contains past charts that are not currently featured anywhere in the portfolio

Whenever you add a new entry, make sure the referenced thumbnail (and any assets) exist in S3 and that `links.external` points to the public destination you want users to reach.

### Generating thumbnails

Thumbnails should be very small file sizes to avoid slowing down the site. You can generate thumbnails using the `create_thumbnails.sh` script. This script requires `ImageMagick` to be installed locally.

To use this script run: `chmod +x create_thumbnails.sh`
followed by: `./create_thumbnails.sh ./[input folder] ./[output folder]`.

This will take all image files in the [input folder] and save thumbnail versions of them in the [output folder], and append `_thumbnail` to the end of the file name. Upload these to the `thumbnails` folder on s3.

To adjust the thumbnail dimensions, edit this command at the end: `magick "$file" -resize 600x600\> -quality 80 "$out"`
