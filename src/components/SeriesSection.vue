<template>
  <section id="series" class="series-section">
    <div class="section-header">
      <h2>series</h2>
      <p class="section-summary">
        Your regular digest of water conditions.
      </p>
    </div>

    <div v-if="hasSeries" class="carousel">
      <button class="nav-btn" type="button" @click="move(-1)" aria-label="Previous series">
        ‹
      </button>

      <div class="carousel-window" aria-live="polite">
        <div class="carousel-track">
          <div
            v-for="slide in displaySeries"
            :key="slide.key"
            class="carousel-slide"
            :class="`carousel-slide--${slide.role}`"
          >
            <SeriesCard
              :series="slide.data"
              :placeholder="PLACEHOLDER_IMG"
              :thumb-base="thumbBase"
            />
          </div>
        </div>
      </div>

      <button class="nav-btn" type="button" @click="move(1)" aria-label="Next series">
        ›
      </button>
    </div>

    <p v-else class="empty-copy">We are assembling series for this portfolio.</p>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import SeriesCard from "@/components/SeriesCard.vue"

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 360'%3E%3Crect width='640' height='360' fill='%23edf0f2'/%3E%3Cpath fill='%23c8ced3' d='M0 300h640v60H0z'/%3E%3Cpath fill='%23b0b7bc' d='M0 0h640v140H0z' opacity='.6'/%3E%3C/svg%3E"

const props = defineProps({
  series: {
    type: [Array, Object],
    default: () => []
  }
})

const index = ref(0)

function formatSeriesLabel(value = "") {
  if (!value) return ""
  return value
    .replace(/[-_]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

const seriesList = computed(() => {
  const value = props.series
  if (Array.isArray(value)) {
    return value
  }
  if (value && typeof value === "object") {
    return Object.entries(value).map(([key, entry]) => {
      if (Array.isArray(entry)) {
        return {
          id: key,
          title: formatSeriesLabel(key),
          description: "",
          entries: entry
        }
      }
      return {
        ...entry,
        id: entry?.id || key,
        title: entry?.title || formatSeriesLabel(entry?.id || key),
        description: entry?.description ?? entry?.summary ?? "",
        entries: Array.isArray(entry?.entries) ? entry.entries : []
      }
    })
  }
  return []
})

watch(
  () => seriesList.value.length,
  (len) => {
    if (!len) {
      index.value = 0
    } else if (index.value > len - 1) {
      index.value = 0
    }
  }
)

const hasSeries = computed(() => seriesList.value.length > 0)

const currentSeries = computed(() => seriesList.value?.[index.value] ?? null)

const displaySeries = computed(() => {
  const list = seriesList.value
  const len = list.length
  if (!len) return []
  const offsets = [-1, 0, 1]
  return offsets.map((offset) => {
    const role = offset === 0 ? "center" : "side"
    const idx = ((index.value + offset) % len + len) % len
    const data = list[idx]
    return {
      role,
      data,
      key: `${data?.id ?? idx}-${role}-${idx}-${index.value}`
    }
  })
})

const thumbBase = computed(() => {
  const base = (import.meta.env.VITE_APP_S3_PROD_URL || "").replace(/\/+$/, "")
  return base ? `${base}/thumbnails` : ""
})

function move(step) {
  if (!hasSeries.value) return
  const len = seriesList.value.length
  index.value = (index.value + step + len) % len
}
</script>

<style scoped>
.series-section {
  padding: 4rem 2rem 5rem;
  margin: 0 auto;
  max-width: 1200px;
}

.carousel {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.carousel-window {
  flex: 1;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: clamp(1rem, 3vw, 3rem);
  padding: 2rem 0;
}

.carousel-slide {
  flex: 0 0 min(70vw, 420px);
  transition:
    transform 250ms ease,
    opacity 250ms ease;
  will-change: transform;
}

.carousel-slide--center {
  transform: scale(1);
  opacity: 1;
}

.carousel-slide--side {
  transform: scale(0.94);
  opacity: 0.6;
}

.nav-btn {
  border: none;
  background: rgba(0, 0, 0, 0.05);
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 999px;
  font-size: 2.4rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.nav-btn:hover,
.nav-btn:focus-visible {
  background: rgba(0, 0, 0, 0.12);
}

.empty-copy {
  color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 700px) {
  .carousel {
    flex-direction: column;
  }

  .nav-btn {
    order: 2;
  }

}
</style>
