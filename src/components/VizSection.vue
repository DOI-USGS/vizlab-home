<template>
  <CarouselCardSection
    :section-id="computedSectionId"
    :title="title"
    :summary="computedSummary"
    :items="items"
    :step-size="2"
    prev-aria-label="Show previous stories"
    next-aria-label="Show next stories"
    nav-hint-text="but wait, there's more!"
    :column-flow-rows="2"
  >
    <template #footer>
      <div class="section-footer">
        <RouterLink
          class="hero-panel__nav-link section-footer__link"
          :to="detailRoute"
        >
          View Full Gallery
        </RouterLink>
      </div>
    </template>
  </CarouselCardSection>
</template>

<script setup>
import { computed } from "vue"
import { RouterLink } from "vue-router"
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
const detailRoute = computed(() => ({
  name: "SectionDetail",
  params: { sectionId: computedSectionId.value }
}))
</script>
