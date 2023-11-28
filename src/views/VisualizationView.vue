<template>
  <section>
    <h1 class="section-header">svg import w/ d3-added interaction + v-for</h1>
    <RegionalViolins />
  </section>
</template>

<script setup>
import RegionalViolins from '.././components/RegionalViolins.vue';
</script>

<style scoped>
.section-header {
  color: var(--dodger-blue);
}
</style>