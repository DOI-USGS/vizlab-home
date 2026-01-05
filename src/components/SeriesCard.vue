<template>
  <article class="series-card">
    <header class="series-card__header">
      <div class="series-card__eyebrow-row">
        <p class="series-card__eyebrow">
          {{ series?.title }}
        </p>
        <div
          v-if="series?.intervals?.length"
          class="series-card__badges"
        >
          <span
            v-for="interval in series.intervals"
            :key="interval"
            class="series-card__badge"
          >
            {{ interval }}
          </span>
        </div>
      </div>
    </header>

    <a
      class="series-card__image"
      :href="latestPrimaryLink"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        :src="latestThumb"
        :alt="latestAlt"
        loading="lazy"
      >
    </a>

    <div class="series-card__body">
      <p v-if="latestReleaseLabel" class="series-card__meta">
        {{ latestReleaseLabel }}
      </p>
      <p v-if="series?.description" class="series-card__description">
        {{ series.description }}
      </p>
      <div class="series-card__actions">
        <a
          class="series-link"
          :href="latestPrimaryLink"
          target="_blank"
          rel="noopener noreferrer"
        >View latest release</a>

        <button
          v-for="share in shareLinks"
          :key="share.label"
          class="series-link"
          type="button"
          @click="() => openShare(share.url)"
          :aria-label="`Share on ${share.label}`"
        >
          Share on {{ share.label }}
        </button>
        <a
          v-if="latestCodeLink"
          class="series-link ghost"
          :href="latestCodeLink"
          target="_blank"
          rel="noopener noreferrer"
        >View code</a>
      </div>
    </div>

    <footer v-if="hasHistory" class="series-card__footer">
      <button
        class="history-toggle"
        type="button"
        @click="expanded = !expanded"
        :aria-expanded="expanded.toString()"
      >
        <span>Past versions</span>
        <span aria-hidden="true">{{ expanded ? "−" : "+" }}</span>
      </button>

      <transition name="history-collapse">
        <div v-if="expanded" class="history-list">
          <a
            v-for="entry in historyEntries"
            :key="entry.id"
            class="history-link"
            :href="entry.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ entry.displayLabel }}
          </a>
        </div>
      </transition>
    </footer>
  </article>
</template>

<script setup>
import { ref } from "vue"
import { useAssetPathStore } from "@/stores/AssetPathStore.js"

const props = defineProps({
  series: {
    type: Object,
    required: true
  }
})

const assetStore = useAssetPathStore()

// directory that contains each edition ( flowtiles and river conditions)
const seriesBucket = props.series.bucket

const toTimestamp = (value = '') => {
  const date = new Date(value)
  return date instanceof Date && !Number.isNaN(date) ? date.getTime() : 0
}

// sort items by release dates
const items = props.series.items
  .filter((entry) => !entry.archive)
  .sort((a, b) => toTimestamp(b.released) - toTimestamp(a.released))

const latestEntry = items[0] 
const expanded = ref(false)

// test for complete url
const isAbsolute = (value = "") => /^https?:\/\//i.test(value)

const buildDisplayLabel = (entry) =>
  entry?.title || entry.released 

const buildXShareUrl = (value) => {
  if (!value) return ""
  const id = typeof value === "object" ? value.id || "" : value
  if (!id) return ""
  return `https://twitter.com/intent/retweet?tweet_id=${encodeURIComponent(id)}`
}

const buildInstagramShareUrl = (value) => {
  return typeof value === "string" ? value : ""
}

const buildFacebookShareUrl = (value) => {
  if (!value) return ""
  const url = typeof value === "object" ? value.url : value
  if (!url) return ""
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
}

// build links to share out on social media plaftorms
const shareLinks = [
  {
    label: "X",
    url: buildXShareUrl(latestEntry.links?.x)
  },
  {
    label: "Instagram",
    url: buildInstagramShareUrl(latestEntry.links?.instagram)
  },
  {
    label: "Facebook",
    url: buildFacebookShareUrl(latestEntry.links?.facebook)
  }
].filter((entry) => entry.url)

function openShare(url) {
  if (!url) return
  window.open(url, "_blank", "noopener,noreferrer")
}

// assume is in thumbnails in s3 unless a full url is provided
const resolveThumbnail = (src = "") => {
  if (!src) return ""
  if (isAbsolute(src)) return src
  const bucket = seriesBucket
  if (bucket) {
    return assetStore.buildSeriesUrl(bucket, src)
  }
  return assetStore.buildThumbUrl(src)
}

const latestThumb = resolveThumbnail(latestEntry.image?.thumbnail || "")
const latestAlt = latestEntry.image?.alt || buildDisplayLabel(latestEntry, props.series?.title || "")
const latestReleaseLabel = buildDisplayLabel(latestEntry, "")

const resolvePrimaryLink = (entry) => {
  const raw = entry?.links?.external
  if (!raw) return ""
  return isAbsolute(raw)
    ? raw
    : assetStore.buildSeriesUrl(seriesBucket || "", raw)
}

// links are provided add them, otherwise don't
const latestPrimaryLink = resolvePrimaryLink(latestEntry) || "#"
const latestCodeLink = latestEntry.links?.code || ""

const historyEntries = items
  .slice(1)
  .map((entry) => ({
    id: entry.id,
    displayLabel: buildDisplayLabel(entry, entry.id),
    href: resolvePrimaryLink(entry)
  }))
  .filter((entry) => entry.displayLabel)
const hasHistory = historyEntries.length > 0
</script>

<style scoped>
.series-card {
  flex: 1;
  border: 1px solid var(--light-grey);
  border-radius: 1.2rem;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
}

.series-card__header {
  padding: 1.5rem 1.5rem 0;
}

.series-card__eyebrow-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.series-card__eyebrow {
  flex: 1 1 auto;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 1.7rem;
  color: var(--black-soft);
  margin: 0;
  line-height: 1;
}

.series-card__badges {
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.series-card__badge {
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  border: 1px solid currentColor;
  border-radius: 999px;
  padding: 0.1rem 0.8rem;
  line-height: 1;
}

.series-card__title {
  font-size: 2.4rem;
  margin: 0;
}

.series-card__image {
  display: block;
  position: relative;
  padding-top: 56%;
  overflow: hidden;
}

.series-card__image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.series-card__body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.series-card__meta {
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--black-soft);
  margin: 0;
}

.series-card__description {
  margin: 0;
  font-size: 1.8rem;
}

.series-card__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.series-link {
  border: 1px solid currentColor;
  background: transparent;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 1.3rem;
  padding: 0.4rem 1.2rem;
  cursor: pointer;
  color: inherit;
  border-radius: 999px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.1s ease;
  text-decoration: none;
}

.series-link:hover,
.series-link:focus-visible {
  color: #fff;
  background: var(--color-link);
  border-color: var(--color-link);
}

.series-link:active {
  transform: translateY(1px);
}

.series-card__footer {
  padding: 1.5rem;
  border-top: 1px solid var(--light-grey);
}

.history-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 0.4rem 0;
  font-size: 1.4rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
}

.history-list {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin-top: 0.8rem;
}

.history-link {
  border: 1px solid var(--light-grey);
  border-radius: 999px;
  padding: 0.3rem 0.8rem;
  font-size: 1.2rem;
  text-decoration: none;
  color: inherit;
}

.x-share {
  cursor: pointer;
}

.history-collapse-enter-active,
.history-collapse-leave-active {
  transition: all 200ms ease;
}

.history-collapse-enter-from,
.history-collapse-leave-to {
  opacity: 0;
  transform: translateY(-0.4rem);
}

.x-icon {
  width: 1.6rem;
  height: 1.6rem;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

@media (max-width: 700px) {
  .series-card {
    width: 100%;
  }

  /* move interval badges to second lin on mobile */
  .series-card__eyebrow-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
    margin: 0px 0px 15px;
  }

  .series-card__badges {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
