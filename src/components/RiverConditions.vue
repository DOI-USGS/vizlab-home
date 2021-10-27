<template>
  <div id="rc-container">
    <a
      href="https://www.usgs.gov/media/videos/us-river-conditions-april-june-2021"
      target="_blank"
    >
      <div id="rc-title">
        <h3>U.S. River Conditions</h3>
        <p>See the latest animation: <span id="date-hilite"> July 1 - Sept 30, 2021</span></p>
      </div>
      <div id="rc-dropdown" />
      <div id="rc-img">
        <img src="https://labs.waterdata.usgs.gov/visualizations/thumbnails/river_conditions_apr_jun_2021_thumbnail_crop.png">
      </div>
    </a>
  </div>
</template>

<script>
    export default {
        name: 'RiverConditions',
        props: {
            title: {
                type: String,
                default: process.env.VUE_APP_TITLE
            }
        },
        data() {
          return {
            publicPath: process.env.BASE_URL, // allows app to find the files when on different deployment roots
          }
        }
        
    }
</script>

<style lang="scss">
$nearBlack: #181a1a;
$darkGreen: #1F7564;
$coolBlue: #005ea2;
 #rc-container {
     display: grid;
     grid-template-areas: 
     "title"
     "img";
 }
#rc-title {
    grid-area: title;
}
#rc-img {
    grid-area: img;
}
#date-hilite {
  color: $coolBlue;
}
a{
  #rc-title  {
    h2, h3 {
      color: $nearBlack;
      padding-top: 1rem;
      margin-bottom: 0rem;
      //font-size: 1.5 rem;
    }
    p {
      color: $nearBlack;
      margin: 0;
    }
  }
}
#rc-container a:focus {
    outline: None;
}
</style>