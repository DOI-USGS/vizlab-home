<template>
  <div class="maxWidth carouselContainer">
    <Carousel
      class="image-slider"
      :autoplay="false"
      :pauseAutoplayOnHover="true"
      :itemsToShow="3"
      :wrapAround="true"
      :transition="800"
      navigation
    >
      <Slide
        v-for="chart in charts"
        :key="chart.id"
        class="slide"
      >
        <div class="slider-image-container">
          <picture>
            <source
              :srcset="getImgUrl(chart.folder, chart.image_basename, 'png')"
              type="image/png"
            />
            <source
              :srcset="getImgUrl(chart.folder, chart.image_basename, chart.image_type)"
              type="image/jpg"
            />
            <img
              class="sliderImage"
              :src="getImgUrl(chart.folder, chart.image_basename, chart.image_type)"
              :alt="chart.image_alt"
              loading="lazy"
              v-img="{
                thumbnails: true,
                group: 'flow-tiles',
                title: chart.caption
              }"
            />
          </picture>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import { ref, onMounted } from 'vue'
import FlowTiles from '@/assets/content/FlowTiles.js'

const charts = ref([...FlowTiles.flowTilesCharts])

function getImgUrl(folder, pic, extension) {
  return `https://labs.waterdata.usgs.gov/visualizations/flow/${folder}${pic}.${extension}`
}

onMounted(() => {
  charts.value.sort((a, b) => new Date(a.date) - new Date(b.date))
  charts.value.forEach(chart => {
    chart.caption = 'Released on <a href=' + chart.twitter_url + ' target="_blank">Twitter</a>. View code <a href=https://github.com/DOI-USGS/flow-tiles target="_blank">here</a>.'
  })
})
</script>

<style scoped lang="scss">
.carouselContainer {
  max-width: 98%;
}
.image-slider {
  margin: auto;
  max-width: 70rem;
  *:focus {
    outline: none;
  }
}
.slide {
  margin: 0;
  padding: 0;
}
.slide:hover {
  transform: translate3D(0, -0.5px, 0) scale(1.05);
  transition: all 0.3s ease;
}
.slider-image-container {
  padding: 10px;
  display: grid;
  grid-template-columns: max-content;
  height: 200px;
  max-width: 375px;
  align-content: center;
  justify-content: center;
  img {
    max-width: 320px;
    max-height: 250px;
    border-width: 2px;
    border-color: #dfe1e2;
    border-style: solid;
    border-radius: 7px;
  }
}
</style>
