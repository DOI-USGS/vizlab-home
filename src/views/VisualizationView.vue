<template>
  <section id="visualization-container">
    <div
      class="text-container"
      :class="{ mobile: mobileView}"
    >
      <h1 class="title">
        {{ text.pageTitle }}
      </h1>
    </div>
  </section>
</template>

<script setup>
  import { isMobile } from 'mobile-device-detect';

  import viz from "@/assets/content/viz-list.json";

  // global variables
  const mobileView = isMobile;
  const sectionTitleHeight = mobileView ? 25 : 50;
  const sectionTitleOverlayOpacity = 0.7;
</script>

<style scoped>
</style>