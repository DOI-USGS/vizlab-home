<template>
  <div class="maxWidth carouselContainer">
    <Carousel
      class="image-slider"
      :autoplay="false"
      :pauseAutoplayOnHover="true"
      :itemsToShow="4"
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
              :srcset="getImgUrl(chart.image_basename, 'webp')"
              type="image/webp"
            />
            <source
              :srcset="getImgUrl(chart.image_basename, chart.image_type)"
              type="image/jpeg"
            />
            <img
              class="sliderImage"
              :src="getImgUrl(chart.image_basename, chart.image_type)"
              :alt="chart.image_alt"
              loading="lazy"
              v-img="{
                thumbnails: true,
                group: 'chart-challenge',
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
import { ref, onMounted } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'
import CC23 from '@/assets/content/CC23.js'

const charts = ref([...CC23.chartChallengeCharts])

function getImgUrl(pic, extension) {
  return `https://labs.waterdata.usgs.gov/visualizations/charts/${pic}.${extension}`
}

onMounted(() => {
  charts.value.sort((a, b) => new Date(a.date) - new Date(b.date))
  charts.value.forEach(chart => {
    chart.caption =
      `contribution for ${chart.cc_prompt} by ${chart.author}. original available <a href="${chart.drupal_url}" target="_blank">here</a>. released on <a href="${chart.tweet_url}" target="_blank">twitter</a>.`
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
  transform: translate3d(0, -0.5px, 0) scale(1.05);
  transition: all 0.3s ease;
}
.slider-image-container {
  padding: 10px;
  display: grid;
  grid-template-columns: max-content;
  height: 200px;
  max-width: 275px;
  align-content: center;
  justify-content: center;
}
.slider-image-container img {
  max-width: 255px;
  max-height: 180px;
}

/* Vue3-carousel dots & navigation */
.carousel__dots {
  margin-top: 0 !important;
}
.carousel__arrow {
  @media (max-width: 600px) {
    display: none;
  }
}

/* hide v-img title element */
.title-v-img {
  display: none;
}
.fullscreen-v-img {
  position: relative;
}
.footer-v-img {
  justify-content: start !important;
}
.footer-v-img img {
  width: auto !important;
  height: 40px !important;
}
#captionArea {
  background: rgba(255, 255, 255, 1);
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 9000;
  text-align: left;
  padding: 20px 10px;
  color: black;
  font-size: 1em;
  display: flex;
  justify-content: center;
  @media (max-width: 600px) {
    padding: 20px 10px;
    font-size: 0.8em;
  }
}
.caption {
  margin: 0 auto 70px auto;
  max-width: 900px;
  line-height: 1.5em;
}
</style>
