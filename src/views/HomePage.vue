<template>
  <div class="layout">
    <HeroBanner class="sidebar" />

    <main>
      <SeriesSection
        id="series"
        :title="sectionsMeta.series.title"
        :summary="sectionsMeta.series.summary"
        :series="series"
      />
      <CardGridSection
        id="stories"
        :items="websites"
        :title="sectionsMeta.stories.title"
        :summary="sectionsMeta.stories.summary"
        :preview-rows="2"
        expandable
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
      <CardGridSection
        id="blogs"
        :title="sectionsMeta.blogs.title"
        :summary="sectionsMeta.blogs.summary"
        :items="blogs"
        :preview-rows="2"
        show-date
        expandable
      >
        <template #summary>
          <p class="section-summary">
            <span v-if="sectionsMeta.blogs.summary">{{ sectionsMeta.blogs.summary }}</span>
            <span class="section-summary__link">
              {{ sectionsMeta.blogs.link.intro }}
              <a
                :href="sectionsMeta.blogs.link.href"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ sectionsMeta.blogs.link.label }}
              </a>
            </span>
          </p>
        </template>
      </CardGridSection>
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
import CardGridSection from "@/components/CardGridSection.vue"
import HeroBanner from "@/components/HeroBanner.vue"
import SeriesSection from "@/components/SeriesSection.vue"

// lazy load of later sections
const FilteredCardSection = defineAsyncComponent(() => import("@/components/FilteredCardSection.vue"))
const AboutSection = defineAsyncComponent(() => import("@/components/AboutSection.vue"))

import { useDateStore } from "@/stores/DateStore.js"

// read in portofolio items for each section
import storiesData from "@/assets/content/stories.json"
import seriesData from "@/assets/content/series.json"
import sketchesData from "@/assets/content/sketches.json"
import snapshotsData from "@/assets/content/snapshots.json"
import blogsData from "@/assets/content/blogs.json"
import teamData from "@/assets/content/team.json"
import sections from "@/assets/content/sections.json"

const dateStore = useDateStore();
const sectionsMeta = sections

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
const websites = storiesData.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const sortedSketches = sketchesData.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const sortedSnapshots = (snapshotsData.items || []).sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const blogs = blogsData.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const series = seriesData.items // not sorted here, b/c content for each card sorted in `SeriesCard.vue`

const sketches = shufflePreview(sortedSketches)
const snapshots = shufflePreview(sortedSnapshots)
const team = teamData
</script>

<style scoped>
.layout {
  display: grid;
  align-items: start;
  gap: clamp(1.4rem, 4vw, 2.4rem);
  padding: 0 0 clamp(1.6rem, 5vw, 2.4rem);
}

.sidebar,
main {
  min-width: 0;
  width: 100%;
}

:deep(.content-section) {
  width: 100%;
  margin-inline: 0;
  padding-inline: 0;
}

main {
  padding-inline: var(--page-gutter);
}

@media (min-width: 961px) {
  main {
    padding-inline: clamp(4rem, 8vw, 9rem);
  }

  :deep(.content-section) {
    max-width: min(1120px, 100%);
    margin-inline: auto;
  }
}
</style>
