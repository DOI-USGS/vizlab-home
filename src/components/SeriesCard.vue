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
      :href="latestEntry.productUrl || '#'"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        :src="latestThumb"
        :alt="latestEntry.alt"
        loading="lazy"
      >
    </a>

    <div class="series-card__body">
      <p class="series-card__meta">
        {{ latestEntry.released }}
      </p>
      <p v-if="series?.description" class="series-card__description">
        {{ series.description }}
      </p>
      <div class="series-card__actions">
        <a
          class="series-link"
          :href="latestEntry.productUrl || '#'"
          target="_blank"
          rel="noopener noreferrer"
        >View latest release</a>

        <button
          v-if="isFlowSeries"
          class="series-link ghost x-share"
          type="button"
          @click="shareOnX"
          :aria-label="`Share ${latestEntry.title} on X`"
        >
          <svg class="x-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="currentColor"
              d="M18.6 3h3.1l-6.7 7.7L23 21h-5.9l-4.6-6-5 6H4.5l7.1-8.4L2 3h6.1l4.2 5.5L18.6 3z"
            />
          </svg>
        </button>
        <a
          v-if="latestEntry.codeUrl"
          class="series-link ghost"
          :href="latestEntry.codeUrl"
          target="_blank"
          rel="noopener noreferrer"
        >View code</a>
      </div>
    </div>

    <footer v-if="history.length" class="series-card__footer">
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
            v-for="entry in history"
            :key="entry.id"
            class="history-link"
            :href="entry.productUrl || '#'"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ entry.released }}
          </a>
        </div>
      </transition>
    </footer>
  </article>
</template>

<script setup>
import { computed, ref } from "vue"

const props = defineProps({
  series: {
    type: Object,
    required: true
  },
  thumbBase: {
    type: String,
    default: ""
  }
})

const latestEntry = computed(() => props.series?.entries?.[0] ?? {})
const history = computed(() => props.series?.entries?.slice(1) ?? [])
const expanded = ref(false)

// add share to social media buttons
const isFlowSeries = computed(() => props.series?.id === "flowTiles")
function extractTweetId(url = "") {
  try {
    const parsed = new URL(url)
    const segments = parsed.pathname.split("/").filter(Boolean)
    const statusIndex = segments.findIndex((seg) => seg === "status")
    if (statusIndex !== -1 && segments[statusIndex + 1]) {
      return segments[statusIndex + 1]
    }
    return segments[segments.length - 1] || ""
  } catch (err) {
    return ""
  }
}

// retweet on twitter
const shareUrl = computed(() => {
  const url = latestEntry.value?.shareUrl || latestEntry.value?.productUrl
  const tweetId = extractTweetId(url)
  if (!tweetId) return ""
  const intentBase = "https://twitter.com/intent/retweet"
  return `${intentBase}?tweet_id=${encodeURIComponent(tweetId)}`
})

function shareOnX() {
  if (!shareUrl.value) return
  window.open(shareUrl.value, "_blank", "noopener,noreferrer")
}

const resolvedBase = computed(() => {
  const override = props.series?.thumbBase
  const base = override || props.thumbBase || ""
  return base.replace(/\/+$/, "")
})

const latestThumb = computed(() => {
  const thumb = latestEntry.value?.thumb
  if (!thumb) return props.placeholder
  if (/^https?:\/\//i.test(thumb)) return thumb
  const base = resolvedBase.value
  return base ? `${base}/${thumb.replace(/^\//, "")}` : props.placeholder
})
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
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 1.2rem;
  padding: 0.6rem 1rem;
  border: 1px solid currentColor;
  border-radius: 999px;
  text-decoration: none;
}

.series-link.ghost {
  opacity: 0.65;
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
