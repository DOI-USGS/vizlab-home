<template>
  <div id="app">
    <HeaderUSGS />
    <RouterView />
    <FooterUSGS />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderUSGS from './components/HeaderUSGS.vue';
import FooterUSGS from './components/FooterUSGS.vue'
</script>

<style scoped>
</style>
