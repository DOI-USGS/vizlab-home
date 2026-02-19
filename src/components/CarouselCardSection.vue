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
        <button
          class="carousel-nav-btn"
          type="button"
          :disabled="!canPrev"
          @click="move(-1)"
          :aria-label="prevAriaLabel"
        >
          ‹
        </button>
        <button
          class="carousel-nav-btn"
          type="button"
          :disabled="!canNext"
          @click="move(1)"
          :aria-label="nextAriaLabel"
        >
          ›
        </button>
      </div>
    </div>

    <ul class="cards-grid">
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
import { computed } from "vue"
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
  }
})

const computedSectionId = computed(() => props.sectionId || "content-grid")
const titleId = computed(() => `${computedSectionId.value}`)
const headingText = computed(() => props.title?.trim() || "")

const visibleItems = computed(() =>
  (props.items || []).filter((item) => !item?.archive)
)

const {
  windowItems: pagedItems,
  showControls,
  canPrev,
  canNext,
  move
} = useCarouselWindow(visibleItems, { windowSize: props.windowSize })
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
</style>
