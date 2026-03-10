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
        v-for="item in previewItems"
        :key="item.id ?? item.title"
        :item="item"
        :image-ratio="cardImageRatio"
        :show-release-date="showReleaseDate"
      />
    </ul>
    <ul
      v-if="expanded && overflowItems.length"
      class="cards-grid cards-grid--overflow"
    >
      <ContentCard
        v-for="item in overflowItems"
        :key="item.id ?? item.title"
        :item="item"
        :image-ratio="cardImageRatio"
        :show-release-date="showReleaseDate"
      />
    </ul>
    <div
      v-if="expandable && hasOverflow"
      class="section-footer section-footer--expand"
    >
      <button
        class="ui-button ui-button--disclosure"
        :class="{ active: expanded }"
        type="button"
        :aria-expanded="expanded.toString()"
        @click="toggleExpanded"
      >
        <span>{{ expanded ? collapseLabel : expandLabel }}</span>
        <span aria-hidden="true">{{ expanded ? "−" : "+" }}</span>
      </button>
    </div>
    <slot name="footer" />
  </section>
</template>

<script setup>
import { computed, ref } from "vue"
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
  },
  expandable: {
    type: Boolean,
    default: false
  },
  expandLabel: {
    type: String,
    default: "Show more"
  },
  collapseLabel: {
    type: String,
    default: "Show Less"
  }
})

const MOBILE_PREVIEW_COUNT = 6
const MOBILE_BREAKPOINT = 700

const windowSizeStore = useWindowSizeStore()
const expanded = ref(false)
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

const basePreviewLimit = computed(() => {
  if (props.disableCarousel) return Number.POSITIVE_INFINITY
  return isMobilePreview.value ? MOBILE_PREVIEW_COUNT : props.windowSize
})

const hasOverflow = computed(() => !props.disableCarousel && visibleItems.value.length > basePreviewLimit.value)

const previewItems = computed(() => {
  if (props.disableCarousel) return visibleItems.value
  return visibleItems.value.slice(0, basePreviewLimit.value)
})

const overflowItems = computed(() => {
  if (props.disableCarousel || !expanded.value) return []
  return visibleItems.value.slice(basePreviewLimit.value)
})

const toggleExpanded = () => {
  expanded.value = !expanded.value
}
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

.cards-grid--overflow {
  margin-top: clamp(1.2rem, 2vw, 2rem);
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
