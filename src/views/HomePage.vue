<template>
  <section id="visualization-container">
    <div class="visualization-layout">
      <HeroSidebar class="visualization-layout__sidebar" />

      <main class="content visualization-layout__content">
        <SeriesSection
          id="series"
          :series="series"
        />
        <VizSection
          id="stories"
          :items="websites"
        />
        <SketchesSection
          id="sketches"
          :items="sketches"
        />
        <SnapshotSection
          id="snapshots"
          :items="snapshots"
        />
        <BlogSection
          id="blogs"
          :items="blogs"
        />
        <AboutSection
          id="team"
          :text="team"
        />
      </main>
    </div>
  </section>
</template>

<script setup>
import { defineAsyncComponent } from "vue"

// load sections at top of the page first
import HeroSidebar from "@/components/HeroSidebar.vue"
import SeriesSection from "@/components/SeriesSection.vue"

// lazy load of later sections
const VizSection = defineAsyncComponent(() => import("@/components/VizSection.vue"))
const SketchesSection = defineAsyncComponent(() => import("@/components/SketchesSection.vue"))
const SnapshotSection = defineAsyncComponent(() => import("@/components/SnapshotSection.vue"))
const BlogSection = defineAsyncComponent(() => import("@/components/BlogSection.vue"))
const AboutSection = defineAsyncComponent(() => import("@/components/AboutSection.vue"))

import { useDateStore } from "@/stores/DateStore.js"
import viz from "@/assets/content/viz-list.json"
import seriesData from "@/assets/content/series-list.json"
import sketchesData from "@/assets/content/sketches.json"
import snapshotsData from "@/assets/content/snapshots.json"
import blogsData from "@/assets/content/blogs.json"
import teamData from "@/assets/content/team.json"

const dateStore = useDateStore();

// define content for site sections and sort by release date, where appropriate
const websites = viz.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const sketches = sketchesData.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const blogs = blogsData.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const series = seriesData.collections // not sorted here, b/c content for each card sorted in `SeriesCard.vue`
const snapshots = (snapshotsData.items || []).sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const team = teamData
</script>

<style scoped>
.visualization-layout {
  display: grid;
  grid-template-columns: minmax(240px, 28%) minmax(0, 1fr);
  gap: clamp(2rem, 4vw, 4rem);
  padding: 0 clamp(1.5rem, 4vw, 3rem);
}

.visualization-layout__sidebar {
  min-width: 260px;
}

.visualization-layout__content {
  padding-top: clamp(1rem, 2vw, 2rem);
}

@media (max-width: 960px) {
  .visualization-layout {
    grid-template-columns: 1fr;
    padding: 0;
  }

  .visualization-layout__sidebar {
    min-width: 0;
    padding: clamp(1.6rem, 6vw, 2.4rem);
  }

  .visualization-layout__content {
    padding: clamp(1.2rem, 5vw, 1.8rem) 0 0;
  }

  .visualization-layout__content > :first-child {
    margin-top: clamp(1rem, 3vw, 1.8rem);
  }
}
</style>
