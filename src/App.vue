<template>
  <div id="app">
    <!-- <WindowSize v-if="checkTypeOfEnv === '-test build-'" /> -->
    <HeaderUSGS />
    <InternetExplorerPage v-if="isInternetExplorer" />
    <!-- <WorkInProgressWarning v-if="checkTypeOfEnv !== '' & !isInternetExplorer" /> --> <!-- an empty string in this case means the 'prod' version of the application   -->
    <router-view
      v-if="!isInternetExplorer"
    />
    <PreFooterCodeLinks v-if="!isInternetExplorer" />
    <FooterUSGS />
  </div>
</template>

<script>
    // import WindowSize from "./components/WindowSize";
    import HeaderUSGS from './components/HeaderUSGS';
    import { isMobile } from 'mobile-device-detect';
  
    
    export default {
        name: 'App',
        components: {
            // WindowSize,
            HeaderUSGS,
            InternetExplorerPage: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "internet-explorer-page"*/ "./components/InternetExplorerPage"),
            //WorkInProgressWarning: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "work-in-progress-warning"*/ "./components/WorkInProgressWarning"),
            //PreFooterVisualizationsLinks: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "pre-footer-links-visualizations"*/ "./components/PreFooterVisualizationsLinks"),
            PreFooterCodeLinks: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "pre-footer-links-code"*/ "./components/PreFooterCodeLinks"),
            FooterUSGS: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "usgs-footer"*/ "./components/FooterUSGS") // Have Webpack put the footer in a separate chunk so we can load it conditionally (with a v-if) if we desire
        },
        data() {
            return {
                isInternetExplorer: false,
                title: process.env.VUE_APP_TITLE,
                publicPath: process.env.BASE_URL, // this is need for the data files in the public folder
                mobileView: isMobile
            }
        },
        computed: {
          checkTypeOfEnv() {
              return process.env.VUE_APP_TIER
          }
        },
        created() {
            // We are ending support for Internet Explorer, so let's test to see if the browser used is IE.
            this.$browserDetect.isIE ? this.isInternetExplorer = true : this.isInternetExplorer = false;
            // Add window size tracking by adding a listener and a way to store the values in the Vuex state
            window.addEventListener('resize', this.handleResize);
            this.handleResize();
        },
        unmounted() {
            window.removeEventListener('resize', this.handleResize);
        },
        methods:{
          handleResize() {
                this.$store.commit('recordWindowWidth', window.innerWidth);
                this.$store.commit('recordWindowHeight', window.innerHeight);
            },
        }
    }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700;1,900&display=swap');
$darkGreen: #1F7564;
$nearBlack: #181a1a;
$coolBlue: #005ea2;
$sourceSans: 'Source Sans Pro', sans-serif;

html,
body {
      height:100%;
      margin: 0;
      padding: 0;
      line-height: 1.2;
      font-family: $sourceSans;
      font-size: 16px;
      font-weight: 400;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      width: 100%;
      @media screen and (max-width: 600px) {
        font-size: 16px;
      }
  }
  h1{
  font-size: 3.5em;
  font-weight: 600;
  font-family: $sourceSans;
  line-height: 1;
  text-align: left;
  @media screen and (max-width: 600px) {
    font-size: 2.5em;
  }
}
h2{
  font-weight: 600;
  text-align: left;
  color: $darkGreen;
  font-family:$sourceSans;
  font-size: 2.25em;
  margin-top: 2px;
  line-height: 1;
  @media screen and (max-width: 600px) {
    font-size: 2em;
  }
  padding-left: 0rem;
}
h3{
  font-size: 1.75em;
  padding-top: 0em;
  color: $nearBlack;
  margin: 0px;
  font-family: $sourceSans;
  font-weight: 600;
  @media screen and (max-width: 600px) {
      font-size: 1em;
  }  
}
a {
  color: $coolBlue;
}
.site-preview-heading {
  padding: 1rem;
}
$theme-accordion-font-family: $sourceSans;

</style>
