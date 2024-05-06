<template>
  <section id="visualization-container">
    <IntroSection/>
    <RegionalViolins />
    <BarChartExample />
    <ReferencesSection />
    <AuthorshipSection />
  </section>
</template>

<script setup>
  import IntroSection from '@/components/IntroSection.vue'
  import ReferencesSection from '@/components/ReferencesSection.vue';
  import AuthorshipSection from '@/components/AuthorshipSection.vue';
  import RegionalViolins from '.././components/RegionalViolins.vue';
  import BarChartExample from '.././components/BarChartExample.vue';
</script>

<style scoped>
</style>