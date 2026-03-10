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
      class="card-grid card-grid--auto"
      :class="{ 'card-grid--rows': normalizedPreviewRows > 0 }"
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
      class="card-grid card-grid--auto card-grid--overflow"
      :class="{ 'card-grid--fixed': normalizedPreviewRows > 0 }"
      :style="overflowGridStyle"
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
const sectionId = props.id || "content-grid"
const titleId = sectionId
const titleText = props.title?.trim() || ""
const normalizedPreviewRows = Math.max(0, Math.floor(Number(props.previewRows) || 0))

const visibleItems = computed(() =>
  (props.items || []).filter((item) => !item?.archive)
)

const previewGridStyle = computed(() => {
  if (normalizedPreviewRows > 0) {
    return {
      "--card-grid-preview-rows": normalizedPreviewRows,
      "--card-grid-columns": previewColumnCount.value
    }
  }
  return null
})

const overflowGridStyle = computed(() => {
  if (normalizedPreviewRows > 0) {
    return { "--card-grid-columns": previewColumnCount.value }
  }
  return null
})

const isMobilePreview = computed(() => windowSizeStore.windowWidth > 0 && windowSizeStore.windowWidth < MOBILE_BREAKPOINT)

const basePreviewLimit = computed(() => {
  return isMobilePreview.value ? MOBILE_PREVIEW_COUNT : props.previewCount
})

const previewColumnCount = computed(() => {
  if (normalizedPreviewRows <= 0) return 0
  return Math.max(1, Math.ceil(basePreviewLimit.value / normalizedPreviewRows))
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
