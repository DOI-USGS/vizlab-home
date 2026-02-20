<template>
  <CarouselCardSection
    :section-id="computedSectionId"
    :title="titleText"
    :summary="metadataSummary"
    :items="items"
    show-release-date
    prev-aria-label="Show previous blog posts"
    next-aria-label="Show next blog posts"
  >
    <template #summary>
      <p class="section-summary">
        {{ metadataSummary }}
        <br>
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
import sectionMetadata from "@/assets/content/section-metadata.json"

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
  }
})

const blogsMeta = sectionMetadata.blogs
const computedSectionId = computed(() => props.id || blogsMeta.id)
const titleText = computed(() => props.title || blogsMeta.title)
const metadataSummary = computed(() => props.summary || blogsMeta.summary)
</script>
