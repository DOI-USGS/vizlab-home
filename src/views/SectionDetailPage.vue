<template>
  <section class="section-detail content-section">
      <RouterLink
        class="pill-button pill-button--outline section-detail__back"
        :to="{ name: 'VisualizationContent' }"
      >
        ← Back to portfolio
    </RouterLink>
    <component
      v-if="currentSection"
      :is="currentSection.component"
      v-bind="currentSection.props"
    />
  </section>
</template>

<script setup>
import { computed } from "vue"
import { RouterLink, useRoute } from "vue-router"
import FilteredCardSection from "@/components/FilteredCardSection.vue"
import CarouselCardSection from "@/components/CarouselCardSection.vue"
import SeriesSection from "@/components/SeriesSection.vue"
import { useDateStore } from "@/stores/DateStore.js"

import viz from "@/assets/content/viz-list.json"
import seriesData from "@/assets/content/series-list.json"
import sketchesData from "@/assets/content/sketches.json"
import snapshotsData from "@/assets/content/snapshots.json"
import blogsData from "@/assets/content/blogs.json"

import sectionMetadata from "@/assets/content/section-metadata.json"

const route = useRoute()
const dateStore = useDateStore()

const sortByRelease = (items = []) =>
  [...items].sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))

const builders = {
  sketches: () => buildFiltered(sectionMetadata.sketches, sortByRelease(sketchesData.items), "illustration"),
  snapshots: () => buildFiltered(sectionMetadata.snapshots, sortByRelease(snapshotsData.items), "chart"),
  stories: () =>
    buildCarousel(sectionMetadata.stories, sortByRelease(viz.items), {
      sectionId: "stories",
      windowSize: 12,
      showReleaseDate: true
    }),
  series: () => buildSeries(sectionMetadata.series, seriesData.collections),
  blogs: () =>
    buildCarousel(sectionMetadata.blogs, sortByRelease(blogsData.items), {
      sectionId: "blogs",
      windowSize: 12,
      showReleaseDate: true
    })
}

const currentSection = computed(() => {
  const build = builders[route.params.sectionId]
  return build ? build() : null
})

function buildFiltered(meta, items, assetSource) {
  if (!meta) return null
  return {
    component: FilteredCardSection,
    props: {
      id: meta.id,
      title: meta.title,
      summary: meta.summary,
      items,
      assetSource,
      showDetailLink: false,
      linkTitle: false
    }
  }
}

function buildCarousel(meta, items, extraProps = {}) {
  if (!meta) return null
  return {
    component: CarouselCardSection,
    props: {
      sectionId: meta.id,
      title: meta.title,
      summary: meta.summary,
      items,
      ...extraProps
    }
  }
}

function buildSeries(meta, series) {
  if (!meta) return null
  return {
    component: SeriesSection,
    props: {
      id: meta.id,
      title: meta.title,
      summary: meta.summary,
      series,
      initialSeriesId: "riverConditions"
    }
  }
}
</script>

<style scoped>
.section-detail {
  min-height: 100vh;
  padding-top: clamp(2rem, 5vw, 4rem);
  padding-bottom: clamp(3rem, 6vw, 5rem);
}

.section-detail__back {
  align-self: flex-start;
}
</style>
