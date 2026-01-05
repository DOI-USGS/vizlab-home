<template>
  <section id="sketches" class="sketches-section">
    <div class="section-header">
      <div>
        <h2>sketches</h2>
        <p class="section-summary">
          Illustrations, diagrams, and infographics.
        </p>
      </div>

      <div v-if="availableTags.length" class="tag-filter">
        <button
          class="tag-chip"
          :class="{ active: !selectedTag }"
          type="button"
          @click="selectTag(null)"
        >
          All
        </button>
        <button
          v-for="tag in availableTags"
          :key="tag"
          class="tag-chip"
          :class="{ active: selectedTag === tag }"
          type="button"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <div v-if="filteredCards.length" class="sketch-grid">
      <SketchCard
        v-for="item in filteredCards"
        :key="item.id"
        :card="item"
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
  }
})

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
.sketches-section {
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

.tag-chip {
  border: 1px solid var(--black-soft);
  background: transparent;
  color: var(--black-soft);
  padding: 0.3rem 1.1rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 1.1rem;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.tag-chip.active,
.tag-chip:hover,
.tag-chip:focus-visible {
  background: var(--black-soft);
  color: #fff;
  border-color: var(--black-soft);
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
