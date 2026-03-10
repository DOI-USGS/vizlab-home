<template>
  <section
    :id="sectionId"
    class="content-section"
  >
    <div class="section-header">
      <h2
        :id="titleId"
        :data-section-anchor="sectionId"
      >
        <a
          class="section-title-link"
          :href="`#${titleId}`"
        >
          {{ titleText }}
        </a>
      </h2>
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
      :class="{ 'cards-grid--preview-rows': previewRows > 0 }"
      :style="previewGridStyle"
    >
      <ContentCard
        v-for="item in previewItems"
        :key="item.id ?? item.title"
        :item="item"
        :image-ratio="imageRatio"
        :show-release-date="showDate"
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
        :image-ratio="imageRatio"
        :show-release-date="showDate"
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
  </section>
</template>

<script setup>
import { computed, ref } from "vue"
import ContentCard from "@/components/ContentCard.vue"
import { useWindowSizeStore } from "@/stores/WindowSizeStore.js"

const props = defineProps({
  id: {
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
  previewCount: {
    type: Number,
    default: 8
  },
  imageRatio: {
    type: Number,
    default: 100
  },
  showDate: {
    type: Boolean,
    default: false
  },
  previewRows: {
    type: Number,
    default: 0
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
const sectionId = computed(() => props.id || "content-grid")
const titleId = computed(() => `${sectionId.value}`)
const titleText = computed(() => props.title?.trim() || "")

const visibleItems = computed(() =>
  (props.items || []).filter((item) => !item?.archive)
)

const previewRows = computed(() => {
  const value = Number(props.previewRows)
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0
})

const previewGridStyle = computed(() => {
  if (previewRows.value > 0) {
    return { "--card-grid-preview-rows": previewRows.value }
  }
  return null
})

const isMobilePreview = computed(() => windowSizeStore.windowWidth > 0 && windowSizeStore.windowWidth < MOBILE_BREAKPOINT)

const basePreviewLimit = computed(() => {
  return isMobilePreview.value ? MOBILE_PREVIEW_COUNT : props.previewCount
})

const hasOverflow = computed(() => visibleItems.value.length > basePreviewLimit.value)

const previewItems = computed(() => {
  return visibleItems.value.slice(0, basePreviewLimit.value)
})

const overflowItems = computed(() => {
  if (!expanded.value) return []
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
  grid-auto-flow: row;
  grid-template-rows: none;
}

.cards-grid--preview-rows .content-card {
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

  .cards-grid--preview-rows {
    grid-template-columns: none;
    grid-auto-columns: minmax(240px, 1fr);
    grid-auto-flow: column;
    grid-template-rows: repeat(var(--card-grid-preview-rows, 2), minmax(0, auto));
  }
}

</style>
