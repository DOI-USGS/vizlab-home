<template>
  <section
    :id="computedSectionId"
    class="content-section"
  >
    <div class="section-header section-header--with-controls">
      <div>
        <div class="section-title-row">
          <h2
            :id="titleId"
            :data-section-anchor="computedSectionId"
          >
            <a
              class="section-title-link"
              :href="`#${titleId}`"
            >
              {{ headingText }}
            </a>
          </h2>
        </div>
        <slot name="summary">
          <p
            v-if="summary"
            class="section-summary"
          >
            {{ summary }}
          </p>
        </slot>
      </div>

      <div
        v-if="showControls"
        class="section-controls"
      >
        <div
          v-if="navHintVisible"
          class="section-nav-hint"
        >
          <span>{{ navHint }}</span>
          <svg
            class="hint-arrow"
            viewBox="0 0 120 40"
            aria-hidden="true"
          >
            <path d="M8 20 C38 20, 68 20, 92 20" />
            <g
              transform="translate(92 20) rotate(180)"
            >
              <path d="M0 0 L8 -4" />
              <path d="M0 0 L8 4" />
            </g>
          </svg>
        </div>
        <button
          class="carousel-nav-btn"
          type="button"
          :disabled="!canPrev"
          @click="handleMove(-1)"
          :aria-label="prevAriaLabel"
        >
          ‹
        </button>
        <button
          class="carousel-nav-btn"
          type="button"
          :disabled="!canNext"
          @click="handleMove(1)"
          :aria-label="nextAriaLabel"
        >
          ›
        </button>
      </div>
    </div>

    <ul
      class="cards-grid"
      :class="{ 'cards-grid--column-flow': columnFlowRows > 0 }"
      :style="columnFlowStyle"
    >
      <ContentCard
        v-for="item in pagedItems"
        :key="item.id ?? item.title"
        :item="item"
        :image-ratio="cardImageRatio"
        :show-release-date="showReleaseDate"
      />
    </ul>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import ContentCard from "@/components/ContentCard.vue"
import { useCarouselWindow } from "@/composables/useCarouselWindow.js"

const props = defineProps({
  sectionId: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  summary: {
    type: String,
    default: ""
  },
  items: {
    type: Array,
    default: () => []
  },
  windowSize: {
    type: Number,
    default: 8
  },
  stepSize: {
    type: Number,
    default: 1
  },
  cardImageRatio: {
    type: Number,
    default: 100
  },
  showReleaseDate: {
    type: Boolean,
    default: false
  },
  prevAriaLabel: {
    type: String,
    default: "Show previous items"
  },
  nextAriaLabel: {
    type: String,
    default: "Show next items"
  },
  navHintText: {
    type: String,
    default: ""
  },
  columnFlowRows: {
    type: Number,
    default: 0
  }
})

const computedSectionId = computed(() => props.sectionId || "content-grid")
const titleId = computed(() => `${computedSectionId.value}`)
const headingText = computed(() => props.title?.trim() || "")

const visibleItems = computed(() =>
  (props.items || []).filter((item) => !item?.archive)
)

const columnFlowRows = computed(() => {
  const value = Number(props.columnFlowRows)
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0
})

const columnFlowStyle = computed(() => {
  if (columnFlowRows.value > 0) {
    return { "--carousel-grid-rows": columnFlowRows.value }
  }
  return null
})

const {
  windowItems: pagedItems,
  showControls,
  canPrev,
  canNext,
  move: carouselMove
} = useCarouselWindow(visibleItems, {
  windowSize: props.windowSize,
  stepSize: props.stepSize ?? undefined
})

const navHint = computed(() => props.navHintText?.trim() || "")
const navHintDismissed = ref(false)
const navHintVisible = computed(
  () => Boolean(navHint.value) && !navHintDismissed.value
)

watch(
  () => props.navHintText,
  () => {
    navHintDismissed.value = false
  }
)

function handleMove(step) {
  navHintDismissed.value = true
  carouselMove(step)
}
</script>

<style scoped>
.cards-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(1.2rem, 2vw, 2.4rem);
}

.cards-grid--column-flow {
  grid-template-columns: none;
  grid-auto-columns: minmax(240px, 1fr);
  grid-auto-flow: column;
  grid-template-rows: repeat(var(--carousel-grid-rows, 2), minmax(0, auto));
}

.cards-grid--column-flow .content-card {
  height: 100%;
}

@media (--bp-md) {
  .cards-grid--column-flow {
    grid-auto-flow: row;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    grid-template-rows: none;
  }
}

</style>
