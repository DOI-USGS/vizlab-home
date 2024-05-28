<template>
  <!---VizSection-->
  <VizSection
    id="intro"
    :figures="true"
    :fig-caption="true"
  >
    <!-- HEADING -->
    <template #heading>
      <h2>
        {{ text.heading }}
      </h2>
    </template>
    <!-- FIGURES -->
    <template #aboveExplanation>
      <p v-html="text.paragraph1" />
    </template>
    <template #figures>
      <!-- examples using custom layout class configurations set up in VizSection.vue -->
      <!-- single, full-width centered image -->
      <div class="single">
        <figure>
          <img src="@/assets/images/casc_regions_map.png">
        </figure>
      </div>
      <!-- single, full-width centered image with max width of 1500 pixels -->
      <div class="single maxWidth">
        <figure>
          <img src="@/assets/images/casc_regions_map.png">
        </figure>
      </div>
      <!-- images placed in css grid with two columns -->
      <div class="group two">
        <figure>
          <img src="@/assets/images/casc_regions_map.png">
        </figure>
        <figure>
          <img src="@/assets/images/casc_regions_map.png">
        </figure>
        <figure>
          <img src="@/assets/images/casc_regions_map.png">
        </figure>
        <figure>
          <img src="@/assets/images/casc_regions_map.png">
        </figure>
      </div>
    </template>
    <!-- FIGURE CAPTION -->
    <template #figureCaption>
      <p v-html="text.caption" />
    </template>
    <!-- EXPLANATION -->
    <template #belowExplanation>
      <p v-html="text.paragraph2" />
      <ul>
        <li v-html="text.paragraph3_bullet1" />
      </ul>
    </template>
  </VizSection>
</template>

<script setup>
  import VizSection from '@/components/VizSection.vue';

  // define props
  defineProps({
    text: { type: Object }
  })
</script>

<style lang="scss" scoped>
</style>
