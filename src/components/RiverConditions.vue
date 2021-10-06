<template>
  <div id="rc-container">
    <a
      href="https://www.usgs.gov/media/videos/us-river-conditions-april-june-2021"
      target="_blank"
    >
      <div id="rc-title">
        <h3>See the latest U.S. River Conditions</h3>
        <p>April 1 - June 30, 2021</p>
      </div>
      <div id="rc-dropdown" />
      <div id="rc-img">
        <img src="../assets/images/new/river_conditions_apr_jun_2021_latest.png">
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
a{
  #rc-title  {
    h3 {
      color: $nearBlack;
      padding-top: 1rem;
    }
  }
}
#rc-container a:focus {
    outline: None;
}
</style>