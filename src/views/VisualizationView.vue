<template>
  <section id="visualization-container">
    <div class="text-container" :class="{ mobile: mobileView}">
      <h1 class = 'title'>
        Vue3 template
      </h1>
    </div>
    <IntroSection/>
    <SectionTitle
      id="sectionA"
      image="sectionA_banner"
      suffix="png"
      alt="An overhead view of a braided river, surrounded by snow-covered ground."
      :height=sectionTitleHeight
      :overlay=true
      :overlayOpacity=0.7
    >
      <template #sectionTitle>
        <h1>
          Section A
        </h1>
      </template>
    </SectionTitle>
    <RegionalViolins />
    <SectionTitle
      id="sectionB"
      image="sectionB_banner"
      suffix="jpg"
      alt="An overhead view of a river flowing through a snow-covered decidious forest."
      :height=sectionTitleHeight
      :overlay=true
      :overlayOpacity=0.7
    >
      <template #sectionTitle>
        <h1>
          Section B
        </h1>
      </template>
    </SectionTitle>
    <BarChartExample />
    <ReferencesSection />
    <AuthorshipSection />
  </section>
</template>

<script setup>
  import { isMobile } from 'mobile-device-detect';

  import IntroSection from '@/components/IntroSection.vue'
  import SectionTitle from '@/components/SectionTitle.vue';
  import ReferencesSection from '@/components/ReferencesSection.vue';
  import AuthorshipSection from '@/components/AuthorshipSection.vue';
  import RegionalViolins from '.././components/RegionalViolins.vue';
  import BarChartExample from '.././components/BarChartExample.vue';

  // global variables
  const mobileView = isMobile;
  const sectionTitleHeight = mobileView ? 25 : 50;
</script>

<style scoped>
</style>