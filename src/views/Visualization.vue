<template>
  <div id="visualization">
    <!-- <h1>{{ title }}</h1> -->
  </div>
</template>

<script>
import * as d3Base from 'd3';
    export default {
        name: 'Visualization',
      //   props: {
      //       title: {
      //           type: String,
      //           default: process.env.VUE_APP_TITLE
      //       }
      //   },
      //  data() {
      //   return {
      //     publicPath: process.env.BASE_URL, // allows app to find the files when on different deployment roots
      //     d3: null,
      //     viz_list: null,
      //   }
      //  },
      //   mounted(){
      //     this.d3 = Object.assign(d3Base);
      //     this.loadData();  
      // },
      // methods:{
      //   loadData() {
      //     const self = this;

      //     // read in data 
      //     let promises = [
      //     self.d3.csv(self.publicPath + "viz-list.csv",  this.d3.autotype) // list of published viz from drupal page
      //     ];
      //     Promise.all(promises).then(self.callback); // once it's loaded
      //   },
      //   callback(data) {
      //     // assign data
      //     this.viz_list = data[0];
      //     console.log(this.viz_list)
      //   }
      // }
    }
</script>

<style scoped lang="scss">

</style>
