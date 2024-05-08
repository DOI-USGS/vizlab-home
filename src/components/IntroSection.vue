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
      <p v-html="text.paragraph2" />
    </template>
    <template #figures>
      <div class="single">
        <figure>
          <img src="@/assets/images/casc_regions_map.png">
        </figure>
      </div>
      <div class="group single maxWidth">
        <figure>
          <img src="@/assets/images/casc_regions_map.png">
        </figure>
      </div>
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
      <p v-html="text.paragraph3" />
      <ul>
        <li v-html="text.paragraph3_bullet1" />
      </ul>
      <p v-html="text.paragraph4" />
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
