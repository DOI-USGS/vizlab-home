<template>
  <div id="viz-latest">
    <div id="viz-title">
      <h2 id="title-new-main">
        Recent work
      </h2><br>
    </div>
    <div id="viz-text">
        <div class="text-container">
        <h3 id="title-blog">
         In the water data blog
        </h3>
        <!-- <li>We're hiring!</li> -->
          <p><a
            href="https://waterdata.usgs.gov/blog/30daychartchallenge-2021/"
            target="_blank"
          >- A month of data viz for the #30DayChartChallenge</a></p>

         <p><a
            href="https://waterdata.usgs.gov/blog/build-r-animations/"
            target="_blank"
          >- Recreating the U.S. River Conditions animations in R</a></p>
        <br>

        <hr class="rounded">

        <div class="river-container">
          <RiverConditions />
        </div>
      </div>
    </div>
    <div id="viz-img">
      <div class="img-container">
        <img
          src="../assets/images/new/da-animated.gif"
          alt=""
        >
        <h3 id="title-new">
          Data assimilation animated
        </h3> <a
          id="twitter-link"
          href="https://twitter.com/USGS_DataSci/status/1431332579634991114/photo/1"
          target="_blank"
        >See it on twitter</a> 
      </div>
</div>
</div>
</template>

<script>
    export default {
        name: 'WhatsNew',
        components: {
            RiverConditions: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "river-conditions"*/ "../components/RiverConditions"),
        },
        props: {
            title: {
                type: String,
                default: process.env.VUE_APP_TITLE
            }
        },
        data() {
          return {
            publicPath: process.env.BASE_URL, 
          }
        }
        
    }
</script>

<style lang="scss">
$darkGreen: #1F7564;
$nearBlack: #181a1a;

 // mobile layout
#viz-latest {
    display:grid;
    width: 100%;
    height: auto;
    grid-template-areas:
    "ft-title"
    "ft-img"
    "ft-text"
}
#viz-title {
    grid-area: ft-title;
    height: auto;
    padding: 1rem;
    padding-bottom: 0.5rem;
    h2, h3{
        display: inline;
        }
}
#viz-text {
    grid-area: ft-text;
    .text-container {
        padding: 1rem;
    }
}
#title-new {
    margin-top: 0.5rem;
}
#title-new-main {
    margin-top: 0.5rem;
    color: $darkGreen;
}
#title-blog {
    color: black;
    //background-color: $darkGreen;
}
#viz-img {
    grid-area: ft-img;
    .img-container {
        max-width: 90%;
        margin-left: 5%;

    }
}
hr.rounded {
  border-top: 3px solid #bbb;
}
a {
    text-decoration: none;
    font-size: 1.2rem;
}
h2 {
    color: $darkGreen;
}
p {
  font-size: 1.2rem;
  padding: 0.25rem;
  margin: 0;
}
h3 {
  color: $nearBlack;
      padding-bottom: 1rem;
  a {
      color: black;
      padding-bottom: 1rem;
  }

  }
  #viz-text li {
  list-style-type: square;
  padding-left: 0em;
  list-style-position: outside;
  //text-indent: -1em;
}
  
#title-new, #twitter-link {
    display: inline;
}
#twitter-link {
    font-style: italic;
}
a:active, a:focus {
    border: none;
    outline: 0;
    outline-color: transparent;
}
[href]:focus {
    border: none;
    outline: 0;
}
:focus:not(:focus-visible) { outline: none }
#viz-text a:focus {
    outline: None;
}

// desktop layout
@media (min-width:1024px) {
  #viz-latest {
    display:grid;
    width: 95%;
    height: auto;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 6fr;
    grid-template-areas:
    "ft-title ft-title ft-text"
    "ft-img ft-img ft-text"
}
}
</style>