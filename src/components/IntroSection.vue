<template>
  <!---VizSection-->
  <VizSection
    id="intro"
    :figures="true"
    :fig-caption="true"
  >
    <!-- TITLE -->
    <template #title>
      <h2>
        Introduction
      </h2>
    </template>
    <!-- FIGURES -->
    <template #aboveExplanation>
      <p>
        Here is some introductory context for this viz
      </p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, esse nisi! Iusto nobis fugiat unde repellat doloremque maiores dolorum odio corporis nulla, odit id, harum magni ullam ipsa hic deserunt.</p>
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
      <p>
        Here is a caption for this figure
      </p>
    </template>
    <!-- EXPLANATION -->
    <template #belowExplanation>
      <p>
        Here is some additional explanation of the figure
      </p>
      <ul>
        <li>Here is a bullet</li>
      </ul>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque natus cum dicta, quaerat accusantium et architecto doloremque aspernatur dolorem eius veniam, accusamus, necessitatibus beatae itaque. Praesentium vitae sequi aut minus.</p>
    </template>
  </VizSection>
</template>

<script setup>
  import VizSection from '@/components/VizSection.vue';
</script>

<style lang="scss" scoped>
</style>
