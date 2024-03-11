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
                <div class="slider-video-container">
                    <video width="100%" :poster="getThumbnailUrl(chart.folder, chart.image_thumbnail)" onmouseover="this.play();this.setAttribute('controls','controls')" onmouseout="this.load();this.removeAttribute('controls')"> <!-- use atuoplay muted to get videos to autoplay -->
                        <source :src="getVideoUrl(chart.folder, chart.video_basename, chart.video_type)" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
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
            getVideoUrl(folder, video, extension) {
                return 'https://labs.waterdata.usgs.gov/visualizations/river-conditions/' + folder + video + '.' + extension;
            },
            getThumbnailUrl(folder, thumbnail) {
                return 'https://labs.waterdata.usgs.gov/visualizations/river-conditions/' + folder + thumbnail;
            },
            handleSlideClick () {
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

    .slider-video-container {
        padding-left: 10px;
        padding-right: 10px;
        display: grid;
        grid-template-columns: max-content;
        height: 380px;
        max-width: 400px;
        align-content: center;
        justify-content: center;
        video {
            max-width: 430px;
            max-height: 330px;
            border-width: 2px;
                border-color: #dfe1e2;
                border-style: solid;
                border-radius: 7px;
        }
    }
</style>