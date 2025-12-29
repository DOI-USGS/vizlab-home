import './assets/css/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueUswds from "vue-uswds"
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCode } from '@fortawesome/free-solid-svg-icons';

// social icons
import { faSquareXTwitter, faFacebookSquare, faGithub, faFlickr, faYoutubeSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";
library.add(faSquareXTwitter, faFacebookSquare, faGithub, faFlickr, faYoutubeSquare, faInstagram);

library.add(faCode);

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(VueUswds)
app.use(router)
app.component("FontAwesomeIcon", FontAwesomeIcon)

app.mount('#app')
