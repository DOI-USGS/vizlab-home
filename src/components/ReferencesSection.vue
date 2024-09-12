<template>
  <VizSection
    id="references"
    :figures="false"
    :fig-caption="false"
  >
    <!-- HEADING -->
    <template #heading>
      <h1 v-if="titleLevel === '1'" v-html="references.title" />
      <h2 v-if="titleLevel === '2'" v-html="references.title" />
      <h3 v-if="titleLevel === '3'" v-html="references.title" />
    </template>
    <template #aboveExplanation>
      <div>
        <div
          v-for="reference in references.references"
          :key="reference.num"
        >
          <p>
            <span v-html="reference.num" />. <span v-html="reference.authors" /> (<span v-html="reference.year" />). <a
              :href="reference.link"
              target="_blank"
            ><span v-html="reference.title" /></a>
            <span v-if="reference.data_release">: U.S. Geological Survey data release</span>.
            <span v-if="reference.journal">
              <span v-html="reference.journal_name" class="journal-name"></span>
              <span v-if="reference.journal_issue">, {{ reference.journal_issue }}</span>.
            </span>
            <span v-if="reference.doi" v-html="reference.doi"></span>
            <span v-else v-html="reference.link"></span>
          </p>
        </div>
      </div>
    </template>
  </VizSection>
</template>

<script setup>
  import VizSection from '@/components/VizSection.vue';

  // define props
  defineProps({
    titleLevel: {
      type: String,
    },
    references: {
      type: Object,
    },
  })
</script>

<style scoped lang="scss">
  .journal-name {
    font-style: italic;
  }
</style>