# USGS Vizlab portfolio

The final website for this build is : https://labs.waterdata.usgs.gov/visualizations/


## Required Software
- node.js:
    - versions that have worked: 20.11.0, 20.0.0, 18.13.0
- git

### Installing

Clone the repository (https://help.github.com/articles/cloning-a-repository/)

`git clone https://github.com/DOI-USGS/vizlab-home.git`

Inside of your project folder (after clone):
`npm install`


## Building and testing

Run locally: 
`npm run serve`

Build a production version:
`npm run build`

## Adding Content to Carousels

**Directions for adding new streamflow tiles:**

1. Navigate to S3 water-visualizations-prod-website/visualizations/flow 
    
2. Create a new folder with the name YYYY/MM (example 2024_01) and upload the chart png into that folder
    
3. Add a new object at the **top** of `FlowTiles.js` with the following information:
``` javascript
        {
            id: 'id below plus one',
            folder: 'folder you created in S3 followed by /', // example '2024_02/'
            twitter_url: 'link to tweet',
            image_basename: 'file name in S3',
            image_type: 'png',
            image_alt: 'alt text from twitter'
        },
```

**Directions for adding new River Conditions videos:**

1. Navigate to S3 water-visualizations-prod-website/visualizations/river-conditions
    
2. Create a new folder with the name FYyy/Q# (example FY24_Q1) and upload both the river conditions video and the thumbnail into that folder
    
3. Add a new object at the **top** of `RiverConditions.js` with the following information:
    
``` javascript
        {
            id: 'id below plus one',
            name: 'Month Day - Month Day, Year', # example 'October 1 - December 31, 2024'
            drupal_url: 'link to drupal page'
            folder: 'folder you created in S3 followed by /', // example 'FY24_02/'
            video_basename: 'video file name in S3',
            image_thumbnail: 'thumbnail file name **.png**',
            video_type: 'mp4',
            image_alt: 'U.S. River Conditions from `name` at USGS streamgages.' # this can and should be improved!
        },
```
        
When in doubt, look to the formatting of the other objects!

## Adding Content to Water Data Blog 

**Directions for adding new blog items:**

Add a new object at the **top** of `WhatsNew.js` with the following information:
    
Blog item with an image:
        
``` JavaScript
        {
            id: 'id below plus one',
            date: 'MM/DD/YYYY:',
            title: 'whatever you want to be shown!', // example: 'A New Take on the Water Cycle'
            url: 'https://waterdata.usgs.gov/blog/**blogitempath**/',
            img_src: 'path to image',
            img_alt: 'descriptive text
        },
```

Blog item without an image (this is **most** blog items):
        
``` Javascript
        {
            id: '`id below plus one`',
            date: 'MM/DD/YYYY:',
            title: 'whatever you want to be shown!', // example: 'A New Take on the Water Cycle'
            url: 'https://waterdata.usgs.gov/blog/**blogitempath**/',
        },
```
