<template>
  <div id="portfolio-accordions">
    <h2 id="header-viz" class="site-preview-heading">
      <span class="lowlight" style="line-height: 10%">Visualizations</span>
    </h2>
    <div class="usa-accordion" aria-multiselectable="true">
      <h3 id="head-interactives" class="usa-accordion__heading">
        <button class="usa-accordion__button" aria-expanded="true" aria-controls="m-a1">
          Interactives
        </button>
      </h3>
      <div id="m-a1" class="usa-accordion__content usa-prose">
        <div class="card-container grid-container">
          <ul class="usa-card-group grid-row">
            <PortfolioCard
              v-for="viz in vizList_interactives"
              :key="viz.title"
              :viz="viz"
              class="tablet:grid-col-4 grid-col-auto usa-card"
            />
          </ul>
        </div>
      </div>

      <h3 id="head-gallery" class="usa-accordion__heading">
        <button class="usa-accordion__button" aria-expanded="true" aria-controls="m-a2">
          Chart Gallery <span id="text-info"> Click on each card to see in the wild</span>
        </button>
      </h3>
      <div id="m-a2" class="usa-accordion__content">
        <h4 id="head-chart-challenge">Chart Challenge 2023</h4>
        <ChartChallenge23Carousel />

        <h4 id="head-river-conditions">
          U.S. River Conditions (quarterly)
          <a href="https://github.com/DOI-USGS/gage-conditions-gif" target="_blank" style="font-style: italic; font-size: 0.9em">
            View Code<span class="arrow">→</span>
          </a>
        </h4>
        <RiverConditionsCarousel />

        <h4 id="head-streamflow">Monthly Streamflow</h4>
        <FlowTilesCarousel />

        <h4 id="head-chart-challenge">Other charts</h4>
        <div class="card-container grid-container">
          <ul class="usa-card-group grid-row">
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

      <h3 id="head-events" class="usa-accordion__heading">
        <button class="usa-accordion__button" aria-expanded="true" aria-controls="m-a3">
          Events / Current Conditions
        </button>
      </h3>
      <div id="m-a3" class="usa-accordion__content">
        <div class="card-container grid-container">
          <ul class="usa-card-group grid-row">
            <PortfolioCard
              v-for="viz in vizList_events"
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

<script setup>
import * as d3 from 'd3'
import { ref, onMounted } from 'vue'

import PortfolioCard from './PortfolioCard.vue'
import PortfolioImage from './PortfolioImage.vue'
import ChartChallenge23Carousel from './CC23_Carousel.vue'
import RiverConditionsCarousel from './RiverConditions_Carousel.vue'
import FlowTilesCarousel from './FlowTiles_Carousel.vue'

const vizList = ref([])
const vizList_interactives = ref([])
const vizList_events = ref([])
const vizList_charts = ref([])

const publicPath = import.meta.env.BASE_URL

const vizGroups = ['interactives', 'event', 'chart']

onMounted(() => {
  d3.csv(`${publicPath}viz-list.csv`, d3.autoType).then((data) => {
    vizList.value = data
    vizList_interactives.value = data.filter((viz) => viz.group === vizGroups[0])
    const events = data.filter((viz) => viz.group === vizGroups[1])
    vizList_events.value = events.filter((viz) => !viz.title.includes('River Conditions'))
    const charts = data.filter((viz) => viz.group === vizGroups[2])
    vizList_charts.value = charts.filter((viz) => !viz.title.includes('Flow cartogram'))
  })
})
</script>
