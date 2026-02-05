<template>
  <section
    :id="sectionId"
    class="viz-section"
  >
    <div class="section-header">
      <div class="section-title-row">
        <h2
          :id="titleId"
          :data-section-anchor="sectionId"
        >
          <a
            class="section-title-link"
            :href="`#${titleId}`"
          >
            {{ headingText }}
          </a>
        </h2>
      </div>
      <p class="section-summary">
        Told by water data.
      </p>
    </div>

    <ul class="cards-grid">
      <ContentCard
        v-for="viz in visibleItems"
        :key="viz.id ?? viz.title"
        :item="viz"
        :image-ratio="100"
      />
    </ul>
  </section>
</template>

<script setup>
import { computed } from "vue"
import ContentCard from "@/components/ContentCard.vue"

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
    default: ""
  }
})

const sectionId = computed(() => props.id || "stories")
const headingText = computed(() => props.title?.trim() || "science stories")
const titleId = computed(() => `${sectionId.value}`)

// filter out vizzies with "archive": true
const visibleItems = computed(() =>
  (props.items).filter((item) => !item.archive)
)
</script>

<style scoped>
.viz-section {
  padding: 4rem 2rem 5rem;
  margin: 0 auto;
  max-width: 1200px;
}


.cards-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(1.2rem, 2vw, 2.4rem);
}

</style>
