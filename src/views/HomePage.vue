<template>
  <div class="layout">
    <HeroSidebar class="sidebar" />

    <main>
      <SeriesSection
        id="series"
        :title="sectionsMeta.series.title"
        :summary="sectionsMeta.series.summary"
        :series="series"
      />
      <VizSection
        id="stories"
        :items="websites"
        :title="sectionsMeta.stories.title"
        :summary="sectionsMeta.stories.summary"
      />
      <FilteredCardSection
        id="sketches"
        :title="sectionsMeta.sketches.title"
        :summary="sectionsMeta.sketches.summary"
        asset-source="illustration"
        :items="sketches"
      />
      <FilteredCardSection
        id="snapshots"
        :title="sectionsMeta.snapshots.title"
        :summary="sectionsMeta.snapshots.summary"
        asset-source="chart"
        :items="snapshots"
      />
      <BlogSection
        id="blogs"
        :title="sectionsMeta.blogs.title"
        :summary="sectionsMeta.blogs.summary"
        :items="blogs"
      />
      <AboutSection
        id="team"
        :text="team"
      />
    </main>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from "vue"

// load sections at top of the page first
import HeroSidebar from "@/components/HeroSidebar.vue"
import SeriesSection from "@/components/SeriesSection.vue"
import VizSection from "@/components/VizSection.vue"

// lazy load of later sections
const FilteredCardSection = defineAsyncComponent(() => import("@/components/FilteredCardSection.vue"))
const BlogSection = defineAsyncComponent(() => import("@/components/BlogSection.vue"))
const AboutSection = defineAsyncComponent(() => import("@/components/AboutSection.vue"))

import { useDateStore } from "@/stores/DateStore.js"

// read in portofolio items for each section
import viz from "@/assets/content/viz-list.json"
import seriesData from "@/assets/content/series-list.json"
import sketchesData from "@/assets/content/sketches.json"
import snapshotsData from "@/assets/content/snapshots.json"
import blogsData from "@/assets/content/blogs.json"
import teamData from "@/assets/content/team.json"
import sectionMetadata from "@/assets/content/section-metadata.json"

const dateStore = useDateStore();
const sectionsMeta = sectionMetadata

const PREVIEW_MAX = 18
const shufflePreview = (items = [], limit = PREVIEW_MAX) => {
  const clone = [...items]
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[clone[i], clone[j]] = [clone[j], clone[i]]
  }
  return limit > 0 ? clone.slice(0, limit) : clone
}

// define content for site sections and sort by release date, where appropriate
const websites = viz.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const sortedSketches = sketchesData.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const sortedSnapshots = (snapshotsData.items || []).sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const blogs = blogsData.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const series = seriesData.collections // not sorted here, b/c content for each card sorted in `SeriesCard.vue`

const sketches = shufflePreview(sortedSketches)
const snapshots = shufflePreview(sortedSnapshots)
const team = teamData
</script>

<style scoped>
.layout {
  display: grid;
  gap: clamp(1.4rem, 4vw, 2.4rem);
  padding: 0 var(--page-gutter) clamp(1.6rem, 5vw, 2.4rem);
}

.sidebar,
main {
  min-width: 0;
}

:deep(.content-section) {
  width: 100%;
  margin: 0;
  padding-inline: 0;
}

@media (min-width: 961px) {
  .layout {
    grid-template-columns: minmax(260px, 28%) minmax(0, 1fr);
    gap: clamp(2rem, 4vw, 4rem);
    padding-bottom: clamp(2rem, 5vw, 4rem);
  }

  main {
    padding-top: 0;
  }
}
</style>
