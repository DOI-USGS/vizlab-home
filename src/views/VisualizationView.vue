<template>
  <section>
    <h1 class="section-header">svg import w/ d3-added interaction + v-for</h1>
    <RegionalViolins />
    <h1 class="section-header">d3 bar chart from data</h1>
    <BarChartExample />
  </section>
</template>

<script setup>
  import RegionalViolins from '.././components/RegionalViolins.vue';
  import BarChartExample from '.././components/BarChartExample.vue';
</script>

<style scoped>
.section-header {
  color: var(--dodger-blue);
}
</style>