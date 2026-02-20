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

      <div class="section-controls section-controls--wrap">
        <RouterLink
          v-if="showDetailLink"
          class="pill-button pill-button--outline"
          :to="{ name: 'SectionDetail', params: { sectionId: computedSectionId } }"
        >
          View Full Gallery
        </RouterLink>
        <div
          v-if="availableTags.length"
          class="tag-filter"
        >
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
      class="sketch-grid"
    >
      <SketchCard
        v-for="item in filteredCards"
        :key="item.id"
        :card="item"
        :asset-source="assetSource"
      />
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

const selectTag = (tag) => {
  selectedTag.value = tag
}
</script>

<style scoped>
.sketch-grid {
  column-count: 4;
  column-gap: 1.5rem;
}

.section-title-link--static {
  color: var(--color-link);
  cursor: default;
  pointer-events: none;
  box-shadow: none;
}

.tag-filter {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

@media (--bp-md) {
  .sketch-grid {
    column-count: 2;
  }
}

@media (--bp-xs) {
  .sketch-grid {
    column-count: 1;
  }
}
</style>
