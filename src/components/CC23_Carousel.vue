<template v-slot:figures>
  <div class="maxWidth carouselContainer">
    <carousel
      class="image-slider"
      :autoplay="false"
      :autoplay-hover-pause="true"
      :per-page="4"
    >
      <slide
        v-for="chart in charts"
        :id="`chart-challenge-${chart.id}`"
        :key="chart.id"
        class="slide"
      >
        <div class="slider-image-container">
          <picture>
            <source
              :srcset="getImgUrl(chart.image_basename, 'webp')"
              type="image/webp"
            >
            <source
              :srcset="getImgUrl(chart.image_basename, chart.image_type)"
              type="image/jpg"
            >
            <img 
              :id="`chart-challenge-${chart.id}`"
              v-img="{
                thumbnails: true,
                group: 'chart-challenge', 
                title: chart.cc_prompt + ' by ' + chart.author
              }"
              class="sliderImage"
              :src="getImgUrl(chart.image_basename, chart.image_type)"
              :alt="chart.image_alt"
              loading="lazy"
            >
          </picture>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
    import * as d3Base from 'd3';
    import { Carousel, Slide } from 'vue-carousel';
    import CC23 from "@/assets/content/CC23.js";
    export default {
        name: 'ChartChallenge23Carousel',
        components:{
            Carousel,
            Slide
        },
        data() {
          return {
            d3: null,
            charts: CC23.chartChallengeCharts
          }
        },
        mounted(){
          this.d3 = Object.assign(d3Base);
          // sort charts
          this.charts.sort((a,b) => this.d3.ascending(a.date, b.date))
        },
        methods: {
          getImgUrl(pic, extension) {
            // TODO: alternative if image is not given or broken
            return 'https://labs.waterdata.usgs.gov/visualizations/charts/' + pic + '.' + extension
          }
        }
    }
</script>

<style scoped lang="scss">
  .image-slider {
    *:focus{
      outline: none;
    }
  }
  .slide {
    margin: 0;
    padding: 0;
    select:focus{
      outline: none;
    }
  }
  .slide:hover {
    transform: translate3D(0,-0.5px,0) scale(1.05);
    transition: all .3s ease; 
  }
  .slider-image-container {
    padding: 10px;
    display: grid;
    grid-template-columns: max-content;
    height: 200px;
    max-width: 275px;
    align-content: center;
    justify-content: center;
    img {
      max-width: 255px;
      max-height: 180px;
    }
  }
  </style>
  <style lang="scss">
  .VueCarousel-dot-container {
    margin-top: 0px !important;
  }
  .VueCarousel-dot {
    margin-top: 0px !important;
  }
  //Hides v-img title element
  .title-v-img{
    display: none;
  }
  .fullscreen-v-img{
    position: relative;
  }
  #captionArea{
    background: rgba(255,255,255,1);
    position: absolute;
    width: 100%;
    bottom: 0px;
    z-index: 9000;
    text-align: left;
    padding: 20px 10px;
    color: black;
    font-size: 1em;
    @media screen and (max-width: 600px) {
      padding: 20px 10px;
      font-size: .8em;
    }
    .caption{
      margin: 0 auto 70px auto;
      max-width: 700px;
      line-height: 1.5em;
    }
  }
</style>