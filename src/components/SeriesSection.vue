<template>
  <section
    :id="sectionId"
    class="series-section"
  >
    <div class="section-intro">
      <div class="section-header series-header">
        <div class="section-title-row">
          <h2
            :id="titleId"
            :data-section-anchor="sectionId"
          >
            <a
              class="section-title-link"
              :href="`#${titleId}`"
            >
              series
            </a>
          </h2>
        </div>
        <div class="carousel-controls carousel-controls--mobile">
          <button
            class="nav-btn"
            @click="move(-1)"
          >
            ‹
          </button>
          <button
            class="nav-btn"
            @click="move(1)"
          >
            ›
          </button>
        </div>
      </div>
      <div class="section-summary">
        <p>Your regular digest of water conditions.</p>
      </div>
    </div>

    <div class="carousel">
      <div class="carousel-controls carousel-controls--desktop">
        <button
          class="nav-btn"
          @click="move(-1)"
        >
          ‹
        </button>
        <button
          class="nav-btn"
          @click="move(1)"
        >
          ›
        </button>
      </div>
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

const sectionId = "series"
const titleId = "series"

// carousel navigation
const index = ref(0)
const initialized = ref(false)
const seriesList = computed(() => (props.series || []).filter((collection) => !collection.archive))

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
.series-section {
  padding: 4rem 2rem 5rem;
  margin: 0 auto;
  max-width: 1200px;
}
.section-intro {
  margin-bottom: 1rem;
  padding: 0px 15px;
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

.carousel-controls {
  display: flex;
  gap: 0.8rem;
}

.carousel-controls--desktop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: -2rem;
  right: -2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
}

.carousel-controls--mobile {
  display: none;
}

.carousel-controls--desktop .nav-btn {
  pointer-events: auto;
}

.carousel-slide {
  flex: 0 0 28%;
  transition:
    transform 250ms ease,
    opacity 250ms ease;
}

.carousel-slide--center {
  flex-basis: 38%;
  transform: scale(1.02);
  opacity: 1;
}

.carousel-slide--side {
  flex-basis: 28%;
  transform: scale(0.9);
  opacity: 0.55;
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

  .series-section {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    width: 100%;
    overflow: hidden;
  }
  .series-header {
    margin-bottom: 0px;
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

  .carousel-controls {
    flex-direction: row;
    justify-content: flex-end;
    order: 1;
  }

  .carousel-window {
    order: 2;
    width: 100%;
    margin: 0 auto;
  }

  .carousel-slide {
    flex: 0 0 calc(100% - 10rem); /* leaves a small portion of side slides visible */
  }

  .nav-btn {
    order: 2;
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
  }

  .carousel-controls--mobile {
    display: flex;
    order: 2;
  }

  .carousel-controls--desktop {
    display: none;
    position: static;
    pointer-events: auto;
  }

}
</style>
