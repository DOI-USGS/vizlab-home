<template>
  <section class="vizSection">
    <div class="vizSectionContent">
      <div
        v-if="takeAway"
        class="text-container"
      >
        <slot name="takeAway">
          <!-- Take Away Title -->
        </slot>
      </div>
      <div class="text-container">
        <slot name="aboveExplanation">
          <!-- Above Explanation -->
        </slot>
      </div>
      <div
        v-if="figures"
        class="figures figure-container"
      >
        <slot name="figures">
          <!-- Figure -->
        </slot>
      </div>
      <div
        v-if="figCaption"
        class="figureCaption text-container"
      >
        <slot name="figureCaption">
          <!-- Figure Caption -->
        </slot>
      </div>
      <div class="text-container">
        <slot name="belowExplanation">
          <!-- Below Explanation -->
        </slot>
      </div>
    </div>
  </section>
</template>

<script setup>
  defineProps({
    takeAway:{
      type: Boolean,
      default: true
    },
    figCaption:{
      type: Boolean,
      default: true
    },
    figures:{
      type: Boolean,
      default: true
    }
  })
</script>

<style lang="scss">
  $spacing: 2rem;

  /*#####vizSectionContent#####*/
  .vizSectionContent {
    flex: 1;
  }

  /*#####FIGURES#####*/
  .figures {
    &>*{
      margin-bottom: $spacing;
    }
  }
  /*#####FIGURE CAPTION#####*/
  .figureCaption {
    display: flex;
    justify-content: center;
    font-style: italic;
  }

  /*#####CUSTOMIZATION CLASSES#####*/
  .maxWidth {
    max-width: 1500px;
    margin: 0 auto 15px auto;
    p {
      margin: 0 auto;
    }
  }
  .single {
    text-align: center;
    figure {
      margin-bottom: $spacing;
      img {
        width:100%;
      }
    }
  }
  .group {
    /* prevent too large mobile graphs from creating a x scroll */
    overflow: hidden;
    align-items: center;
    figure {
      margin-bottom: $spacing;
      img {
        width:100%;
      }
    }
  }
  .center {
    justify-items: center; 
  }
  @media screen and (min-width: 1024px){
    /*#####CUSTOMIZATION CLASSES#####*/
    .group {
      display: grid;
      gap: 15px;
    }
    .two {
      grid-template-columns: repeat(2, 1fr);
    }
    .three{
      grid-template-columns: repeat(3, 1fr);
    }   
  }
</style>