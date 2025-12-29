<template>
  <section id="websites" class="viz-section">
    <div class="section-header">
      <h2>stories</h2>
      <p class="section-summary">
        Stories told by water data.
      </p>
    </div>

    <ul class="cards-grid">
      <PortfolioCard
        v-for="viz in visibleItems"
        :key="viz.id ?? viz.title"
        :viz="viz"
      />
    </ul>
  </section>
</template>

<script setup>
import { computed } from "vue"
import PortfolioCard from "@/components/PortfolioCard.vue"

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: "stories"
  },
  summary: {
    type: String,
    default: ""
  }
})

// filter out vizzies with "archive": true
const visibleItems = computed(() =>
  (props.items || []).filter((item) => !item?.archive)
)
</script>

<style scoped>
.viz-section {
  padding: 4rem 2rem 5rem;
  margin: 0 auto;
  max-width: 1200px;
}

.section-header {
  margin-bottom: 2rem;
}

.section-title {
  font-size: clamp(2.8rem, 4vw, 4rem);
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.section-summary {
  font-size: 1.8rem;
  color: rgba(0, 0, 0, 0.7);
  max-width: 70ch;
}

.cards-grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: clamp(1.2rem, 2vw, 2.4rem);
}

@media (max-width: 600px) {
  .viz-section {
    padding: 3rem 1.5rem 4rem;
  }

  .section-title {
    font-size: 2.4rem;
  }
}
</style>
