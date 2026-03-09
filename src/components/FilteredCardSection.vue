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
            <template v-if="linkTitle">
              <a
                class="section-title-link"
                :href="`#${titleId}`"
              >
                {{ titleText }}
              </a>
            </template>
            <template v-else>
              <span class="section-title-link section-title-link--static">
                {{ titleText }}
              </span>
            </template>
          </h2>
        </div>
        <p
          v-if="summary"
          class="section-summary"
        >
          {{ summary }}
        </p>
      </div>

      <div
        v-if="availableTags.length"
        class="section-controls section-controls--wrap"
      >
        <div class="tag-filter">
          <button
            class="pill-button pill-button--tag"
            :class="{ 'pill-button--active': !selectedTag }"
            type="button"
            @click="selectTag(null)"
          >
            All
          </button>
          <button
            v-for="tag in availableTags"
            :key="tag"
            class="pill-button pill-button--tag"
            :class="{ 'pill-button--active': selectedTag === tag }"
            type="button"
            @click="selectTag(tag)"
          >
            {{ tag }}
          </button>
        </div>
      </div>

    </div>

    <div
      v-if="filteredCards.length"
      class="sketch-grid-container"
      :class="{
        'sketch-grid-container--fade': shouldFade,
        'sketch-grid-container--full': disableFade
      }"
    >
      <div class="sketch-grid">
        <SketchCard
          v-for="item in filteredCards"
          :key="item.id"
          :card="item"
          :asset-source="assetSource"
        />
      </div>
    </div>

    <div
      v-if="showDetailLink"
      class="section-footer"
    >
      <RouterLink
        class="hero-panel__nav-link section-footer__link"
        :to="{ name: 'SectionDetail', params: { sectionId: computedSectionId } }"
      >
        View Full Gallery
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue"
import { RouterLink } from "vue-router"
import SketchCard from "@/components/SketchCard.vue"

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
  assetSource: {
    type: String,
    default: "illustration"
  },
  showDetailLink: {
    type: Boolean,
    default: true
  },
  linkTitle: {
    type: Boolean,
    default: true
  },
  disableFade: {
    type: Boolean,
    default: false
  }
})

const computedSectionId = computed(() => props.id || "sketches")
const titleId = computed(() => `${computedSectionId.value}`)
const titleText = computed(() => props.title || "")
const summary = computed(() => props.summary)

const cards = computed(() => (props.items || []).filter((item) => !item?.archive))
const selectedTag = ref(null)

const availableTags = computed(() => {
  const tags = new Set()
  cards.value.forEach((item) => {
    item.tags?.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
})

const filteredCards = computed(() => {
  if (!selectedTag.value) return cards.value
  return cards.value.filter((card) => card.tags?.includes(selectedTag.value))
})

const shouldFade = computed(() => !props.disableFade && props.showDetailLink && filteredCards.value.length > 6)

const selectTag = (tag) => {
  selectedTag.value = tag
}
</script>

<style scoped>
.sketch-grid-container {
  position: relative;
  max-height: 75rem;
  overflow: hidden;
}

.sketch-grid {
  column-count: 2;
  column-gap: 1.5rem;
}

.sketch-grid-container--fade::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 8rem;
  pointer-events: none;
  background:
    linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.85) 65%,
      var(--color-background, #f5f6f8) 100%
    );
}

.sketch-grid-container--full {
  max-height: none;
  overflow: visible;
}

.sketch-grid-container--full::after {
  display: none;
}

.tag-filter {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

@media (max-width: 960px) {
  .sketch-grid-container {
    max-height: none;
  }

  .sketch-grid-container--fade::after {
    display: none;
  }

}

@media (min-width: 961px) {
  .sketch-grid {
    column-count: 4;
  }
}
</style>
