<template>
  <div id="visualization">
    <section id="viz-header">
      <vizHeader id="viz-header-svg" />
    </section>
    <section id="viz-menu">
      <ContentHeader />
      <WhatsNew />
    </section>
    <section id="viz-cards">
      <PortfolioAccordions />
    </section>
    <section id="viz-about">
      <About />
    </section>
    <section id="viz-follow">
      <FollowUs />
    </section>
  </div>
</template>

<script>
import vizHeader from "@/assets/usgsHeaderAndFooter/viz-header.svg"; 
    export default {
        name: 'Visualization',
        components: {
          vizHeader,
          ContentHeader: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "content-header"*/ "./../components/ContentHeader"),
          About: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "about"*/ "./../components/About"),
          WhatsNew: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "whats-new"*/ "./../components/WhatsNew"),
          PortfolioAccordions: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "portfolio-accordions"*/ "./../components/PortfolioAccordions"),
          FollowUs: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "follow-us"*/ "./../components/FollowUs")
        }

    }
</script>

<style scoped lang="scss">
$nearBlack: #181a1a;
$darkGreen: #1F7564;

// repeating section style
section {
  //margin-bottom: 1rem;
  margin-top: 1rem;
  margin-left: 5%;
}
// create page layout as grid
// mobile
#visualization {
  margin: 0%;
  margin-top: 2%;
  display: grid;
  width: 100vw;
  grid-template-areas:
  "logo logo"
  "menu-bar menu-bar"
  "cards cards"
  "about about"
  "follow follow"

}
#viz-header {
  grid-area: logo;
}
#viz-menu {
  grid-area: menu-bar;
}
#viz-cards {
  grid-area: cards;
}
#viz-about {
  grid-area: about;
}
#viz-follow {
  grid-area: follow;
}

// each section is assigned a grid area
// elements within each section contained in div to control positioning

#viz-header-svg {
  fill: $nearBlack;
  width: 80%;
}

// desktop layout
@media (min-width:1024px) {
  #visualization {
    grid-template-areas:
    "logo logo"
    "menu-bar menu-bar"
    "cards cards"
    "about about"
   "follow follow"
  }
#viz-header-svg {
  width: 40vw;
}
}
// style accordions
//$theme-accordion-font-family: $sourceSans;

</style>
