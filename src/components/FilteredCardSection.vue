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
              {{ titleText }}
            </a>
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
        <button
          class="pill-button tag-chip"
          :class="{ 'pill-button--active': !selectedTag }"
          type="button"
          @click="selectTag(null)"
        >
          All
        </button>
        <button
          v-for="tag in availableTags"
          :key="tag"
          class="pill-button tag-chip"
          :class="{ 'pill-button--active': selectedTag === tag }"
          type="button"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </button>
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
.tag-chip {
  background: rgba(10, 77, 104, 0.18);
  border-color: rgba(10, 77, 104, 0.45);
  color: rgba(10, 77, 104, 0.85);
}

.tag-chip:hover,
.tag-chip:focus-visible {
  border-color: rgba(10, 77, 104, 0.75);
  color: rgba(10, 77, 104, 1);
}

.tag-chip.pill-button--active,
.tag-chip.pill-button.active {
  background: #0a4d68;
  border-color: #0a4d68;
  color: #fff;
}

.sketch-grid {
  column-count: 4;
  column-gap: 1.5rem;
}

@media (max-width: 960px) {
  .sketch-grid {
    column-count: 2;
  }
}

@media (max-width: 640px) {
  .sketch-grid {
    column-count: 1;
  }
}
</style>
