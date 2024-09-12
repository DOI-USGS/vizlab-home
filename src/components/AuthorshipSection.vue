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
      <div
        v-if="showAuthors"
        id="author-container"
        class="text-content"
      >
        <p>
          <span v-html="authors.leadText" />
          <span id="primary-author-statment">
            <span
              v-for="(author, index) in primaryAuthors" 
              :id="`initial-${author.initials}`"
              :key="`${author.initials}-attribution`"
              :class="'author first'"
            >
              <a
                :href="author.profile_link"
                target="_blank"
                v-text="author.fullName"
              />
              <span v-if="index != Object.keys(primaryAuthors).length - 1 && Object.keys(primaryAuthors).length > 2">,</span>
              <span v-if="index != Object.keys(primaryAuthors).length - 1">&nbsp;</span>
              <span v-if="index == Object.keys(primaryAuthors).length - 2">{{ authors.conjunctionWord }}&nbsp;</span>
              <span v-if="index == Object.keys(primaryAuthors).length - 1">&nbsp;</span>
            </span>
            <span v-text="authors.leadPhrase" />
            <span v-if="!showAdditionalAuthors">.</span>
            <span v-else>, </span>
          </span>
          <span
            v-if="showAdditionalAuthors"
            id="additional-author-statement"
          >
            {{ authors.contributionsPhrase }}
            <span
              v-for="(author, index) in additionalAuthors" 
              :id="`author-${author.initials}`"
              :key="`${author.initials}-attribution`"
              :class="'author'"
            >
              <a
                v-if="author.profile_link"
                :href="author.profile_link"
                target="_blank"
                v-text="author.fullName"
              />
              <span
                v-if="!author.profile_link"
                v-text="author.fullName"
              />
              <span v-if="index != Object.keys(additionalAuthors).length - 1 && Object.keys(additionalAuthors).length > 2">,</span>
              <span v-if="index != Object.keys(additionalAuthors).length - 1">&nbsp;</span>
              <span v-if="index == Object.keys(additionalAuthors).length - 2">{{ authors.conjunctionWord }}&nbsp;</span>
            </span>
            <span>.</span>
          </span>
          <span
            v-if="showContributionStatements"
            id="contribution-statements"
          >
            <span id="primary-author-contribution">
              <span
                v-for="author in primaryAuthors" 
                :id="`author-${author.initials}`"
                :key="`${author.initials}-contribution`"
                :class="'author'"
              >
                <span v-text="author.firstName" /> <span v-text="author.contribution" />. 
              </span>
            </span>
            <span
              v-if="showAdditionalContributionStatement"
              id="additional-author-contribution"
            >
              <span
                v-for="author in additionalAuthors" 
                :id="`author-${author.initials}`"
                :key="`${author.initials}-contribution`"
                :class="'author'"
              >
                <span v-text="author.firstName" /> <span v-text="author.contribution" />. 
              </span>
            </span>
          </span>
        </p>
      </div>
    </template>
  </VizSection>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import VizSection from '@/components/VizSection.vue';

  // define props
  const props = defineProps({
    titleLevel: {
      type: String,
    },
    authors:{
      type: Object,
    },
  })

  // global variables
  console.log(props)
  const primaryAuthors = props.authors.primaryAuthors;
  const additionalAuthors = props.authors.additionalAuthors;
  // Turn on or off attribution for all authors
  const showAuthors = ref(null);
  // If showAuthors is true, turn on or off attribution for additional authors
  const showAdditionalAuthors = ref(null);
  // If showAuthors is true, turn on or off contribution statements for ALL authors
  const showContributionStatements = ref(false);
  // If showAuthors is true and if showContributionStatements is true, turn on or off contribution statements for ADDITIONAL authors
  const showAdditionalContributionStatement = ref(null);

  onMounted(() => {
    showAuthors.value = primaryAuthors.length > 0;
    showAdditionalAuthors.value = additionalAuthors.length > 0;
    showAdditionalContributionStatement.value = additionalAuthors.length > 0;
  });

</script>

<style>
</style>