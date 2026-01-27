<template>
  <section id="visualization-container">
    <!-- header -->
    <!--     <HeaderSplash /> -->
    <StickyNav />

    <!-- main -->
    <main class="content">
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
  </section>
</template>

<script setup>
/* import HeaderSplash from "@/components/HeaderSplash.vue" */
import StickyNav from "@/components/StickyNav.vue"
import VizSection from "@/components/VizSection.vue"
import SeriesSection from "@/components/SeriesSection.vue"
import SketchesSection from "@/components/SketchesSection.vue"
import SnapshotSection from "@/components/SnapshotSection.vue"
import BlogSection from "@/components/BlogSection.vue"
import AboutSection from "@/components/AboutSection.vue"

import { useAssetPathStore } from "@/stores/AssetPathStore.js"
import { useDateStore } from "@/stores/DateStore.js"
import viz from "@/assets/content/viz-list.json"
import seriesData from "@/assets/content/series-list.json"
import sketchesData from "@/assets/content/sketches.json"
import snapshotsData from "@/assets/content/snapshots.json"
import blogsData from "@/assets/content/blogs.json"
import teamData from "@/assets/content/team.json"

const assetStore = useAssetPathStore();
const dateStore = useDateStore();

const buildSnapshotItems = (items = []) => {
  return items.map((item) => {
    const assetFilename = item?.links?.asset
    const chartAsset = assetFilename ? assetStore.buildChartUrl(assetFilename) : ""
    return {
      ...item,
      links: {
        ...item.links,
        asset: chartAsset
      }
    }
  })
}

// define content for site sections and sort by release date, where appropriate
const websites = viz.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const sketches = sketchesData.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const blogs = blogsData.items.sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const series = seriesData.collections // not sorted here, b/c content for each card sorted in `SeriesCard.vue`
const snapshots = buildSnapshotItems(snapshotsData.items || []).sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))
const team = teamData
</script>
