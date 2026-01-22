<template>
  <div class="header-section">
    <!-- splash / banner -->
    <header
      id="top"
      class="splash"
      :class="{ mobile: mobileView }"
    >
      <div class="splash-inner">
        <div
          class="title-overlay"
          :style="{ opacity: sectionTitleOverlayOpacity }"
        />

        <div
          :class="{ mobile: mobileView }"
          :style="{ minHeight: sectionTitleHeight + 'px' }"
        >
          <h1 class="title">
            <span class="title-strong">{{ brandStrong }}</span>
            <span
              v-if="brandLight"
              class="title-light"
            >{{ brandLight }}</span>
          </h1>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>

// style title
const pageTitle = "USGS VizLab"
const [brandStrong = pageTitle, ...tailWords] = (pageTitle || "").split(" ")
const brandLight = tailWords.join(" ")


</script>

<style scoped>
.header-section {
  padding: 0rem 2rem 0rem;
  margin: 0 auto;
  max-width: 1200px;
  text-align: left;
}
.title-strong { 
    font-weight: 700; 
    font-family: 'Univers Condensed', 
    var(--title-font), sans-serif;
    letter-spacing: -0.05em;
}
.title-light  { 
    font-weight: 100; 
    letter-spacing: -0.075em;
}

</style>
