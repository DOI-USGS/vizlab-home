<template>
  <article class="series-card card-shell">
    <header class="header">
      <div class="row">
        <p class="card-heading eyebrow">
          {{ series.title }}
        </p>
        <div
          v-if="series.intervals.length"
          class="badges"
        >
          <span
            v-for="interval in series.intervals"
            :key="interval"
            class="badge"
          >
            {{ interval }}
          </span>
        </div>
      </div>
    </header>

    <a
      class="image"
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

    <div class="body">
      <p
        v-if="latestReleaseLabel"
        class="card-meta"
      >
        {{ latestReleaseLabel }}
      </p>
      <p
        v-if="series?.description"
        class="section-summary description"
      >
        {{ series.description }}
      </p>
      <div class="actions">
        <a
          class="ui-button ui-button--chip"
          :href="latestPrimaryLink"
          target="_blank"
          rel="noopener noreferrer"
        >View latest release</a>

        <button
          v-for="share in shareLinks"
          :key="share.label"
          class="ui-button ui-button--chip"
          type="button"
          :aria-label="`Share on ${share.label}`"
          @click="() => openShare(share.url)"
        >
          Share on {{ share.label }}
        </button>

        <div
          v-if="hasCodeIcon"
          class="code-icons"
        >
          <a
            v-if="seriesCodeLink"
            class="code-button"
            :href="seriesCodeLink"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`View ${series?.title} code on GitHub`"
          >
            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" />
            <span class="sr-only">Series GitHub link</span>
          </a>
          <a
            v-if="latestCodeLink"
            class="code-button"
            :href="latestCodeLink"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`View ${latestEntry.title || series?.title} code on GitHub`"
          >
            <font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }" />
            <span class="sr-only">Latest release GitHub link</span>
          </a>
        </div>
      </div>
    </div>

    <footer class="footer">
      <button
        v-if="hasHistory"
        class="history-toggle"
        type="button"
        :aria-expanded="expanded.toString()"
        @click="expanded = !expanded"
      >
        <span>Past versions</span>
        <span aria-hidden="true">{{ expanded ? "−" : "+" }}</span>
      </button>

      <transition name="history-collapse">
        <div
          v-if="expanded && hasHistory"
          class="history-list"
        >
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
import { useDateStore } from "@/stores/DateStore.js"

const props = defineProps({
  series: {
    type: Object,
    required: true
  }
})

const assetStore = useAssetPathStore();
const dateStore = useDateStore();

// directory that contains each edition ( flowtiles and river conditions)
const seriesBucket = props.series.bucket

// sort items by release dates
const items = props.series.items
  .filter((entry) => !entry.archive)
  .sort((a, b) => dateStore.toTimestamp(b.released) - dateStore.toTimestamp(a.released))

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

// series entries can point to a bucketed release asset or a shared local thumbnail
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
const seriesCodeLink = props.series?.links?.code || ""
const hasCodeIcon = Boolean(seriesCodeLink || latestCodeLink)

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
  overflow: visible;
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100%;
}

.header {
  padding: 1.5rem 1.5rem 0;
}

.code-icons {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
}

.code-button {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: inherit;
  text-decoration: none;
  transition: color 0.2s ease;
}

.code-button:hover,
.code-button:focus-visible,
.code-button:active {
  color: var(--color-link);
}

.row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.eyebrow {
  flex: 1 1 auto;
  color: var(--black-soft);
}

.badges {
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.badge {
  display: inline-flex;
  align-items: center;
  font-size: 1.4rem;
  border: 1px solid currentColor;
  border-radius: 999px;
  padding: 0.1rem 0.8rem;
  line-height: 1;
}

.image {
  display: block;
  position: relative;
  padding-top: 56%;
  overflow: hidden;
  border-top-left-radius: 1.2rem;
  border-top-right-radius: 1.2rem;
}

.image img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  position: relative;
  flex: 1 1 auto;
}

.description {
  margin: 0;
  color: var(--black-soft);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: auto;
}

.actions .ui-button {
  --pill-font-size: 1.4rem;
  --pill-padding: 0.4rem 1.2rem;
  backdrop-filter: none;
}

.actions .ui-button--chip {
  --pill-bg-color: transparent;
  --pill-border-color: var(--color-link);
  --pill-text-color: var(--color-link);
  --pill-hover-bg-color: var(--color-link);
  --pill-hover-border-color: var(--color-link);
  --pill-hover-text: #fff;
}

.footer {
  padding: 1.5rem;
  border-top: 1px solid var(--light-grey);
  min-height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--color-surface);
}

.history-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  background: none;
  border: none;
  padding: 0.2rem 0;
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.2;
  color: var(--black-soft);
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

.history-collapse-enter-active,
.history-collapse-leave-active {
  transition: all 200ms ease;
}

.history-collapse-enter-from,
.history-collapse-leave-to {
  opacity: 0;
  transform: translateY(-0.4rem);
}
@media (--bp-sm) {
  .series-card {
    width: 100%;
  }

  /* move interval badges to second lin on mobile */
  .row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
    margin: 0px 0px 15px;
  }

  .badges {
    width: 100%;
    justify-content: flex-start;
  }
}
</style>
