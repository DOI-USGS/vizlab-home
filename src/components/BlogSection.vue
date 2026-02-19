<template>
  <CarouselCardSection
    :section-id="computedSectionId"
    title="water data blog"
    :summary="summaryText"
    :items="items"
    show-release-date
    prev-aria-label="Show previous blog posts"
    next-aria-label="Show next blog posts"
  >
    <template #summary>
      <p class="section-summary">
        Read more at
        <a
          href="https://waterdata.usgs.gov/blog"
          target="_blank"
          rel="noopener noreferrer"
        >waterdata.usgs.gov/blog</a>
      </p>
    </template>
  </CarouselCardSection>
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
  }
})

const computedSectionId = computed(() => props.id || "blogs")
const summaryText = computed(() => "")
</script>
