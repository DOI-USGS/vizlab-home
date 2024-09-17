<template>
  <VizSection
    id="authors"
    :figures="false"
    :fig-caption="false"
  >
    <!-- HEADING -->
    <template #heading>
      <h1 v-if="titleLevel === '1'" v-html="authors.title" />
      <h2 v-if="titleLevel === '2'" v-html="authors.title" />
      <h3 v-if="titleLevel === '3'" v-html="authors.title" />
    </template>
    <template #aboveExplanation>
      <p v-html="formatAuthorText(authors)"></p>
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
    authors:{
      type: Object,
    },
  })

  function createLink(data) {
    return data.link ? `<a href="${data.link}" target="_blank">${data.name}</a>` : data.name;
  }

  function formatAuthorText(data) {
    // Map placeholders to their replacement text
    const replacements = {
      "{projectTeam}": createLink(data.projectTeam[0]),
      "{leadAuthors}": data.leadAuthors.map(createLink).join(' and '),
      "{additionalAuthors}": data.additionalAuthors.map(createLink).join(', '),
      "{lastAuthor}": createLink(data.lastAuthor[0])
    };
    
    // Replace placeholders in the authorText
    return data.authorText.replace(/{\w+}/g, (match) => {
      return replacements[match] || match; // Return the replacement or the original text if not found
    });
  }

</script>

<style>
</style>