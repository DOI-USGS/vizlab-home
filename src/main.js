import "core-js/stable";
import "regenerator-runtime/runtime";
import Vue from 'vue';
import VueImg from 'v-img';
import router from "./router";
import { store } from './store/store'
import App from './App.vue';
import uswds from 'uswds';
import browserDetect from 'vue-browser-detect-plugin';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueCarousel from 'vue-carousel';

// social icons
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faFlickr } from '@fortawesome/free-brands-svg-icons'
import { faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

const vueImgConfig = {
  altAsTitle: true
}

Vue.component('FontAwesomeIcon', FontAwesomeIcon);
Vue.use(VueCarousel);
Vue.use(VueImg, vueImgConfig)

// social icons
library.add(faTwitterSquare);
library.add(faFacebookSquare);
library.add(faGithub);
library.add(faFlickr);
library.add(faYoutubeSquare);
library.add(faInstagram);

Vue.use(uswds);
Vue.use(browserDetect);


const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
  

