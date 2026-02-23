<template>
  <CarouselCardSection
    :section-id="computedSectionId"
    :title="title"
    :summary="computedSummary"
    :items="items"
    :step-size="1"
    prev-aria-label="Show previous items"
    next-aria-label="Show next items"
    nav-hint-text="but wait, there's more!"
    :column-flow-rows="2"
  />
</template>

<script setup>
import { computed } from "vue"
import CarouselCardSection from "@/components/CarouselCardSection.vue"

const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  items: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: "science stories"
  },
  summary: {
    type: String,
    default: "Told with USGS water data."
  }
})

const computedSectionId = computed(() => props.id || "stories")
const computedSummary = computed(() => props.summary)
</script>
