<template>
  <section
    id="blog"
    class="blog-section"
  >
    <div class="section-header">
      <div>
        <h2>water data blog</h2>
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
      />
    </ul>
  </section>
</template>

<script setup>
import { computed } from "vue"
import ContentCard from "@/components/ContentCard.vue"

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

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
  margin: 3rem 0 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(1.2rem, 2vw, 2.4rem);
}
</style>
