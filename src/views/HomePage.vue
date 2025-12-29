<template>
  <section id="visualization-container">
    <!-- header -->
    <StickyNav />

    <!-- main -->
    <main class="content">
      <!-- interactive websites -->
      <VizSection :items="websites" />
      <SeriesSection :series="series" />
    </main>
  </section>
</template>

<script setup>
import { computed } from "vue"
import StickyNav from "@/components/StickyNav.vue"
import VizSection from "@/components/VizSection.vue"
import SeriesSection from "@/components/SeriesSection.vue"

import viz from "@/assets/content/viz-list.json"
import snapshots from "@/assets/content/series-list.json"

const websites = computed(() => viz?.websites || [])

const S3_BASE = (import.meta.env.VITE_APP_S3_PROD_URL || "").replace(/\/+$/, "")

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
]

const formatFolderDate = (folder = "") => {
  const clean = folder.replace("/", "")
  const [year, month] = clean.split("_")
  if (!year || !month) return folder
  const monthIndex = Number(month) - 1
  const monthName = months[monthIndex] || month
  return `${monthName} ${year}`
}


const buildFlowTileEntry = (entry) => {
  const title = formatFolderDate(entry?.folder || "")
  const release = formatFolderDate(entry.folder || "")

  return {
    id: entry.image_basename || entry.folder,
    title,
    released: release,
    thumb: `${entry.folder || ""}${entry.image_basename}`,
    alt: entry.image_alt || title,
    productUrl: entry.twitter_url || "",
    codeUrl: ""
  }
}

const buildRiverConditionsEntry = (entry) => {
  return {
    id: entry.video_basename || entry.folder,
    released: entry.name,
    thumb: `${entry.folder || ""}${entry.image_thumbnail || ""}`,
    alt: entry.image_alt || entry.name,
    productUrl: entry.drupal_url || "",
    codeUrl: ""
  }
}

const buildGroundwaterEntry = (entry) => {
  const title = entry.title || "U.S. Groundwater Conditions"
  return {
    id: entry.id || "groundwater",
    title,
    released: entry.lastUpdated || "",
    thumb: entry.thumb || "",
    alt: entry.alt || title,
    productUrl: entry.productUrl || "",
    codeUrl: entry.codeUrl || ""
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
    thumb: entry.thumb || "",
    alt: entry.alt || title,
    productUrl: entry.productUrl || "",
    codeUrl: entry.codeUrl || ""
  }
}

const seriesConfigs = [
  {
    key: "flowTiles",
    mapEntry: buildFlowTileEntry,
    thumbBaseOverride: S3_BASE ? `${S3_BASE}/flow` : ""
  },
  {
    key: "riverConditions",
    mapEntry: buildRiverConditionsEntry,
    thumbBaseOverride: S3_BASE ? `${S3_BASE}/river-conditions` : ""
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
      const intervals = (info.interval || "")
        .split(",")
        .map((token) => token.trim())
        .filter(Boolean)
      return {
        id: config.key,
        title: info.title,
        description: info.description || "",
        intervals,
        entries,
        thumbBase: config.thumbBaseOverride || ""
      }
    })
    .filter(Boolean)
})
</script>
