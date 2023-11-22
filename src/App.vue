<template>
  <div>
    <HeaderUSGS />
    <WorkInProgressWarning v-if="envType === '-beta build-'" />
    <RouterView />
    <FooterUSGS />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import HeaderUSGS from './components/HeaderUSGS.vue';
import WorkInProgressWarning from "./components/WorkInProgressWarning.vue";
import FooterUSGS from './components/FooterUSGS.vue';
const envType = import.meta.env.VITE_APP_TIER;
</script>

<style scoped>
</style>
