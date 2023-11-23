<template>
  <div>
    <WindowSize v-if="checkTypeOfEnv !== '-test build-'" />
    <HeaderUSWDSBanner v-if="checkTypeOfEnv === '-test build-'" />
    <HeaderUSGS />
    <WorkInProgressWarning v-if="checkTypeOfEnv === '-beta build-'" />
    <RouterView />
    <FooterUSGS />
  </div>
</template>

<script>
import { RouterView } from 'vue-router'
import WindowSize from "./components/WindowSize.vue";
import HeaderUSWDSBanner from "./components/HeaderUSWDSBanner.vue";
import HeaderUSGS from './components/HeaderUSGS.vue';
import WorkInProgressWarning from "./components/WorkInProgressWarning.vue";
import FooterUSGS from './components/FooterUSGS.vue';
import { useWindowSizeStore } from './stores/WindowSizeStore';

export default {
  name: 'App',
  components: {
      RouterView,
      HeaderUSWDSBanner,
      WindowSize,
      HeaderUSGS,
      WorkInProgressWarning,
      FooterUSGS
  },
  data() {
    return {
      WindowSizeStore: useWindowSizeStore()
    }
  },
  computed: {
    checkTypeOfEnv() {
        return import.meta.env.VITE_APP_TIER
    }
  },
  created() {
    // Add window size tracking by adding a listener and a way to store the values in the Pinia state
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  methods:{
    handleResize() {
      this.WindowSizeStore.windowWidth = window.innerWidth;
      this.WindowSizeStore.windowHeight = window.innerHeight;
    },
  }
}
</script>

<style scoped>
</style>
