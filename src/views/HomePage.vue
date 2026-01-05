<template>
  <section id="visualization-container">
    <!-- header -->
    <HeaderSplash />
    <StickyNav />

    <!-- main -->
    <main class="content">
      <!-- interactive websites -->
      <VizSection :items="websites" id="stories" />
      <SeriesSection :series="series" id="series" />
      <SketchesSection :items="sketches" id="sketches" />
      <BlogSection :items="blogs" id="blogs" />
      <AboutSection :items="team" id="team" />
    </main>
  </section>
</template>

<script setup>
import { computed } from "vue"
import HeaderSplash from "@/components/HeaderSplash.vue"
import StickyNav from "@/components/StickyNav.vue"
import VizSection from "@/components/VizSection.vue"
import SeriesSection from "@/components/SeriesSection.vue"
import SketchesSection from "@/components/SketchesSection.vue"
import BlogSection from "@/components/BlogSection.vue"
import AboutSection from "@/components/AboutSection.vue"
import { useAssetPathStore } from "@/stores/AssetPathStore.js"

import viz from "@/assets/content/viz-list.json"
import snapshots from "@/assets/content/series-list.json"
import sketchesData from "@/assets/content/sketches.json"
import blogsData from "@/assets/content/blogs.json"

const websites = computed(() => viz?.websites || [])
const sketches = computed(() => sketchesData?.sketches || [])
const blogs = computed(() => blogsData?.blogListItems || [])

const assetPaths = useAssetPathStore()


// some wrangling to get the series data into a more consistent format for the cards
// TODO: standardize series
const releaseFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric"
})

const formatFolderDate = (folder = "") => {
  const clean = folder.replace("/", "")
  const [year, month] = clean.split("_")
  if (!year || !month) return folder
  const date = new Date(Number(year), Number(month) - 1, 1)
  return Number.isNaN(date.getTime()) ? folder : releaseFormatter.format(date)
}

const buildFlowTileEntry = (entry) => {
  const release = formatFolderDate(entry.folder)
  const thumbPath = `${entry.folder}${entry.image_basename}`
  const productUrl = assetPaths.buildSeriesUrl("flow", thumbPath) 

  return {
    id: entry.image_basename,
    release,
    released: release,
    thumb: thumbPath,
    alt: entry.image_alt,
    productUrl,
    shareUrl: entry.twitter_url,
    codeUrl: ""
  }
}

const buildRiverConditionsEntry = (entry) => {
  return {
    id: entry.video_basename || entry.folder,
    released: entry.name,
    thumb: `${entry.folder}${entry.image_thumbnail}`,
    alt: entry.image_alt || entry.name,
    productUrl: entry.drupal_url,
    codeUrl: ""
  }
}

const buildGroundwaterEntry = (entry) => {
  const title = entry.title || "U.S. Groundwater Conditions"
  return {
    id: entry.id || "groundwater",
    title,
    released: entry.lastUpdated,
    thumb: entry.thumb,
    alt: entry.alt || title,
    productUrl: entry.productUrl,
    codeUrl: entry.codeUrl
  }
}

const buildHurricaneEntry = (entry) => {
  if (!entry) return null
  const title = entry.title || "Hurricane footprint"
  const releaseYear = new Date(entry.released).getFullYear();
  return {
    id: entry.id,
    title,
    released: `${ entry.title }, ${ releaseYear }`,
    thumb: entry.thumb,
    alt: entry.alt || title,
    productUrl: entry.productUrl,
    codeUrl: entry.codeUrl
  }
}

const seriesConfigs = [
  {
    key: "flowTiles",
    mapEntry: buildFlowTileEntry,
    thumbBaseOverride: assetPaths.s3Base ? `${assetPaths.s3Base}/flow` : ""
  },
  {
    key: "riverConditions",
    mapEntry: buildRiverConditionsEntry,
    thumbBaseOverride: assetPaths.s3Base ? `${assetPaths.s3Base}/river-conditions` : ""
  },
  {
    key: "gwConditions",
    mapEntry: buildGroundwaterEntry
  },
  {
    key: "hurricaneFootprint",
    mapEntry: buildHurricaneEntry
  }
]

const series = computed(() => {
  const grouped = snapshots?.series || {}
  const meta = grouped?.meta || {}

  return seriesConfigs
    .map((config) => {
      const rawEntries = grouped?.[config.key]
      if (!Array.isArray(rawEntries) || !rawEntries.length) {
        return null
      }
      const entries = rawEntries
        .map((entry) => config.mapEntry(entry))
        .filter(Boolean)
      if (!entries.length) return null
      const info = meta?.[config.key] || {}
      const intervals = (info.interval)
        .split(",")
        .map((token) => token.trim())
        .filter(Boolean)
      return {
        id: config.key,
        title: info.title,
        description: info.description,
        intervals,
        entries,
        thumbBase: config.thumbBaseOverride
      }
    })
    .filter(Boolean)
})
</script>
