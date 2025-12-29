<template>
  <section id="visualization-container">
    <!-- header -->
    <StickyNav />

    <!-- main -->
    <main class="content">
      <!-- interactive websites -->
      <VizSection :items="websites" />
    </main>
  </section>
</template>

<script setup>
import { computed } from "vue"
import StickyNav from "@/components/StickyNav.vue"
import VizSection from "@/components/VizSection.vue"

import viz from "@/assets/content/viz-list.json"

const websites = computed(() => viz?.websites || [])
</script>
