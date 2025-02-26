<template>
  <section id="visualization-container">
    <div
      class="text-container"
      :class="{ mobile: mobileView}"
    >
      <h1 class="title">
        {{ text.pageTitle }}
      </h1>
    </div>
    <IntroSection
      :text="text.components.IntroSection"
    />
    <SectionTitle
      :content="text.sections.A"
      :height="sectionTitleHeight"
      :overlay="true"
      :overlay-opacity="sectionTitleOverlayOpacity"
    />
    <RegionalViolins 
      :text="text.components.RegionalViolins"
    />
    <SectionTitle
      :content="text.sections.B"
      :height="sectionTitleHeight"
      :overlay="true"
      :overlay-opacity="sectionTitleOverlayOpacity"
    />
    <BarChartExample 
      :text="text.components.BarChartExample"
    />
    <ReferencesSection
      title-level="2"
      :references="references"
    />
    <AuthorshipSection
      title-level="2"
      :authors="authors"
    />
  </section>
</template>

<script setup>
  import { isMobile } from 'mobile-device-detect';

  import text from "@/assets/text/text.js";
  import references from "@/assets/text/references";
  import authors from "@/assets/text/authors";
  import IntroSection from '@/components/IntroSection.vue'
  import SectionTitle from '@/components/SectionTitle.vue';
  import ReferencesSection from '@/components/ReferencesSection.vue';
  import AuthorshipSection from '@/components/AuthorshipSection.vue';
  import RegionalViolins from '@/components/RegionalViolins.vue';
  import BarChartExample from '@/components/BarChartExample.vue';

  // global variables
  const mobileView = isMobile;
  const sectionTitleHeight = mobileView ? 25 : 50;
  const sectionTitleOverlayOpacity = 0.7;
</script>

<style scoped>
</style>