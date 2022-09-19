<template>
  <div id="viz-latest">
    <div id="viz-title">
      <h2 id="title-new-main">
        <span
          class="lowlight"
          style="line-height: 10%"
        >
          Recent
        </span>
      </h2><br>
    </div>
    <div id="right">
      <div id="right-grid">
        <!-- wdfn blog links -->
        <div id="viz-blog-title">
          <a
            href="https://waterdata.usgs.gov/blog/"
            target="_blank"
          >
            <h2 id="title-blog">
              <span
                class="lowlight"
                style="line-height: 10%"
              >
                Water Data Blog </span>
            </h2></a>
        </div>
        <div id="viz-text">
          <!-- blog list item -->
          <div class="text-container">
            <li>
              <span class="date-text">
                09/08/2021:
              </span> 
              Water data science in 2022
              <a
                href="https://waterdata.usgs.gov/blog/water-data-science-2022/"
                target="_blank"
              >
                <span class="arrow">
                  Read &#8594;
                </span>
              </a>
            </li>
            </div>
            <!-- end blog list item -->
            <!-- include thumbnail of most recent blog post -->
            <div class="thumbnail-container">
              <img 
                class="blog-thumbnail"
                src="https://labs.waterdata.usgs.gov/visualizations/thumbnails/DaSB_thumbnail.png" 
                alt="A network with water droplets for nodes. The biggest node says 'USGS Data Science' and stemming from it are nodes for data viz, analytics, machine learning, and reproducible data assembly, the four specializations of the Data Science Branch"
              >
            </div>
          <!-- blog list item -->
          <div class="text-container">
            <li>
              <span class="date-text">
                11/10/2021:
              </span> 
              What is the USGS Vizlab? 
              <a
                href="https://waterdata.usgs.gov/blog/what-is-vizlab/"
                target="_blank"
              >
                <span class="arrow">
                  Read &#8594;
                </span>
              </a>
            </li>
            <!-- end blog list item -->
            <!-- blog list item -->
            <li>
              <span class="date-text">
                11/3/2021:
              </span> 
              Data viz hiring   
              <a
                href="https://waterdata.usgs.gov/blog/viz-hires-2021/"
                target="_blank"
              >
                <span class="arrow">
                  Read &#8594;
                </span>
              </a>
            </li>
          <!-- end blog list item -->
          <!-- blog list item -->
            <li>
              <span class="date-text">5/18/2021:</span> A month of data viz for the #30DayChartChallenge  
              <a
                href="https://waterdata.usgs.gov/blog/30daychartchallenge-2021/"
                target="_blank"
              ><span class="arrow">Read &#8594;</span></a>
            </li>

            <li>
              <span class="date-text">3/29/2021:</span> Recreating the U.S. River Conditions animations in R  
              <a
                href="https://waterdata.usgs.gov/blog/build-r-animations/"
                target="_blank"
              ><span class="arrow">Read&#8594;</span></a>
            </li>
          </div>
          <!-- end blog list item -->
        </div>
      </div>
    </div>
    <div id="viz-img">
      <!-- main featured graphic -->
      <div class="img-container">
        <img
          src="https://labs.waterdata.usgs.gov/visualizations/gifs/da-animated.gif"
          alt="An animation of a data assimilation process across a series of timesteps. First, a model makes a prediction. At the next timestep, predictions are paired with actual observations, which are used to update the model prediction. This is repeated in time to improve prediction accuracy to the truth"
        >
        <h3 id="title-new">
          Data assimilation animated
        </h3> <a
          id="twitter-link"
          href="https://twitter.com/USGS_DataSci/status/1431332579634991114/photo/1"
          target="_blank"
        >See it on twitter<span class="arrow">&#8594;</span></a> 
      </div>
    </div>
    <!-- <div class="river-container">
      <RiverConditions />
    </div> -->
  </div>
</template>

<script>
    export default {
        name: 'WhatsNew',
        components: {
           // RiverConditions: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "river-conditions"*/ "../components/RiverConditions"),
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
$nearBlack: #181a1a;
$coolBlue: rgb(66, 145, 235);
 // mobile layout
#viz-latest {
    display:grid;
    width: 100%;
    height: auto;
    margin-bottom: 0.5em;
    grid-template-areas:
  "recent"
  "recent-img"
  "blog"
 
}

#viz-title {
    grid-area: recent;
    height: auto;
    padding: 1rem;
    padding-bottom: 0rem;

}
#right {
  grid-area: blog;
}
#right-grid {
  display: grid;
  grid-template-areas:
  "blog-title blog-title"
  "blog-text blog-img"
}
#viz-blog-title {
  grid-area: blog-title;
  padding: 1rem;
  padding-bottom: 0rem;
}
#viz-text {
  //grid-area: blog-text;
    .text-container {
        padding: 1rem;
    }
}
#viz-text {
  .thumbnail-container {
  grid-area: blog-img;
}
.text-container {
  grid-area: blog-text;
}
.blog-thumbnail {
  grid-area: blog-img;
  display: block;
  margin-left: 3%;
  max-width: 40vw;
}
}


#title-new-main {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: $nearBlack;
}
.lowlight {
  background: linear-gradient(180deg,rgba(255,255,255,0.5) 70%, $coolBlue 10%);
}
#viz-img {
    grid-area: recent-img;
    margin-bottom: 0.5rem;
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
    font-size: 1rem;
}
h2 {
    color: $nearBlack;
}
li {
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
  padding-left: 1em;
  list-style-position: outside;
  text-indent: -1em;
}
#title-blog {
    color: $nearBlack;
    a{
      color: $nearBlack;
    }
}
.date-text {
  font-style: italic;
  color: rgb(90, 88, 88);
}
.blog-thumbnail {
  max-width: 18vw;
  padding-left: 1em;
}
.arrow{
  font-size: 1.2rem;
  font-style: italic;
}
#title-new, #twitter-link {
    display: inline;
}
#twitter-link {
    font-style: italic;
    font-size: 1.2em;
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
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 6fr;
}
  #viz-title {
      grid-column:  1 / 1;
      grid-row: 1 / 1;
      height: auto;
      padding: 1rem;
      padding-bottom: 0rem;

  }
  #right {
    grid-column: 2/ 2;
    grid-row: 1 / 3
  }
  #viz-blog-title {
    grid-column: 2 / 2;
    grid-row: 1 / 1;
    padding: 1rem;
    padding-bottom: 0rem;
  }
  
  #viz-text {
      grid-column: 2 / 2;
      grid-row: 2 / 3;
      .text-container {
        padding: 1rem;
    }
    .blog-thumbnail {
  display: block;
  margin: auto;
  max-width: 20vw;
}

    #viz-img {
    grid-column: 1 / 1;
    grid-row: 2 / 3;
    margin-bottom: 0.5rem;

    .img-container {
        max-width: 90%;
        margin-left: 5%;

    }
    }
}
}
</style>