<template v-slot:figures>
    <div class="maxWidth carouselContainer">
        <carousel 
            class="image-slider"
            :autoplay="false"
            :autoplay-hover-pause="true"
            :per-page="3"
            :center-mode="true"
            navigation-enabled
            :speed="800"        >
            <slide
                v-for="chart in charts"
                :id="`river-conditions-${chart.id}`"
                :key="chart.id"
                class="slide"
                @slideclick="handleSlideClick">
                
                <center>
                <br>{{chart.name}}
                </center>
                <div class="slider-image-container">
                    <picture>
                    <source
                    :srcset="getImgUrl(chart.folder, chart.image_basename, 'png')"
                    type="image/png"
                    >
                    <source
                    :srcset="getImgUrl(chart.folder, chart.image_basename, chart.image_type)"
                    type="image/jpg"
                    >
                    <img 
                        :id="`river-conditions-${chart.id}`"
                        v-img="{
                        thumbnails: true,
                        group: 'river-conditions', 
                        title: chart.caption
                        }"
                    class="sliderImage"
                    :src="getImgUrl(chart.folder, chart.image_basename, chart.image_type)"
                    :alt="chart.image_alt"
                    loading="lazy"
                    >
                    </picture>
                </div>
                <center>
                <div style="padding-bottom: 8px;">
                    <a :href=chart.drupal_url target="_blank" class="usa-button usa-button--outline">View</a>
                    <a :href=chart.code_url target="_blank" class="usa-button">Code</a>
                </div><br>
                </center>
            </slide>
        </carousel>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import RiverConditions from "@/assets/content/RiverConditions.js";
    export default {
        name: 'RiverConditionsCarousel',
        components:{
            Carousel,
            Slide
        },
        data() {
            return {
                charts: RiverConditions.riverConditionsCharts
            }
        },
        mounted(){
            // sort charts
            this.charts.sort((a,b) => new Date(a.date) - new Date(b.date))
            // for each chart, build caption for use w/ v-img
            this.charts.forEach(chart => {
                chart.caption = 'Animation available <a href=' + chart.drupal_url + ' target="_blank">here</a>. View code <a href=' + chart.drupal_url + ' target="_blank">here</a>.'
            })
        },
        methods: {
            getImgUrl(folder, pic, extension) {
              // TODO: alternative if image is not given or broken
                return 'https://labs.waterdata.usgs.gov/visualizations/river-conditions/' + folder + pic + '.' + extension
            },
            handleSlideClick () {
                console.log('drpual link')
                this.charts.forEach(chart => {
                    window.open(chart.drupal_url, "_blank");
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .carouselContainer {
        max-width: 98%;
    }
    .image-slider {
        margin: auto;
        max-width: 70rem;
      *:focus{
        outline: none;
        }
    }

    .VueCarousel-slide {
        flex-basis: inherit;
        flex-grow: 0;
        flex-shrink: 0;
        user-select: none;
        backface-visibility: hidden;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        outline: 2px solid #dfe1e2;
        outline-offset: -15px;
        border-radius: 19px;
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
        padding-left: 10px;
        padding-right: 10px;
        display: grid;
        grid-template-columns: max-content;
        height: 280px;
        max-width: 400px;
        align-content: center;
        justify-content: center;
        img {
            max-width: 370px;
            max-height: 270px;
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
    .VueCarousel-navigation {
        @media (max-width: 600px) {
            display: none;
        }
    }
    //Hides v-img title element
    .title-v-img{
        display: none;
    }
    .fullscreen-v-img{
        position: relative;
        //display: none; //hides opening the images?
    }
    .footer-v-img {
        justify-content: start !important;
    }
    .footer-v-img img {
        width: auto !important;
        height: 40px !important;
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
        display: flex;
        justify-content: center;
        @media screen and (max-width: 600px) {
            padding: 20px 10px;
            font-size: .8em;
        }
        .caption{
            margin: 0 auto 70px auto;
            max-width: 900px;
            line-height: 1.5em;
        }
    }
</style>