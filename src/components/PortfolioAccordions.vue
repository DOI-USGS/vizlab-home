<template>
  <div id="portfolio-accordions">
    <h2
      id="header-viz"
      class="site-preview-heading"
    >
      Visualizations
    </h2>
    <div
      class="usa-accordion"
      aria-multiselectable="true"
    >
      <!-- Use the accurate heading level to maintain the document outline -->
      <h3 class="usa-accordion__heading">
        <button
          class="usa-accordion__button"
          aria-expanded="true"
          aria-controls="m-a1"
        >
          Interactives
        </button>
      </h3>
      <div
        id="m-a1"
        class="usa-accordion__content usa-prose"
      >
        <div class="card-container grid-container">
          <ul 
            class="usa-card-group grid-row"
          >
            <PortfolioCard
        
              v-for="viz in vizList_interactives"
              :key="viz.title"
              :viz="viz"
              :src="viz.img"
              class="tablet:grid-col-4 grid-col-auto usa-card"
            />
          </ul>
        </div>
      </div>


      <!-- Use the accurate heading level to maintain the document outline -->
      <h3 class="usa-accordion__heading">
        <button
          class="usa-accordion__button"
          aria-expanded="true"
          aria-controls="m-a2"
        >
          Chart Gallery
        </button>
      </h3>
      <div
        id="m-a4"
        class="usa-accordion__content"
      >
        <div class="card-container grid-container">
          <ul 
            class="usa-card-group grid-row"
          >
            <PortfolioImage
        
              v-for="viz in vizList_charts"
              :key="viz.title"
              :viz="viz"
              :src="viz.img"
              class="tablet:grid-col-4 usa-card"
            />
          </ul>
        </div>
      </div>

      <!-- Use the accurate heading level to maintain the document outline -->
      <h3 class="usa-accordion__heading">
        <button
          class="usa-accordion__button"
          aria-expanded="true"
          aria-controls="m-a3"
        >
          Events
        </button>
      </h3>
      <div
        id="m-a3"
        class="usa-accordion__content"
      >
        <div class="card-container grid-container">
          <ul 
            class="usa-card-group grid-row"
          >
            <PortfolioCard
        
              v-for="viz in vizList_hurricanes"
              :key="viz.title"
              :viz="viz"
              class="tablet:grid-col-4 grid-col-auto usa-card"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import * as d3Base from 'd3';
  import PortfolioCard from './PortfolioCard.vue';
  import PortfolioImage from './PortfolioImage.vue';
   
  // make sure that the prop for the viz cards is passed in, not sure if this needs to be imported or piped
   
   export default {
        name: 'PortfolioAccordions',
        components: {
            PortfolioCard,
            PortfolioImage
        },
        props: {
            title: {
                type: String,
                default: process.env.VUE_APP_TITLE
            }
        },
        data() {
          return {
            publicPath: process.env.BASE_URL, // allows app to find the files when on different deployment roots
            d3: null,

            vizList_hurricanes: null,
            vizList_riverConditions: null,
            vizList_interactives: null,
            vizList_charts: null,
            vizGroups: ["interactives", "river-conditions", "hurricane", "chart"]  // these will be the three featured groups of vizzies, in order, pulled from the "groups" property of each object
          }
        },
        mounted(){
          this.d3 = Object.assign(d3Base);
          this.loadData();  

        },
        methods: {
          loadData() {
            const self = this;

            // read in data 
            let promises = [
            self.d3.csv(self.publicPath + "viz-list.csv",  this.d3.autotype) // list of published viz from drupal page
            ];
            Promise.all(promises).then(self.callback); // once it's loaded
          },
          callback(data) {
            // assign data
            this.vizList = data[0];

            // create groups
            this.vizList_riverConditions = this.vizList.filter((viz) => viz.group === this.vizGroups[1]);
            this.vizList_hurricanes = this.vizList.filter((viz) => viz.group === this.vizGroups[2]);
            this.vizList_interactives = this.vizList.filter((viz) => viz.group === this.vizGroups[0]); // all but river conditions and hurricanes
            this.vizList_charts = this.vizList.filter((viz) => viz.group === this.vizGroups[3]); // static charts, twitter content


          }
        }
    }
       
</script>

<style scoped lang="scss">
$nearBlack: #181a1a;
$darkGreen: #1F7564;

  $icons:(
  "chevronLeft": '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 165 255"><path d="M165,36v4c-1.78,2.17-3.4,4.52-5.38,6.5q-38.06,38.16-76.18,76.25c-1.48,1.48-2.85,3.08-4.46,4.83,1.73,1.82,3.06,3.28,4.45,4.67q38.1,38.13,76.19,76.25c2,2,3.6,4.33,5.38,6.5v4c-1.55,2.12-2.86,4.47-4.68,6.32Q147.78,238.13,135,250.67a48.26,48.26,0,0,1-6,4.33h-4a78.69,78.69,0,0,1-7-5.58Q62.55,194.07,7.18,138.6C4.71,136.14,2.39,133.54,0,131v-7c1.57-1.71,3.07-3.49,4.71-5.13Q61.51,62,118.4,5.22A70.08,70.08,0,0,1,125,0h5q16.42,16.11,32.81,32.25C163.8,33.24,164.28,34.74,165,36Z" style="fill:%%COLOR%%"/></svg>',
  "chevronDown": '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 255 165"><path d="M35,0h6c2.14,1.83,4.42,3.52,6.41,5.51Q85.59,43.6,123.63,81.86c3.49,3.54,5.34,3.18,8.63-.14q38-38.34,76.24-76.34c2-2,4.32-3.59,6.5-5.38h5a30.15,30.15,0,0,1,4,2.9Q239.57,18.4,255,34v7c-1.33,1.48-2.6,3-4,4.43Q193.48,103,135.89,160.49A54.58,54.58,0,0,1,130,165h-5c-1.75-1.51-3.61-2.92-5.24-4.55Q62.39,103.14,5.11,45.72C3,43.58,1.68,40.59,0,38V37c1-1.89,1.65-4.15,3.09-5.6C13.64,20.84,24.34,10.45,35,0Z" style="fill:%%COLOR%%"/></svg>'
);
$data-svg-prefix: 'data:image/svg+xml;utf-8,';
$brightBlue: rgb(0, 6, 10);
@function str-replace($string, $search, $replace: ""){
  $index: str-index($string, $search);
  @if $index{
    @return str-slice($string, 1, $index - 1) + $replace + str-replace(str-slice($string, $index + str-length($search)), $search , $replace );
  }
  @return $string;
}
@function get-icon($icon, $color: #000){
  $icon: map-get($icons, $icon);
  $placeholder: "%%COLOR%%";
  $data-uri: str-replace(url($data-svg-prefix + $icon), $placeholder, $color);
  @return str-replace($data-uri, "#", "%23");
}

  #portfolio-accordions {
      max-width: 90vw;
  }

  /* using flex positioning on card groups */
.usa-card-group .grid-row {
  max-width: 90vw;
  flex-grow:2;
}
.usa-accordion__button{
  background-image: get-icon("chevronDown", $nearBlack);
  background-size: 15px 10px;
 
}
.usa-accordion__button[aria-expanded=false]{
  background-image: get-icon("chevronLeft", $nearBlack);
  background-size: 10px 15px;
  &:hover{
    background-image: get-icon("chevronLeft", $nearBlack);
    color: $nearBlack;
  }
}

.site-preview-heading#header-viz {
  color: $darkGreen;
  width: 100%;
  border-style: none none solid none;
  border-bottom: 4px solid $darkGreen;
    padding: 1rem;
  background-color: transparent;
  h3 {
    border-style: none none solid none;
  }
}
// style accordions
.usa-accordion__button {
  color: $nearBlack;
  border-style: none none solid none;
  border-top: 5px solid $darkGreen;
  background-color: transparent;
  font-size: 24px;
  font-weight: 600;
  h3 {
    border-style: none none solid none;
  }

}
h2 {
    color: $nearBlack;
    margin-bottom: 0px;
  }
</style>