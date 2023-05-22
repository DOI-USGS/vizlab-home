<template>
  <div id="visualization">
    <section id="viz-header">
      <vizHeader id="viz-header-svg" />
    </section>
    <section id="viz-menu">
      <NavBar id="sticky-header" />
    </section>
    <div id="sticky-body">
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
          PortfolioAccordions: () => import( /* webpackPrefetch: true */ /*webpackChunkName: "portfolio-accordions"*/ "./../components/PortfolioAccordions")
        },
        mounted(){
          const self = this;
          // sticky nav bar
          window.onscroll = function() {stickyOnScroll()};
          var header = document.getElementById("viz-menu");
          var sticky = header.offsetTop;
          // add/remove class based on scroll offset
          function stickyOnScroll() {
            if (window.pageYOffset > sticky) {
              header.classList.add("sticky");
            } else {
              header.classList.remove("sticky");
            }
          }
          //Wait for page to load then run this function
          window.addEventListener("load", function(){
            self.findCarouselContainers();
          });
        },
        methods: {
          lazyLoadImages(){
            const loadImg = function(entries, observer){
              entries.forEach(entry => {
                if(entry.isIntersecting){
                  //Get first source element
                  entry.target.srcset = entry.target.dataset.srcset; 
                  //Get second source element
                  entry.target.nextElementSibling.srcset = entry.target.dataset.srcset; 
                  const findImg = entry.target.parentElement.querySelector("img");
                  findImg.addEventListener('load', function () {
                    entry.target.parentElement.classList.remove('lazy');
                  });
                  observer.unobserve(entry.target);
                }
              });
            }
            const imgTargets = document.querySelectorAll(".lazy > source");
            const imgObserver = new window.IntersectionObserver(loadImg, {
              //Watch entire viewport
              root: null,
              threshold: 0,
              rootMargin: "300px"
            })
            imgTargets.forEach(img => {
              imgObserver.observe(img)
            });
          },
          findCarouselContainers(){
            let self = this;
            const carouselContainers = document.querySelectorAll(".carouselContainer");
            carouselContainers.forEach(function(container){
              container.addEventListener("click", self.addFooterCaption);
            });
          },
          //Carousel full size image captions
          addFooterCaption(e){
            const self = this;
            const imgContainer = document.querySelector(".fullscreen-v-img");
            const title = document.querySelector(".title-v-img");
            const img = document.querySelector(".content-v-img img");

            //Mutation observer
            //If img src changes, update caption
            const observer = new MutationObserver((changes) => {
              changes.forEach(change => {
                if(change.attributeName.includes('src')){
                  self.switchCaptionText(title);
                }
              })
            })
            //Telling observer what to observe
            observer.observe(img, {attributes: true});
          
            if(e.target.classList.contains("sliderImage")){
              const captionHTML = `
                <div id="captionArea">
                  <div class="caption">
                    ${title.textContent}
                  </div>
                </div>`;
              imgContainer.insertAdjacentHTML("afterbegin", captionHTML);
            }

            // Override some default styling on the lightbox
            img.style.maxHeight = "70vh"; // set height
            img.style.top = "-15vh"; // move up
          },
          switchCaptionText(text){
            const caption = document.querySelector(".caption");
            caption.textContent = text.textContent;
          }
        }

    }
</script>

<style scoped lang="scss">
$nearBlack: #212222;

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
  background-color: $nearBlack;
  margin: 0;
    width: 100vw;
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
  margin-left: 5vw;
  margin-top: 1rem;
  background-color: $nearBlack;
  fill: white;
  //width: 60%;
  max-width: 600px;
}
#viz-header {
  background-color: $nearBlack;
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
  background-color: $nearBlack;
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
