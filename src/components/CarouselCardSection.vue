<template>
  <section
    :id="computedSectionId"
    class="content-section"
  >
    <div class="section-header">
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
    <slot name="footer" />
  </section>
</template>

<script setup>
import { computed } from "vue"
import ContentCard from "@/components/ContentCard.vue"
import { useWindowSizeStore } from "@/stores/WindowSizeStore.js"

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
  cardImageRatio: {
    type: Number,
    default: 100
  },
  showReleaseDate: {
    type: Boolean,
    default: false
  },
  columnFlowRows: {
    type: Number,
    default: 0
  },
  disableCarousel: {
    type: Boolean,
    default: false
  }
})

const MOBILE_PREVIEW_COUNT = 6
const MOBILE_BREAKPOINT = 700

const windowSizeStore = useWindowSizeStore()
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

const isMobilePreview = computed(() => windowSizeStore.windowWidth > 0 && windowSizeStore.windowWidth < MOBILE_BREAKPOINT)

const previewLimit = computed(() => {
  if (props.disableCarousel) return Number.POSITIVE_INFINITY
  return isMobilePreview.value ? MOBILE_PREVIEW_COUNT : props.windowSize
})

const pagedItems = computed(() => visibleItems.value.slice(0, previewLimit.value))
</script>

<style scoped>
.cards-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(1.2rem, 2vw, 2.4rem);
}

.cards-grid--column-flow {
  grid-auto-flow: row;
  grid-template-rows: none;
}

.cards-grid--column-flow .content-card {
  height: 100%;
}

@media (min-width: 700px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 961px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  }

  .cards-grid--column-flow {
    grid-template-columns: none;
    grid-auto-columns: minmax(240px, 1fr);
    grid-auto-flow: column;
    grid-template-rows: repeat(var(--carousel-grid-rows, 2), minmax(0, auto));
  }
}

</style>
