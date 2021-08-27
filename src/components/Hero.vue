<template>
  <div id="main">
    <section
      class="usa-hero"
      aria-label="Introduction"
    >
      <div class="grid-container">
        <div class="usa-hero__callout">
          <h1 class="usa-hero__heading">
            <span class="usa-hero__heading--alt">Just Released:</span>
            Title of most recently released Product
          </h1>
          <p>
            Description from the most recent viz, with some short explanatory text.
          </p>
          <a
            class="usa-button"
            href="javascript:void(0)"
          >View</a>
        </div>
      </div>
    </section>

    <section class="grid-container usa-section">
      <div class="grid-row grid-gap">
        <div class="tablet:grid-col-4">
          <h2 class="font-heading-xl margin-top-0 tablet:margin-bottom-0">
            Vizualizing USGS Water Data
          </h2>
        </div>
        <div class="tablet:grid-col-8 usa-prose">
          <p>
            The tagline should inspire confidence and interest, focusing on the
            value that your overall approach offers to your audience. Use a
            heading typeface and keep your tagline to just a few words, and don’t
            confuse or mystify.
          </p>
          <p>
            View our entire portfolio of visualizations below. 
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
    export default {
        name: 'Hero',
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
          },
          goTo(data){
            // use data to dynamically load url to button so it functions like a link

          }
        }
    }
</script>

<style>
 @import '~uswds/dist/css/uswds.css'; 

 .usa-hero {
     /* background-image: url(); */
 }
</style>

