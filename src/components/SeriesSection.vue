<template>
  <section
    :id="sectionId"
    class="content-section"
  >
    <div class="section-header">
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
      <p class="section-summary">
        {{ summaryText }}
      </p>
    </div>

    <div class="card-grid series-grid" aria-live="polite">
      <SeriesCard
        v-for="collection in seriesList"
        :key="collection.id ?? collection.title"
        :series="collection"
      />
    </div>
  </section>
</template>

<script setup>
import SeriesCard from "@/components/SeriesCard.vue"
import sections from "@/assets/content/sections.json"

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

const seriesMeta = sections.series
const sectionId = props.id || seriesMeta.id
const titleId = sectionId
const titleText = props.title || seriesMeta.title
const summaryText = props.summary || seriesMeta.summary
const seriesList = (props.series || []).filter((collection) => !collection.archive)
</script>

<style scoped>
.series-grid {
  grid-template-columns: minmax(0, 1fr);
}

@media (min-width: 700px) {
  .series-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 961px) {
  .series-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>
