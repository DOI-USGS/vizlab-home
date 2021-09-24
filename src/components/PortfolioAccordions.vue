<template>
  <div id="portfolio-accordions">
    <h3 class="site-preview-heading">
      Visualizations
    </h3>

    <div
      class="usa-accordion"
      aria-multiselectable="true"
    >
      <!-- Use the accurate heading level to maintain the document outline -->
      <h4 class="usa-accordion__heading">
        <button
          class="usa-accordion__button"
          aria-expanded="true"
          aria-controls="m-a1"
        >
          Visualizations
        </button>
      </h4>
      <div
        id="m-a1"
        class="usa-accordion__content usa-prose"
      >
        <div class="card-container grid-container">
          <ul 
            class="usa-card-group grid-row"
          >
            <PortfolioCard
        
              v-for="viz in vizList1"
              :key="viz.title"
              :viz="viz"
              :src="viz.img"
              class="tablet:grid-col-4 usa-card"
            />
          </ul>
        </div>
      </div>

      <!-- Use the accurate heading level to maintain the document outline -->
      <h4 class="usa-accordion__heading">
        <button
          class="usa-accordion__button"
          aria-expanded="false"
          aria-controls="m-a2"
        >
          River Conditions
        </button>
      </h4>
      <div
        id="m-a2"
        class="usa-accordion__content"
      >
        <div class="card-container grid-container">
          <ul 
            class="usa-card-group grid-row"
          >
            <PortfolioCard
        
              v-for="viz in vizList2"
              :key="viz.title"
              :viz="viz"
              class="tablet:grid-col-4 usa-card"
            />
          </ul>
        </div>
      </div>

      <!-- Use the accurate heading level to maintain the document outline -->
      <h4 class="usa-accordion__heading">
        <button
          class="usa-accordion__button"
          aria-expanded="false"
          aria-controls="m-a3"
        >
          Hurricanes
        </button>
      </h4>
      <div
        id="m-a3"
        class="usa-accordion__content"
      >
        <div class="card-container grid-container">
          <ul 
            class="usa-card-group grid-row"
          >
            <PortfolioCard
        
              v-for="viz in vizList3"
              :key="viz.title"
              :viz="viz"
              class="tablet:grid-col-4 usa-card"
            />
          </ul>
        </div>
      </div>

      <!-- Use the accurate heading level to maintain the document outline -->
      <h4 class="usa-accordion__heading">
        <button
          class="usa-accordion__button"
          aria-expanded="false"
          aria-controls="m-a4"
        >
          All
        </button>
      </h4>
      <div
        id="m-a4"
        class="usa-accordion__content"
      >
        <div class="card-container grid-container">
          <ul 
            class="usa-card-group grid-row"
          >
            <PortfolioCard
        
              v-for="viz in vizList"
              :key="viz.title"
              :viz="viz"
              :src="viz.img"
              class="tablet:grid-col-4 usa-card"
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
   
  // make sure that the prop for the viz cards is passed in, not sure if this needs to be imported or piped
   
   export default {
        name: 'PortfolioAccordions',
        components: {
            PortfolioCard
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
            vizList: null, // raw list of visualizations
            vizList1: null, // featured group #1
            vizList2: null,// featured group #2
            vizList3: null, // featured group #3
            vizGroups: ["iws-basin", "river-conditions", "hurricane"]  // these will be the three featured groups of vizzies, in order, pulled from the "groups" property of each object
          }
        },
        mounted(){
          this.d3 = Object.assign(d3Base);
          this.loadData();  
        },
        methods:{
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
            console.log(this.vizList);

            // create groups
            this.vizList1 = this.vizList.filter((viz) => viz.group === this.vizGroups[0]);
            this.vizList2 = this.vizList.filter((viz) => viz.group === this.vizGroups[1]);
            this.vizList3 = this.vizList.filter((viz) => viz.group === this.vizGroups[2]);


            
            
            
          }
        }
    }
       
       
</script>

<style>
  /* this line is critical for importing USWDS styling */
  @import '~uswds/dist/css/uswds.css'; 

  #portfolio-accordions {
      max-width: 1000px;
      margin: auto;
  }

</style>