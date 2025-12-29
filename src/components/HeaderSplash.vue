<template>
<!-- splash / banner -->
    <header id="top" class="splash" :class="{ mobile: mobileView }">
      <div class="splash-inner">
        <div class="title-overlay" :style="{ opacity: sectionTitleOverlayOpacity }"></div>

        <div
          class="text-container"
          :class="{ mobile: mobileView }"
          :style="{ minHeight: sectionTitleHeight + 'px' }"
        >
          <h1 class="title">
            <span class="title-strong">{{ brandStrong }}</span>
            <span v-if="brandLight" class="title-light">{{ brandLight }}</span>
          </h1>

<!--           <h2 v-if="pageSubtitle" class="subtitle">
            {{ pageSubtitle }}
          </h2> -->
        </div>
      </div>
    </header>
</template>

<script setup>
import viz from "@/assets/content/viz-list.json"

// style title
const pageTitle = viz.site.title || "USGS Vizlab"
const pageSubtitle = viz.site.tagline || ""

const [brandStrong = pageTitle, ...tailWords] = (pageTitle || "").split(" ")
const brandLight = tailWords.join(" ")


</script>

<style scoped>

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
