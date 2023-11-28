<template>
    <div id="region-grid-container">
        <img
            id="radial-chart"
            src="@/assets/images/polar_background_plot.png"
            alt=""
        >
        <polarWedges
            id="wedges-svg"
        />
        <img
            id="region-map"
            :src="regionMapFilepath"
            alt=""
        >
        <div id="violin-container">
          <img
            v-for="region in regions"
            :id="`region-violin-${region}`"
            :key="`violin-${region}`"
            class="violin-chart hide"
            :src="`${violinFilepath}/vertical_violin_jd7d_2pct_${region}.png`"
            alt=""
          >
        </div>
    </div>
</template>
  
<script setup>
    import { onMounted, ref } from "vue";
    import * as d3 from 'd3';
    import polarWedges from "@/assets/svgs/polar_wedges.svg?component";

    // global variables
    const regions = ['Midwest', 'Northeast', 'Southeast', 'South-Central', 'Southwest', 'Northwest', 'North-Central']

    // build dynamic filepath for map image
    const regionMapFilename = ref();
    regionMapFilename.value = "casc_regions_map";
    const regionMapFilepath = ref();
    regionMapFilepath.value = new URL(`../assets/images/${regionMapFilename.value}.png`, import.meta.url).href

    // Set url path for violin images added w/ v-for
    const violinFilepath = new URL("../assets/images/", import.meta.url).href

    // Declare behavior on mounted
    // functions called here
    onMounted(() => {
        addInteractions();
    });

    // All functions
    function updateMapPath(val) {
        regionMapFilename.value = val;
        regionMapFilepath.value = new URL(`../assets/images/${regionMapFilename.value}.png`, import.meta.url).href
    }

    function mouseoverWedge(event) {
        // Pull the region identifier
        let regionID = event.target.parentElement.id
        
        // Show the region-specific map
        updateMapPath(`states_regions_${regionID}`)
        
        // Make all wedges _except_ the one hovered over partially opaque
        // This highlights the current wedge
        d3.selectAll(".wedge").selectAll('polygon')
            .style("fill-opacity", 0.8)
        d3.select("#" + regionID).selectAll('polygon')
            .style("fill-opacity", 0)

        // Show the regional violin chart
        const regionalViolin = document.querySelector('#region-violin-' + regionID);
        regionalViolin.classList.add("show");
      }
    function mouseoutWedge(event) {
        // Pull the region identifier
        let regionID = event.target.parentElement.id

        // Hide the regional violin chart
        const regionalViolin = document.querySelector('#region-violin-' + regionID);
        regionalViolin.classList.remove("show"); 
    }
    function mouseleaveWrapper() {
        // Show the default map
        updateMapPath("casc_regions_map")

        // Make all wedges transparent
        d3.selectAll(".wedge").selectAll('polygon')
            .style("fill-opacity", 0)
    }
    function addInteractions() {
        // set viewbox for svg with wedges
        const wedgesSVG = d3.select("#wedges-svg")
            .attr("viewBox", "0 0 " + 360 + " " + 360)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .attr("width", '100%')
            .attr("height", '100%')
        
        // Add interaction to wedges
        wedgesSVG.selectAll('.wedge')
            .on("mouseover", (event) => mouseoverWedge(event))
            .on("mouseout", (event) => mouseoutWedge(event))

        // Add mouseleave to wrapper, which is a group that contains the wedges
        wedgesSVG.selectAll('#wrapper')
            .on("mouseleave", mouseleaveWrapper)
    }
</script>
  
<style scoped lang="scss">
    #region-grid-container {
        display: grid;
        width: 95vw;
        max-width: 1200px;
        margin: 0 auto 0 auto;
        grid-template-columns: 80% 20%;
        grid-template-rows:  70vh;
        grid-template-areas:
            "radial violin";
    }
    #radial-chart {
        grid-area: radial;
        place-self: center;
        max-height: 115%;
        max-width: 115%;
    }
    #wedges-svg {
        grid-area: radial;
        place-self: center;
        width: 115%;
        height: 115%;
    }
    #region-map {
        grid-area: radial;
        height: 10%;
        width: auto;
        place-self: center;
        margin-left: 0.5%; //nudges map right
    }
    #violin-container {
        grid-area: violin;
        position: relative;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    .violin-chart {
        transform: rotate(180deg);
        position: absolute;
        max-height: 95%;
        max-width: 100%;
    }
    .hide {
        display: none;
    }
    .show {
        display: inline;
    }
</style>
<style lang="scss">
    .wedge polygon {
        fill: var(--color-background);
        stroke: none;
    }
</style>
  