<template>
    <!---VizSection-->
    <VizSection
        id="violins"
        :figures="true"
        :fig-caption="false"
    >
        <!-- HEADING -->
        <template #heading>
            <h2>
                {{ text.heading }}
            </h2>
        </template>
        <!-- FIGURES -->
        <template #aboveExplanation>
            <p v-html="text.paragraph1" />
        </template>
        <template #figures>
            <div id="region-grid-container" :class="{ mobile: mobileView}">
                <cascMap
                    v-if="mobileView"
                    id="casc-svg"
                />
                <img
                    v-if="!mobileView"
                    id="radial-chart"
                    src="@/assets/images/polar_background_plot.png"
                    alt=""
                >
                <polarWedges
                    v-if="!mobileView"
                    id="wedges-svg"
                />
                <div id="map-container" v-if="!mobileView">
                    <img    
                        id="region-map-default"
                        class="region-map"
                        src="@/assets/images/casc_regions_map.png"
                        alt=""
                    >
                    <img    
                        v-for="region in regions"
                        :id="`region-map-${region}`"
                        :key="`map-${region}`" 
                        class="region-map hide"
                        :src="getMapImageUrl(region)"
                        alt=""
                    >
                </div>
                <div id="violin-container" :class="{ mobile: mobileView}">
                    <img
                        v-for="region in regions"
                        :id="`region-violin-${region}`"
                        :key="`violin-${region}`"
                        class="violin-chart hide"
                        :src=getViolinImageUrl(region)
                        alt=""
                    >
                </div>
            </div>
        </template>
        <!-- EXPLANATION -->
        <template #belowExplanation>
            <p v-html="text.paragraph2" />
        </template>
    </VizSection>
</template>
  
<script setup>
    import { onMounted } from "vue";
    import { isMobile } from 'mobile-device-detect';
    import * as d3 from 'd3';
    import VizSection from '@/components/VizSection.vue';
    import polarWedges from "@/assets/svgs/polar_wedges.svg";
    import cascMap from "@/assets/svgs/casc_regions_map.svg";

    // define props
    defineProps({
        text: { type: Object }
    })

    // global variables
    const mobileView = isMobile;
    const regions = ['Midwest', 'Northeast', 'Southeast', 'South-Central', 'Southwest', 'Northwest', 'North-Central']
    const bodyCSS = window.getComputedStyle(document.body)
    const focalColor = bodyCSS.getPropertyValue('--color-map-focal');
    const defaultColor = bodyCSS.getPropertyValue('--color-map-default');
   
    // Declare behavior on mounted
    // functions called here
    onMounted(() => {
        addInteractions();
    });

    function getMapImageUrl(name) {
        return new URL(`../assets/images/states_regions_${name}.png`, import.meta.url).href
    }

    function getViolinImageUrl(name) {
        return new URL(`../assets/images/vertical_violin_jd7d_2pct_${name}.png`, import.meta.url).href
    }
    
    function mouseoverWedge(event) {
        // Pull the region identifier
        let regionID = event.target.parentElement.id

        // Hide the default map
        const defaultMap = document.querySelector('#region-map-default');
        defaultMap.classList.add("hide");
        
        // Show the region-specific map
        const regionalMap = document.querySelector('#region-map-' + regionID);
        regionalMap.classList.add("show");
        
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

        // Hide the regional map
        const regionalMap = document.querySelector('#region-map-' + regionID);
        regionalMap.classList.remove("show"); 

        // Hide the regional violin chart
        const regionalViolin = document.querySelector('#region-violin-' + regionID);
        regionalViolin.classList.remove("show"); 
    }

    function mouseleaveWrapper() {
        // Show the default map
        const defaultMap = document.querySelector('#region-map-default');
        defaultMap.classList.remove("hide");

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

        // On mobile, set up interactions
        if (mobileView) {
            // Set viewbox for svg map of CASC regions
            const cascSVG = d3.select("#casc-svg")
                .attr("viewBox", "0 0 " + 648 + " " + 432)
                .attr("preserveAspectRatio", "xMidYMid meet")
                .attr("width", '100%')
                .attr("height", '100%')

            // by default have Northwest region showing
            // Highlight that region on the map and show violin chart and description
            const selectedRegion = "Northwest"
            showSelectedRegion(cascSVG, selectedRegion)

            // add interaction to CASC regions map
            cascSVG.selectAll('.CASC_region')
                .on("click", (event) =>clickRegion(event))
        }
    }

    function showSelectedRegion(svg, region) {
        svg.selectAll(".CASC_region")
            .style("fill", defaultColor)
            .style("opacity", 1)
        svg.select("#" + region)
            .style("fill", focalColor)
            .style("fill-opacity", 0.5)

        // Show the regional violin chart
        const regionalViolin = document.querySelector('#region-violin-' + region);
        regionalViolin.classList.add("show");
    }

    function clickRegion(event) {
        // Pull the region identifier
        let regionID = event.target.id // unique region id - use to tie to regional violin and map
        
        // Highlight that region on the map while dehighlighting other regions
        const cascSVG = d3.select("#casc-svg")
        cascSVG.selectAll(".CASC_region")
            .style("fill", defaultColor)
            .style("opacity", 1)
        cascSVG.selectAll("#" + regionID)
            .style("fill", focalColor)
            .style("fill-opacity", 0.5)

        // Show the regional violin chart while hiding other violin charts
        const allViolins = document.querySelectorAll('.violin-chart')
        allViolins.forEach(violin => violin.classList.remove("show"))
        const regionalViolin = document.querySelector('#region-violin-' + regionID);
        regionalViolin.classList.add("show");
    }
</script>
  
<style scoped lang="scss">
    #region-grid-container {
        display: grid;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto 0 auto;
        grid-template-columns: 80% 20%;
        grid-template-rows:  90vh;
        grid-template-areas:
            "radial violin";
    }
    #region-grid-container.mobile {
        grid-template-columns: 100%;
        grid-template-rows:  max-content 100vh ;
        grid-template-areas:
            "map"
            "violin"; 
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
    #map-container {
        grid-area: radial;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }
    .region-map {
        position: absolute;
        height: 10%;
        width: auto;
        margin-left: 0.5%; //nudges map right
    }
    #casc-svg {
        max-height: 150px;
        grid-area: map;
        width: 100%;
        height: 100%;
    }
    #violin-container {
        grid-area: violin;
        position: relative;
        display: flex;
        justify-content: start;
        align-items: center;
    }
    #violin-container.mobile {
        justify-content: center;
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
/* css for elements added/classed w/ d3 */
    .wedge polygon {
        fill: var(--color-background);
        stroke: none;
    }
    .polarAxisText {
        pointer-events: none;
    }
</style>
  