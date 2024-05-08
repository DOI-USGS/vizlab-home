<template>
  <VizSection
    id="references"
    :figures="false"
    :fig-caption="false"
  >
    <!-- TITLE -->
    <template #title>
      <h2>
        Authors
      </h2>
    </template>
    <template #aboveExplanation>
      <div
        v-if="showAuthors"
        id="author-container"
        class="text-content"
      >
        <p>
          <span id="primary-author-statment">
            The development of {{ appTitle }} was led by 
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
              <span v-if="index != Object.keys(primaryAuthors).length - 1 && Object.keys(primaryAuthors).length > 2">, </span>
              <span v-if="index == Object.keys(primaryAuthors).length - 2"> and </span>
            </span>.
          </span>
          <span
            v-if="showAdditionalAuthors"
            id="additional-author-statement"
          >
            <span
              v-for="(author, index) in additionalAuthors" 
              :id="`author-${author.initials}`"
              :key="`${author.initials}-attribution`"
              :class="'author'"
            >
              <a
                :href="author.profile_link"
                target="_blank"
                v-text="author.fullName"
              />
              <span v-if="index != Object.keys(additionalAuthors).length - 1 && Object.keys(additionalAuthors).length > 2">, </span>
              <span v-if="index == Object.keys(additionalAuthors).length - 2"> and </span>
            </span>
            <span>
              also contributed to the site.
            </span>
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
  import authors from "@/assets/text/authors";

  // Pull in title of page from Vue environment (set in .env)
  const appTitle = import.meta.env.VITE_APP_TITLE;

  const primaryAuthors = authors.primaryAuthors;
  const additionalAuthors = authors.additionalAuthors;
  // Turn on or off attribution for all authors
  const showAuthors = ref(null);
  // If showAuthors is true, turn on or off attribution for additional authors
  const showAdditionalAuthors = ref(null);
  // If showAuthors is true, turn on or off contribution statements for ALL authors
  const showContributionStatements = ref(true);
  // If showAuthors is true and if showContributionStatements is true, turn on or off contribution statements for ADDITIONAL authors
  const showAdditionalContributionStatement = ref(null);

  onMounted(() => {
    console.log(appTitle);
    showAuthors.value = primaryAuthors.length > 0;
    showAdditionalAuthors.value = additionalAuthors.length > 0;
    showAdditionalContributionStatement.value = additionalAuthors.length > 0;
  });

</script>

<style>
</style>