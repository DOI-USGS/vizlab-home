<template>
  <div class="section-title-container">
    <div
      class="title-container"
      :height="height"
      :style="sectionVars"
    >
      <div class="sectionTitle title">
        <slot name="sectionTitle">
          Section Title
        </slot>
      </div>
      <div
        class="bg"
        :style="overlayVars"
      >
        <picture>
          <!-- Media size suggestions https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images -->
          <source
            type="image/webp"
            media="(max-width: 799px)"
            :srcset="getImageUrl(image, 'webp')"
            :data-srcset="getImageUrl(image, 'webp')"
          >
          <!--BACKUP IF BROWSER DOESN'T ACCEPT WEBP (TESTED AND WORKING ON SAFARI)-->
          <source
            media="(max-width: 799px)"
            :type="imageType"
            :data-srcset="getImageUrl(image, suffix)"
          >
          <img 
            :srcset="getImageUrl(image, suffix)"
            :alt="alt"
          >
        </picture>
        <div
          v-if="overlay"
          class="overlay"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
  import {computed} from 'vue'

  const props = defineProps({
    height: {
      type: Number,
      default: 100
    },
    image: {
      type: String,
      default: `section1`
    },
    suffix: {
      type: String,
      default: `png`
    },
    alt: {
      type: String,
      default: ''
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

  const imageType = computed(() => {
    let imageType;
    switch(props.suffix) {
        case 'png':
          imageType = 'image/png';
          break;
        case 'jpg':
          imageType = 'image/jpeg';
          break;
        case 'gif':
          imageType = 'image/gif';
          break;
        case 'svg':
          imageType = 'image/svg';
          break;
        case 'webp':
          imageType = 'image/webp';
          break;
        default:
          imageType = 'image/png';
      }
    return imageType;
  })

  function getImageUrl(image, suffix) {
    return new URL(`../assets/images/${image}.${suffix}`, import.meta.url).href
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
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
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