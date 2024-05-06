<template>
  <section id="visualization-container">
    <div class="text-container">
      <h1 class = 'title'>
        Vue3 template
      </h1>
    </div>
    <IntroSection/>
    <SectionTitle
      id="section1"
      image="section1_banner"
      suffix="png"
      alt="An overhead view of a braided river, surrounded by snow-covered ground."
      :height=50
      :overlay=true
      :overlayOpacity=0.7
    >
      <template #sectionTitle>
        <h1>
          Section 1
        </h1>
      </template>
    </SectionTitle>
    <RegionalViolins />
    <SectionTitle
      id="section2"
      image="section2_banner"
      suffix="jpg"
      alt="An overhead view of a river flowing through a snow-covered decidious forest."
      :height=50
      :overlay=true
      :overlayOpacity=0.7
    >
      <template #sectionTitle>
        <h1>
          Section 2
        </h1>
      </template>
    </SectionTitle>
    <BarChartExample />
    <ReferencesSection />
    <AuthorshipSection />
  </section>
</template>

<script setup>
  import IntroSection from '@/components/IntroSection.vue'
  import SectionTitle from '@/components/SectionTitle.vue';
  import ReferencesSection from '@/components/ReferencesSection.vue';
  import AuthorshipSection from '@/components/AuthorshipSection.vue';
  import RegionalViolins from '.././components/RegionalViolins.vue';
  import BarChartExample from '.././components/BarChartExample.vue';
</script>

<style scoped>
</style>