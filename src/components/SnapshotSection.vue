<template>
  <section
    :id="sectionId"
    class="snapshot-section"
  >
    <div class="section-header">
      <div>
        <div class="section-title-row">
          <h2
            :id="titleId"
            :data-section-anchor="sectionId"
          >
            <a
              class="section-title-link"
              :href="`#${titleId}`"
            >
              snapshots
            </a>
          </h2>
        </div>
        <p class="section-summary">
          One-off charts and maps.
        </p>
      </div>

      <div
        v-if="availableTags.length"
        class="tag-filter"
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
        asset-source="chart"
      />
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from "vue"
import SketchCard from "@/components/SketchCard.vue"

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  id: {
    type: String,
    default: ""
  }
})

const sectionId = computed(() => props.id || "snapshots")
const titleId = computed(() => `${sectionId.value}-title`)

const cards = computed(() => (props.items || []).filter((item) => !item.archive))

// filtering the cards using button tags
const selectedTag = ref(null)

const availableTags = computed(() => {
  const allTags = new Set()
  cards.value.forEach((item) => {
    item.tags?.forEach((tag) => allTags.add(tag))
  })
  return Array.from(allTags).sort()
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
.snapshot-section {
  padding: 4rem 2rem 5rem;
  margin: 0 auto;
  max-width: 1200px;
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 2rem;
}

.sketch-grid {
  column-count: 4;
  column-gap: 1.5rem;
}

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: flex-end;
}

@media (max-width: 960px) {
  .sketch-grid {
    column-count: 2;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .tag-filter {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .sketch-grid {
    column-count: 1;
  }
}
</style>
