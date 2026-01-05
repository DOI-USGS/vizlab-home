<template>
  <section id="visualization-container">
    <!-- header -->
    <HeaderSplash />
    <StickyNav />

    <!-- main -->
    <main class="content">
      <SeriesSection :series="series" id="series" />
      <VizSection :items="websites" id="stories" />
      <SketchesSection :items="sketches" id="sketches" />
      <BlogSection :items="blogs" id="blogs" />
      <AboutSection :items="team" id="team" />
    </main>
  </section>
</template>

<script setup>
import HeaderSplash from "@/components/HeaderSplash.vue"
import StickyNav from "@/components/StickyNav.vue"
import VizSection from "@/components/VizSection.vue"
import SeriesSection from "@/components/SeriesSection.vue"
import SketchesSection from "@/components/SketchesSection.vue"
import BlogSection from "@/components/BlogSection.vue"
import AboutSection from "@/components/AboutSection.vue"

import viz from "@/assets/content/viz-list.json"
import snapshots from "@/assets/content/series-list.json"
import sketchesData from "@/assets/content/sketches.json"
import blogsData from "@/assets/content/blogs.json"

const websites = viz.items 
const sketches = sketchesData.items 
const blogs = blogsData.items 
const series = snapshots.collections 
</script>
