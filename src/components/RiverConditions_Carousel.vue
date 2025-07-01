<template>
  <div class="maxWidth carouselContainer">
    <Carousel
      class="image-slider"
      :autoplay="false"
      :pauseAutoplayOnHover="true"
      :itemsToShow="3"
      :centerMode="true"
      :wrapAround="true"
      :transition="800"
      navigation
    >
      <Slide
        v-for="(chart, index) in charts"
        :key="chart.id"
        class="slide"
        @click="handleSlideClick(index)"
      >
        <div class="slider-video-container">
          <div class="video-border">
            <center>
              <a
                :href="chart.drupal_url"
                target="_blank"
                class="video-title"
              >{{ chart.name }}</a>
            </center>
            <video
              class="video"
              width="100%"
              :poster="getThumbnailUrl(chart.folder, chart.image_thumbnail)"
              controls
            >
              <source
                :src="getVideoUrl(chart.folder, chart.video_basename, chart.video_type)"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<script setup>
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import { ref, onMounted } from 'vue'
import RiverConditions from '@/assets/content/RiverConditions.js'

const charts = ref([...RiverConditions.riverConditionsCharts])

function getVideoUrl(folder, video, extension) {
  return `https://labs.waterdata.usgs.gov/visualizations/river-conditions/${folder}${video}.${extension}`
}

function getThumbnailUrl(folder, thumbnail) {
  return `https://labs.waterdata.usgs.gov/visualizations/river-conditions/${folder}${thumbnail}`
}

function handleSlideClick(index) {
  window.open(charts.value[index].drupal_url, '_blank')
}

onMounted(() => {
  charts.value.sort((a, b) => new Date(a.date) - new Date(b.date))
  charts.value.forEach(chart => {
    chart.caption = `Animation available <a href='${chart.drupal_url}' target="_blank">here</a>. View code <a href='${chart.drupal_url}' target="_blank">here</a>.`
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
  select:focus {
    outline: none;
  }
}
.slide:hover {
  transform: translate3D(0, -0.5px, 0) scale(1.05);
  transition: all 0.3s ease;
}
.slider-video-container {
  padding-left: 10px;
  padding-right: 10px;
  display: grid;
  grid-template-columns: max-content;
  height: 380px;
  max-width: 400px;
  align-content: center;
  justify-content: center;
}
.video-border {
  border-width: 2px;
  border-color: #dfe1e2;
  border-style: solid;
  border-radius: 7px;
}
.video {
  max-width: 430px;
  max-height: 300px;
  margin-bottom: -7px;
  border-radius: 7px;
}
.video-title {
  margin-top: 5px;
  margin-bottom: -5px;
}
</style>
