<template>
  <div class="section-title-container" :id="content.id">
    <div
      class="title-container"
      :height="height"
      :style="sectionVars"
    >
      <div class="sectionTitle title">
        <h1>
          {{ content.title }}
        </h1>
      </div>
      <div
        class="bg"
        :style="overlayVars"
      >
        <img 
          class="bg-image"
          :class="{ mobile: mobileView}"
          :srcset="getImageUrl(content.image)"
          :alt="content.alt"
        >
        <div
          v-if="overlay"
          class="overlay"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import {computed} from 'vue';
  import { isMobile } from 'mobile-device-detect';

  // global variables
  const mobileView = isMobile;

  const props = defineProps({
    height: {
      type: Number,
      default: 100
    },
    content: {
      type: Object
    },
    overlay: {
      type: Boolean,
      default: true
    },
    overlayOpacity: {
      type: Number,
      default: .7
    }    
  })
  
  const sectionVars = computed(() => {
    return { "--height": `${props.height}vh` }
  })

  const overlayVars = computed(() => {
    return { "--overlay-opacity": `${props.overlayOpacity}` }
  })

  function getImageUrl(image) {
    return new URL(`../assets/images/${image}`, import.meta.url).href
  }
</script>

<style lang="scss" scoped>
  .section-title-container {
    margin: 8rem 0 2rem 0;
  }
  .title-container {
    position: relative;
    height: var(--height);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  /* force the source element to be full height*/
  picture, source {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }
  
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--color-overlay);
    opacity: var(--overlay-opacity);
    top:0;
    left: 0;
  }
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    overflow: hidden;
  }
  .bg-image {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
  .bg-image.mobile {
    scale: 1.5;
  }
  .sectionTitle {
    position: relative;
    z-index: 2;
    color: var(--color-overlay-text);
    padding: 0 20px;
    text-align: center;
    max-width: 960px;
  }
</style>