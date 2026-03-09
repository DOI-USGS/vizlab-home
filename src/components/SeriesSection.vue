<template>
  <section
    :id="sectionId"
    class="series-section content-section"
  >
    <div class="section-intro">
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
              {{ titleText }}
            </a>
          </h2>
        </div>
      </div>
      <p class="section-summary">
        {{ summaryText }}
      </p>
    </div>

    <div class="series-grid" aria-live="polite">
      <SeriesCard
        v-for="collection in seriesList"
        :key="collection.id ?? collection.title"
        :series="collection"
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue"
import SeriesCard from "@/components/SeriesCard.vue"
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
  series: {
    type: [Array, Object],
    default: () => []
  }
})

const seriesMeta = sectionMetadata.series
const sectionId = computed(() => props.id || seriesMeta.id)
const titleId = computed(() => `${sectionId.value}`)
const titleText = computed(() => props.title || seriesMeta.title)
const summaryText = computed(() => props.summary || seriesMeta.summary)
const seriesList = computed(() => (props.series || []).filter((collection) => !collection.archive))
</script>

<style scoped>
.section-intro {
  margin-bottom: 0.4rem;
}

.series-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1rem;
  padding: 0.2rem 0;
}

@media (min-width: 700px) {
  .series-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.2rem;
    padding: 1rem 0;
  }
}

@media (min-width: 961px) {
  .series-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
