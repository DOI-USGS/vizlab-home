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
        <span v-if="metadataSummary">{{ metadataSummary }}</span>
        <span class="blog-section__cta">
          {{ linkIntroText }}
          <a
            :href="linkUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ linkLabel }}
          </a>
        </span>
      </p>
    </template>
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
  linkIntro: {
    type: String,
    default: ""
  },
  linkLabel: {
    type: String,
    default: ""
  },
  linkUrl: {
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
const linkIntroText = computed(() => props.linkIntro || blogsMeta.linkIntro || "")
const linkLabel = computed(() => props.linkLabel || blogsMeta.linkLabel || "")
const linkUrl = computed(() => props.linkUrl || blogsMeta.linkUrl || "https://waterdata.usgs.gov/blog")
const detailRoute = computed(() => ({
  name: "SectionDetail",
  params: { sectionId: computedSectionId.value }
}))
</script>

<style scoped>
.blog-section__cta {
  display: inline-block;
  margin-left: 0.2rem;
}
</style>
