<template>
  <div
    id="portfolio-container"
    class="grid-container"
  >
    <ul class="usa-card-group grid-row">
      <li
        v-for="viz in viz_list"
        :key="viz.title"
        class="tablet:grid-col-4 usa-card"
      >
        <div class="usa-card__container">
          <header class="usa-card__header">
            <h2 class="usa-card__heading">
              {{ viz.title }}
            </h2>
          </header>
          <div class="usa-card__media">
            <div class="usa-card__img">
              <img
                src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
                :alt="viz.title" 
              >
            </div>
          </div>
          <div class="usa-card__body">
            <p>
              {{ viz.description }}
            </p>
            <p>
              Published {{ viz.released }}
            </p>
          </div>
          <div class="usa-card__footer">
            <ul class="usa-button-group">
              <li class="usa-button-group__item">
                <a 
                  :href="viz.url"
                  target="_blank"
                  class="usa-button"
                >View</a>
              </li> 
              <li class="usa-button-group__item">
                <a 
                  :href="viz.url" 
                  target="_blank"
                  class="usa-button usa-button--outline"
                >Code</a>
              </li>              
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as d3Base from 'd3';
  import uswds from 'uswds';
   
  // make sure that the prop for the viz cards is passed in, not sure if this needs to be imported or piped
   
   export default {
        name: 'PortfolioCards',
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
            // console.log(this.viz_list)
          }
        }
    }
       
       
</script>

<style>
  /* this line is critical for importing USWDS styling */
  @import '~uswds/dist/css/uswds.css'; 

</style>