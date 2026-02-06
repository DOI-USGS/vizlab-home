<template>
  <section
    :id="sectionId"
    class="blog-section"
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
              water data blog
            </a>
          </h2>
        </div>
        <p class="section-summary">
          Tools, process, and reproducible examples.
        </p>
      </div>
    </div>

    <ul
      v-if="blogItems.length"
      class="cards-grid"
    >
      <ContentCard
        v-for="blog in blogItems"
        :key="blog.id"
        :item="blog"
        :image-ratio="100"
        show-release-date
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
  }
})

const sectionId = computed(() => props.id || "blogs")
const titleId = computed(() => `${sectionId.value}`)
const blogItems = computed(() => (props.items || []).filter((item) => !item.archive))
</script>

<style scoped>
.blog-section {
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
