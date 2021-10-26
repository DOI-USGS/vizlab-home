<template>
  <div id="visualization">
    <section id="viz-header">
      <vizHeader id="viz-header-svg" />
    </section>
    <section id="viz-menu">
      <NavBar id="sticky-header" />
      </section>
<div id= "sticky-body" >
      <section id="viz-new">
      <WhatsNew />
    </section>
    <section id="viz-cards">
      <PortfolioAccordions />
    </section>
    <section id="viz-about">
      <About />
    </section>
<!--     <section id="viz-follow">
      <FollowUs />
    </section> -->
    </div>
  </div>
</template>

<script>
import vizHeader from "@/assets/usgsHeaderAndFooter/viz-header.svg"; 
    export default {
        name: 'Visualization',
        components: {
          vizHeader,
          NavBar: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "content-header"*/ "./../components/ContentHeader"),
          About: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "about"*/ "./../components/About"),
          WhatsNew: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "whats-new"*/ "./../components/WhatsNew"),
          PortfolioAccordions: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "portfolio-accordions"*/ "./../components/PortfolioAccordions"),
          //FollowUs: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "follow-us"*/ "./../components/FollowUs")
        },
        mounted(){

          // sticky nav bar
          window.onscroll = function() {stickyOnScroll()};
          var header = document.getElementById("viz-menu");
          var sticky = header.offsetTop;
          console.log(sticky)
          // add/remove class based on scroll offset
          function stickyOnScroll() {
            if (window.pageYOffset > sticky) {
              header.classList.add("sticky");
            } else {
              header.classList.remove("sticky");
            }
          }

        },
        methods: {
          
        }

    }
</script>

<style scoped lang="scss">
$nearBlack: #181a1a;
$darkGreen: #0713b3;


$theme-focus-color: darkorchid;
// repeating section style

section {
  //margin-bottom: 1rem;
  margin-top: 1rem;
  margin-left: 5%;
}
// create page layout as grid
// mobile
#sticky-body {
  top: 150px;
  margin: 0%;
  margin-top: 0%;
  display: grid;
  width: 100vw;
 // grid-template-columns: 1fr 1fr;
  grid-template-areas:
 // "logo logo"
  //"menu-bar menu-bar"
  "whatsNew whatsNew"
  "cards cards"
  "about about"
  "follow follow"

}
#visualization {
  position: relative;
}
#viz-header {
  grid-area: logo;
}
#viz-menu {
  grid-area: menu-bar;
  display: fixed;
  margin-top: 0;
    margin-left: 0;
}
#viz-cards {
  grid-area: cards;
}
#viz-new {
  grid-area: whatsNew;
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
  //width: 60%;
  max-width: 600px;
}

// desktop layout
@media (min-width:1024px) {
  #sticky-body {
    grid-template-areas:
    //"logo logo"
    //"menu-bar menu-bar"
    "whatsNew whatsNew"
    "cards cards"
    "about about"
   "follow follow"
  }
#viz-header-svg {
  max-width: 600px;
}
}
@media (max-width: 63.99 em){
  
#viz-header-svg {
  width: 40vw;
  min-width: 400px;
}
}
.sticky {
    position: sticky;
  position: -webkit-sticky;
  top:0;
  left: 0;
  width: 100vw;
  z-index:50;
}
#viz-menu {
  margin-left: 0;
}
</style>
