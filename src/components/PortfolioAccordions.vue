<template>
  <div id="portfolio-accordions">
    <h3 class="site-preview-heading">Visualizations</h3>

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
          Basins
        </button>
      </h4>
      <div
        id="m-a1"
        class="usa-accordion__content usa-prose"
      >
        <p>
          Congress shall make no law respecting an establishment of religion, or
          prohibiting the free exercise thereof; or abridging the freedom of speech,
          or of the press; or the right of the people peaceably to assemble, and to
          petition the Government for a redress of grievances.
        </p>
      </div>

      <!-- Use the accurate heading level to maintain the document outline -->
      <h4 class="usa-accordion__heading">
        <button
          class="usa-accordion__button"
          aria-expanded="false"
          aria-controls="m-a2"
        >
          Hurricanes
        </button>
      </h4>
      <div
        id="m-a2"
        class="usa-accordion__content"
      >
        <p>
          A well regulated Militia, being necessary to the security of a free State,
          the right of the people to keep and bear Arms, shall not be infringed.
        </p>
        <ul>
          <li>This is a list item</li>
          <li>Another list item</li>
        </ul>
      </div>

      <!-- Use the accurate heading level to maintain the document outline -->
      <h4 class="usa-accordion__heading">
        <button
          class="usa-accordion__button"
          aria-expanded="false"
          aria-controls="m-a3"
        >
          River Conditions
        </button>
      </h4>
      <div
        id="m-a3"
        class="usa-accordion__content"
      >
        <p>
          No Soldier shall, in time of peace be quartered in any house, without the
          consent of the Owner, nor in time of war, but in a manner to be prescribed
          by law.
        </p>
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
       <PortfolioCards />
      </div>
    </div>
  </div>
</template>


<script>
  import * as d3Base from 'd3';
  import uswds from 'uswds';
  import PortfolioCards from './PortfolioCards.vue';
   
  // make sure that the prop for the viz cards is passed in, not sure if this needs to be imported or piped
   
   export default {
        name: 'PortfolioAccordions',
        components: {
            PortfolioCards
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
            viz_list: null,
            viz_groups: null,
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
            this.viz_list = data[0];
            console.log(this.viz_list)
            
            
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