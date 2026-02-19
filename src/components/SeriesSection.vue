<template>
  <section
    :id="sectionId"
    class="series-section content-section"
  >
    <div class="section-intro">
      <div class="section-header section-header--with-controls">
        <div class="section-title-row">
          <h2
            :id="titleId"
            :data-section-anchor="sectionId"
          >
            <a
              class="section-title-link"
              :href="`#${titleId}`"
            >
              Animated Series
            </a>
          </h2>
        </div>
        <div class="section-controls series-nav-controls">
          <div class="series-nav-buttons">
            <button
              class="carousel-nav-btn carousel-nav-btn--lg"
              type="button"
              @click="move(-1)"
              aria-label="Show previous series"
            >
              ‹
            </button>
            <button
              class="carousel-nav-btn carousel-nav-btn--lg"
              type="button"
              @click="move(1)"
              aria-label="Show next series"
            >
              ›
            </button>
          </div>
          <div
            v-if="!hintDismissed"
            class="series-nav-hint"
          >
            <svg
              class="series-nav-hint__arrow"
              viewBox="0 0 110 40"
              aria-hidden="true"
            >
              <path d="M10 12 C46 32, 78 32, 98 18" />
              <g
                class="series-nav-hint__arrow-head"
                transform="rotate(-36 97 16)"
              >
                <path d="M86 8 L97 16" />
                <path d="M86 24 L97 16" />
              </g>
            </svg>
            <span class="series-nav-hint__text">but wait, there's more!</span>
          </div>
        </div>
      </div>
      <div class="section-summary">
        <p>Recurring visualizations of current conditions and events.</p>
      </div>
    </div>

    <div class="carousel">
      <div
        class="carousel-window"
        aria-live="polite"
      >
        <div class="carousel-track">
          <div
            v-for="slide in displaySeries"
            :key="slide.key"
            class="carousel-slide"
            :class="`carousel-slide--${slide.role}`"
          >
            <SeriesCard
              :series="slide.data"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import SeriesCard from "@/components/SeriesCard.vue"

const props = defineProps({
  series: {
    type: [Array, Object],
    default: () => []
  },
  initialSeriesId: {
    type: String,
    default: "riverConditions" // set which series is shown in middle card on pagge load. ordering is based on order in json
  }
})

const sectionId = "Series"
const titleId = "series"

// carousel navigation
const index = ref(0)
const initialized = ref(false)
const seriesList = computed(() => (props.series || []).filter((collection) => !collection.archive))
const hintDismissed = ref(false)

// show part of the series on either side of the focal one in the carousel
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

// nagivate carousel slides
function move(step) {
  hintDismissed.value = true
  const list = seriesList.value
  const len = list.length
  if (!len) return
  index.value = (index.value + step + len) % len
}

watch(
  () => [props.initialSeriesId, seriesList.value],
  () => {
    const list = seriesList.value
    const len = list.length
    if (!len) {
      index.value = 0
      return
    }

    if (!initialized.value) {
      const preferredId = props.initialSeriesId
      if (preferredId) {
        const targetIndex = list.findIndex((collection) => collection.id === preferredId)
        index.value = targetIndex >= 0 ? targetIndex : 0
      } else {
        index.value = 0
      }
      initialized.value = true
    } else if (index.value >= len) {
      index.value = index.value % len
    }
  },
  { immediate: true }
)
</script>

<style scoped>
.section-intro {
  margin-bottom: 1rem;
  padding: 0px 15px;
}

.series-nav-controls {
  gap: 0.4rem;
  align-items: flex-end;
  flex-direction: column;
}

.series-nav-buttons {
  display: flex;
  gap: 0.8rem;
  align-items: center;
}

.series-nav-hint {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  color: var(--color-link, #0a4d68);
  font-family: 'Caveat', 'Faster One', 'Source Sans Pro', cursive;
  font-size: 1.8rem;
  letter-spacing: 0.04em;
  margin-right: 0.2rem;
  margin-top: 0.4rem;
  transform: rotate(-2deg);
  filter: drop-shadow(0 3px 8px rgba(0, 0, 0, 0.4));
}

.series-nav-hint__arrow {
  width: 7rem;
  height: 3.8rem;
  margin-top: 0.2rem;
  transform: rotate(-48deg);
}

.series-nav-hint__arrow path {
  stroke: currentColor;
  stroke-width: 2.5;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.series-nav-hint__arrow path:last-child {
  stroke-width: 2;
}

.carousel {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.carousel-window {
  flex: 1;
}

.carousel-track {
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 1rem; /* gap between slides */
  padding: 1rem 0;
}

.carousel-slide {
  flex: 1 1 32%;
  max-width: 32%;
  transition: transform 200ms ease;
}

.carousel-slide--center,
.carousel-slide--side {
  opacity: 1;
  transform: none;
}

.empty-copy {
  color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 700px) {

  .series-section {
    overflow: hidden;
  }
  .series-header {
    margin-bottom: 0px;
    padding-right: 0;
    flex-direction: column;
  }

  .series-nav-hint {
    display: none;
  }

  .carousel {
    flex-direction: column;
    align-items: stretch;
  }

  .carousel-track {
    display: flex;
    align-items: stretch;
    justify-content: center;
    gap: 0.2rem; /* gap between slides */
    padding: 0.2rem 0;
    width: 100%;
    margin: 0 auto;
  }

  .carousel-window {
    width: 100%;
    margin: 0 auto;
  }

  .carousel-slide {
    flex: 0 0 calc(100% - 10rem); /* leaves a small portion of side slides visible */
    max-width: none;
  }

}
</style>
